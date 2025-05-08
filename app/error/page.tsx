/* eslint-disable @typescript-eslint/no-unused-vars */

"use client"

import { useSearchParams } from "next/navigation"

export default function ErrorPage() {
    const knownErrors = [
        "register_mail_exists",
        "register_unknown",
        "login-failed"
    ]

    const searchParams = useSearchParams()
    const type = searchParams.get("type")

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            {type === "register_mail_exists" && (
                <strong>
                    This user already exists. Please try logging in instead.
                </strong>
            )}
            {type === "register_unknown" && (
                <strong>
                    An unknown error occurred while registering. Please try again later.
                </strong>
            )}
            {type === "login-failed" && (
                <strong>
                    Aunthentication failed. Please try again later.
                </strong>
            )}
        </div>

    )
}