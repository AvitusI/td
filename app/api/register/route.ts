import { NextRequest, NextResponse } from "next/server";

import { getSupabaseCookiesUtilClient } from "@/supabase-utils/cookiesUtilClient";

export async function POST(request: NextRequest) {
    const { email, password } = await request.json();
    
    const supabase = getSupabaseCookiesUtilClient();

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    });
    if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
    if (data.user) {
        return NextResponse.json({ message: "User created successfully" }, { status: 200 });
    }

    return Response.json({ email, password });
}