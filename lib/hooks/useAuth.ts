import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authApi } from '@/lib/api/auth';
import { useAuthStore } from '@/lib/store/auth-store';
import { useRouter } from 'next/navigation';

export const useAuth = () => {
    const router = useRouter();
    const { setAuth, clearAuth, user, isAuthenticated } = useAuthStore();
    const queryClient = useQueryClient();

    const loginMutation = useMutation({
        mutationFn: authApi.login,
        onSuccess: (data) => {
            setAuth(data.user, data.access_token, data.refresh_token);
            // Set cookie for middleware
            document.cookie = `access_token=${data.access_token}; path=/; max-age=86400; SameSite=Strict`;
            router.push('/dashboard');
        },
        onError: (error: any) => {
            console.error('Login failed:', error);
        },
    });

    const registerMutation = useMutation({
        mutationFn: authApi.register,
        onSuccess: (data) => {
            setAuth(data.user, data.access_token, data.refresh_token);
            document.cookie = `access_token=${data.access_token}; path=/; max-age=86400; SameSite=Strict`;
            router.push('/dashboard');
        },
    });

    const logout = () => {
        clearAuth();
        queryClient.clear();
        document.cookie = 'access_token=; path=/; max-age=0;';
        router.push('/login');
    };

    return {
        user,
        isAuthenticated,
        login: loginMutation.mutate,
        loginAsync: loginMutation.mutateAsync,
        isLoginLoading: loginMutation.isPending,
        register: registerMutation.mutate,
        registerAsync: registerMutation.mutateAsync,
        isRegisterLoading: registerMutation.isPending,
        logout,
    };
};
