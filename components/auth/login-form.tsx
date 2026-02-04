import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '@/lib/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

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
        <Card className="w-full">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold">Login</CardTitle>
                <CardDescription>
                    Enter your email and password to access your dashboard
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="m@example.com" {...register('email')} />
                        {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                    </div>
                    <div className="grid gap-2 mt-4">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" {...register('password')} />
                        {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
                    </div>

                    {error && <div className="mt-4 text-sm text-red-500">{error}</div>}

                    <Button className="w-full mt-6" type="submit" disabled={isLoginLoading}>
                        {isLoginLoading ? 'Logging in...' : 'Login'}
                    </Button>
                </form>
            </CardContent>
            <CardFooter>
                <p className="text-sm text-muted-foreground text-center w-full">
                    Don't have an account?{' '}
                    <Link href="/register" className="text-primary hover:underline">
                        Register
                    </Link>
                </p>
            </CardFooter>
        </Card>
    );
}
