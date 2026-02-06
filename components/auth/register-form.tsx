import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '@/lib/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import Image from 'next/image';

const registerSchema = z.object({
    firstName: z.string().min(2, 'First name is required'),
    lastName: z.string().min(2, 'Last name is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterForm() {
    const { registerAsync, isRegisterLoading } = useAuth();
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data: RegisterFormValues) => {
        setError(null);
        try {
            await registerAsync(data);
        } catch (err) {
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <div className="flex flex-col space-y-8 lg:space-y-12">
            <div className="flex flex-col gap-6">
                <div className="relative h-12 w-32 border-l-4 border-blue-600 pl-4">
                    <Image
                        src="/images/logo.png"
                        alt="RMKO Logo"
                        fill
                        className="object-contain dark:hidden"
                        priority
                    />
                    <Image
                        src="/images/logo-dark.png"
                        alt="RMKO Logo"
                        fill
                        className="object-contain hidden dark:block"
                        priority
                    />
                </div>
                <div className="flex flex-col">
                    <h2 className="text-4xl sm:text-5xl lg:text-7xl font-extralight text-pink-500 tracking-tight leading-none">Join,</h2>
                    <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-pink-600 tracking-tighter leading-tight mt-1">RMKO!</h1>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div className="relative border border-border divide-y divide-border rounded-sm overflow-hidden">
                    {/* Blue Accent Bar */}
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-600 z-10" />

                    <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-border">
                        <div className="p-4 pl-8 space-y-1 bg-card">
                            <Label htmlFor="firstName" className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">First Name</Label>
                            <input
                                id="firstName"
                                placeholder="John"
                                className="block w-full border-0 p-0 text-sm focus:ring-0 placeholder:text-muted-foreground/30 font-medium bg-transparent text-foreground"
                                {...register('firstName')}
                            />
                        </div>
                        <div className="p-4 pl-4 space-y-1 bg-card">
                            <Label htmlFor="lastName" className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Last Name</Label>
                            <input
                                id="lastName"
                                placeholder="Doe"
                                className="block w-full border-0 p-0 text-sm focus:ring-0 placeholder:text-muted-foreground/30 font-medium bg-transparent text-foreground"
                                {...register('lastName')}
                            />
                        </div>
                    </div>

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

                {(errors.firstName || errors.lastName || errors.email || errors.password || error) && (
                    <div className="text-xs font-semibold text-blue-600 animate-in fade-in slide-in-from-top-1">
                        {errors.firstName?.message || errors.lastName?.message || errors.email?.message || errors.password?.message || error}
                    </div>
                )}

                <div className="flex gap-4">
                    <Button
                        className="flex-1 h-12 rounded-none bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-widest text-xs transition-all active:scale-95 shadow-lg shadow-blue-600/20"
                        type="submit"
                        disabled={isRegisterLoading}
                    >
                        {isRegisterLoading ? '...' : 'Create Account'}
                    </Button>
                    <Link href="/login" className="flex-1">
                        <Button
                            variant="outline"
                            className="w-full h-12 rounded-none border-2 border-pink-500 text-pink-500 hover:bg-pink-50 dark:hover:bg-pink-950/30 font-black uppercase tracking-widest text-xs transition-all active:scale-95"
                            type="button"
                        >
                            Sign in
                        </Button>
                    </Link>
                </div>
            </form>
        </div>
    );
}
