import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '@/lib/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';
import { Github, Mail, Chrome } from 'lucide-react';
import Image from 'next/image';

const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
    const { loginAsync, isLoginLoading } = useAuth();
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: 'admin@example.com',
            password: 'admin123',
        },
    });

    const onSubmit = async (data: LoginFormValues) => {
        setError(null);
        try {
            await loginAsync(data);
        } catch (err) {
            setError('Invalid email or password');
        }
    };

    return (
        <div className="flex flex-col space-y-8 lg:space-y-12">
            <div className="flex flex-col gap-6">
                <div className="relative h-12 w-32 border-l-4 border-pink-500 pl-4">
                    <Image
                        src="/images/logo.png"
                        alt="RMKO Logo"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>
                <div className="flex flex-col">
                    <h2 className="text-4xl lg:text-6xl font-extralight text-blue-500 tracking-tight leading-none">Hello,</h2>
                    <h2 className="text-4xl lg:text-6xl font-black text-blue-600 tracking-tighter leading-tight">welcome!</h2>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div className="relative border border-border divide-y divide-border rounded-sm overflow-hidden">
                    {/* Pink Accent Bar */}
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-pink-500 z-10" />

                    <div className="p-4 pl-8 space-y-1 bg-card">
                        <Label htmlFor="email" className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Email address</Label>
                        <input
                            id="email"
                            type="email"
                            placeholder="name@mail.com"
                            className="block w-full border-0 p-0 text-sm focus:ring-0 placeholder:text-muted-foreground/30 font-medium bg-transparent text-foreground"
                            {...register('email')}
                        />
                    </div>

                    <div className="p-4 pl-8 space-y-1 bg-card">
                        <Label htmlFor="password" title="" className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Password</Label>
                        <input
                            id="password"
                            type="password"
                            placeholder="••••••••••••"
                            className="block w-full border-0 p-0 text-sm focus:ring-0 placeholder:text-muted-foreground/30 font-medium bg-transparent text-foreground"
                            {...register('password')}
                        />
                    </div>
                </div>

                {(errors.email || errors.password || error) && (
                    <div className="text-xs font-semibold text-pink-500 animate-in fade-in slide-in-from-top-1">
                        {errors.email?.message || errors.password?.message || error}
                    </div>
                )}

                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Checkbox id="remember" className="border-border rounded-none data-[state=checked]:bg-pink-500 data-[state=checked]:border-pink-500" />
                        <label htmlFor="remember" className="text-xs font-bold text-muted-foreground">Remember me</label>
                    </div>
                    <Link href="#" className="text-xs font-bold text-muted-foreground/50 hover:text-pink-500 transition-colors">
                        Forget password?
                    </Link>
                </div>

                <div className="flex gap-4">
                    <Button
                        className="flex-1 h-12 rounded-none bg-pink-500 hover:bg-pink-600 text-white font-black uppercase tracking-widest text-xs transition-all active:scale-95 shadow-lg shadow-pink-500/20"
                        type="submit"
                        disabled={isLoginLoading}
                    >
                        {isLoginLoading ? '...' : 'Login'}
                    </Button>
                    <Link href="/register" className="flex-1">
                        <Button
                            variant="outline"
                            className="w-full h-12 rounded-none border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/30 font-black uppercase tracking-widest text-xs transition-all active:scale-95"
                            type="button"
                        >
                            Sign up
                        </Button>
                    </Link>
                </div>
            </form>
        </div>
    );
}
