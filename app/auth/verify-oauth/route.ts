import { getSupabaseCookiesUtilClient } from "@/supabase-utils/cookiesUtilClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const url = new URL(request.url)

    const supabase = await getSupabaseCookiesUtilClient();

    const { data: sessionData, error: sessionError } = await supabase.auth.exchangeCodeForSession(url.searchParams.get("code")!)

    if (sessionError) {
        return NextResponse.redirect(
            new URL("/error?type=login-failed", request.url),
        )
    }

    return NextResponse.redirect(
        new URL("/home", request.url),
        302
    )
}