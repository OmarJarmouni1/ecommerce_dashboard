"use client";

import { SettingsSidebar } from "@/components/settings/settings-sidebar";

export default function SettingsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 lg:max-w-7xl mx-auto w-full">
                <div className="flex flex-col lg:flex-row min-h-full">
                    <SettingsSidebar className="sticky top-0 lg:top-auto z-20" />
                    <div className="flex-1 p-4 sm:p-6 md:p-8">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
