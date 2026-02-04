import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Instagram } from "lucide-react";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="grid h-screen overflow-hidden grid-cols-1 lg:grid-cols-2">
            {/* Form Section (Left) */}
            <div className="flex flex-col p-8 lg:py-12 lg:px-24 bg-background relative overflow-y-auto lg:overflow-hidden">
                <div className="flex flex-col h-full max-w-[450px] w-full mx-auto lg:mx-0">
                    {/* Logo */}
                    <div className="mb-12">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="relative h-8 w-32">
                                <Image
                                    src="/images/logo.png"
                                    alt="RMKO Logo"
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>
                        </Link>
                    </div>

                    {/* Form Container */}
                    <div className="flex-1">
                        {children}
                    </div>

                    {/* Social Footer */}
                    <div className="mt-auto pt-12 flex items-center gap-6 text-zinc-400 uppercase tracking-widest text-xs font-bold">
                        <span>Follow</span>
                        <div className="flex gap-4">
                            <Link href="#" className="hover:text-primary transition-colors">
                                <Facebook className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="hover:text-primary transition-colors">
                                <Twitter className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="hover:text-primary transition-colors">
                                <Instagram className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Branding Section (Right) */}
            <div className="relative hidden lg:block bg-zinc-950">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: 'url("/images/auth-v2-bg.png")' }}
                />
            </div>
        </div>
    );
}
