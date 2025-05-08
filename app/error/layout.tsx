"use client"

import { Suspense } from "react"

export default function ErrorLayout(
    {
        children,
    }: {
        children: React.ReactNode
    }
) {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <Suspense fallback={<div>Loading...</div>}>
                {children}
            </Suspense>
        </div>
    )
}