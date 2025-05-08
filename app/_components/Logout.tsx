/* eslint-disable @typescript-eslint/no-unused-vars */

"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { getSupabaseBrowserClient } from "@/supabase-utils/browserClient"

export const Logout = () => {

    const supabase = getSupabaseBrowserClient()

    const router = useRouter()

    return (
        <div className="w-full h-full">
            <Link
                role="button"
                href="/api/logout"
                prefetch={false}
                className="secondary"
                onClick={(event) => {
                    event.preventDefault()
                    supabase.auth.signOut()
                }}
            >
                Log out
            </Link>
        </div>
    )
}