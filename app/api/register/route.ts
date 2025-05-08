import { NextRequest, NextResponse } from "next/server";

import { getSupabaseCookiesUtilClient } from "@/supabase-utils/cookiesUtilClient";

export async function POST(request: NextRequest) {
    const { email, password } = await request.json();
    
    const supabase = await getSupabaseCookiesUtilClient();

    const { data: userData, error: userError } = await supabase.auth.signUp({
        email,
        password,
    });

    const safeEmailString = encodeURIComponent(email);

    if (userError) {
        const userExists = userError.message.includes("already been registered");
        if (userExists) {
            /*
            return NextResponse.redirect(
                new URL("/error?type=register_mail_exists", request.url),
                302
            )
            */
            return NextResponse.json({
                success: false,
                redirectTo: `/error?type=register_mail_exists`
            }, { status: 400 });
        } 
        else {
            return NextResponse.json({
                success: false,
                redirectTo: `/error?type=register_unknown`
            }, { status: 400 });
        }
    }

    return NextResponse.json({
        success: true,
        redirectTo: `/registration-success?email=${encodeURIComponent(safeEmailString)}`
    }, {
        status: 200
    });
}