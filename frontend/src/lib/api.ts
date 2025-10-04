import axios, { AxiosInstance, AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { AuthenticationError, NetworkError, RateLimitError, AppError } from './errors';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

// Extend the axios config type to include metadata
interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
    metadata?: { startTime: number };
    _retryCount?: number;
}

// Create axios instance with enhanced configuration
const api: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 120000, // 120 second timeout (2 minutes) for AI operations
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add auth token and handle retries
api.interceptors.request.use(
    (config: ExtendedAxiosRequestConfig) => {
        // Add auth token from Supabase
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('supabase.auth.token');
            if (token && config.headers) {
                try {
                    const parsedToken = JSON.parse(token);
                    config.headers.Authorization = `Bearer ${parsedToken.access_token}`;
                } catch (e) {
                    console.warn('Failed to parse auth token:', e);
                    localStorage.removeItem('supabase.auth.token');
                }
            }
        }

        // Add request timestamp for debugging
        config.metadata = { startTime: Date.now() };
        
        return config;
    },
    (requestError: unknown) => {
        console.error('Request interceptor error:', requestError);
        return Promise.reject(new NetworkError('Request failed to send'));
    }
);

// Response interceptor for comprehensive error handling
api.interceptors.response.use(
    (response: AxiosResponse) => {
        // Log response time in development
        const extendedConfig = response.config as ExtendedAxiosRequestConfig;
        if (process.env.NODE_ENV === 'development' && extendedConfig.metadata) {
            const responseTime = Date.now() - extendedConfig.metadata.startTime;
            console.log(`API Request: ${response.config.method?.toUpperCase()} ${response.config.url} - ${responseTime}ms`);
        }
        
        return response;
    },
    async (error: AxiosError) => {
        const originalRequest = error.config as ExtendedAxiosRequestConfig;
        
        // Handle different error types
        if (error.code === 'ECONNABORTED') {
            throw new NetworkError('Request timed out. Please try again.');
        }
        
        if (!error.response) {
            throw new NetworkError('Network error. Please check your connection.');
        }
        
        const { status, data } = error.response;
        const errorData = data as Record<string, unknown>;
        const message = String(errorData?.error || errorData?.message || 'An error occurred');
        
        switch (status) {
            case 400:
                throw new AppError(message, 'BAD_REQUEST', 400);
            
            case 401:
                // Clear auth token and redirect to login
                if (typeof window !== 'undefined') {
                    localStorage.removeItem('supabase.auth.token');
                    // Don't redirect immediately in development
                    if (process.env.NODE_ENV !== 'development') {
                        window.location.href = '/auth';
                    }
                }
                throw new AuthenticationError(message);
            
            case 403:
                throw new AppError('Access denied. You don\'t have permission to perform this action.', 'FORBIDDEN', 403);
            
            case 404:
                throw new AppError('The requested resource was not found.', 'NOT_FOUND', 404);
            
            case 429:
                // Handle rate limiting with exponential backoff
                const retryAfter = error.response.headers['retry-after'];
                const delay = retryAfter ? parseInt(retryAfter) * 1000 : 2000;
                
                // Retry once after delay
                if (originalRequest && !originalRequest._retryCount) {
                    originalRequest._retryCount = 1;
                    await new Promise(resolve => setTimeout(resolve, delay));
                    return api(originalRequest as InternalAxiosRequestConfig);
                }
                
                throw new RateLimitError('Too many requests. Please wait a moment and try again.');
            
            case 500:
            case 502:
            case 503:
            case 504:
                // Retry server errors once
                if (originalRequest && !originalRequest._retryCount) {
                    originalRequest._retryCount = 1;
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    return api(originalRequest as InternalAxiosRequestConfig);
                }
                
                throw new AppError('Server error. Please try again later.', 'SERVER_ERROR', status);
            
            default:
                throw new AppError(message, 'UNKNOWN_ERROR', status);
        }
    }
);

// Enhanced API wrapper functions
export const apiClient = {
    get: <T = unknown>(url: string, params?: Record<string, unknown>) => 
        api.get<T>(url, { params }).then(response => response.data),
    
    post: <T = unknown>(url: string, data?: unknown, config?: Record<string, unknown>) => 
        api.post<T>(url, data, config).then(response => response.data),
    
    put: <T = unknown>(url: string, data?: unknown) => 
        api.put<T>(url, data).then(response => response.data),
    
    delete: <T = unknown>(url: string) => 
        api.delete<T>(url).then(response => response.data),
    
    upload: <T = unknown>(url: string, formData: FormData, onProgress?: (progress: number) => void) => {
        return api.post<T>(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: (progressEvent) => {
                if (onProgress && progressEvent.total) {
                    const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    onProgress(progress);
                }
            },
        }).then(response => response.data);
    }
};

// Health check function
export const checkApiHealth = async (): Promise<boolean> => {
    try {
        await api.get('/health');
        return true;
    } catch {
        return false;
    }
};

// Default export for backward compatibility
export default api;