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
        <Card className="w-full">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
                <CardDescription>
                    Enter your information to create your account
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input id="firstName" placeholder="John" {...register('firstName')} />
                            {errors.firstName && <p className="text-sm text-red-500">{errors.firstName.message}</p>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input id="lastName" placeholder="Doe" {...register('lastName')} />
                            {errors.lastName && <p className="text-sm text-red-500">{errors.lastName.message}</p>}
                        </div>
                    </div>
                    <div className="grid gap-2 mt-4">
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

                    <Button className="w-full mt-6" type="submit" disabled={isRegisterLoading}>
                        {isRegisterLoading ? 'Creating account...' : 'Create Account'}
                    </Button>
                </form>
            </CardContent>
            <CardFooter>
                <p className="text-sm text-muted-foreground text-center w-full">
                    Already have an account?{' '}
                    <Link href="/login" className="text-primary hover:underline">
                        Login
                    </Link>
                </p>
            </CardFooter>
        </Card>
    );
}
