"use client";

import { SettingsSidebar } from "@/components/settings/settings-sidebar";

export default function SettingsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-full flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
            <div className="flex flex-1 lg:max-w-7xl mx-auto w-full">
                <div className="flex w-full flex-col lg:flex-row h-[calc(100vh-4rem)] overflow-hidden">
                    <SettingsSidebar />
                    <div className="flex-1 overflow-y-auto p-6 md:p-8">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
