import { api } from './axios';
import { User } from '@/lib/store/auth-store';

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterData {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

export interface AuthResponse {
    user: User;
    access_token: string;
    refresh_token: string;
}

export const authApi = {
    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        // Mock Login for Admin
        if (credentials.email === "admin@example.com" && credentials.password === "admin123") {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve({
                        user: {
                            id: "admin-1",
                            email: "admin@example.com",
                            firstName: "Admin",
                            lastName: "User",
                            role: "admin",
                            avatarUrl: "https://github.com/shadcn.png"
                        },
                        access_token: "mock-jwt-token-admin",
                        refresh_token: "mock-refresh-token-admin"
                    });
                }, 1000);
            });
        }

        const { data } = await api.post<AuthResponse>('/auth/login', credentials);
        return data;
    },

    async register(userData: RegisterData): Promise<AuthResponse> {
        const { data } = await api.post<AuthResponse>('/auth/register', userData);
        return data;
    },

    async logout() {
        await api.post('/auth/logout');
    },

    async getCurrentUser(): Promise<User> {
        const { data } = await api.get<User>('/auth/me');
        return data;
    },
};
