import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  const { action, username, password } = await request.json();

  if (!username || !password) {
    return NextResponse.json({ error: "Username and password are required" }, { status: 400 });
  }

  if (action === "signup") {
    const { data: existing } = await supabase
      .from("users")
      .select("id")
      .eq("username", username)
      .single();

    if (existing) {
      return NextResponse.json({ error: "Username already taken" }, { status: 409 });
    }

    const { data, error } = await supabase.rpc("create_user", {
      p_username: username,
      p_password: password,
    });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ id: data, username, is_admin: false }, { status: 201 });
  }

  if (action === "login") {
    const { data, error } = await supabase.rpc("verify_user", {
      p_username: username,
      p_password: password,
    });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    if (!data || data.length === 0) {
      return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
    }

    const userId = data[0].id;

    const { data: userRow, error: fetchError } = await supabase
      .from("users")
      .select("id, username, is_admin")
      .eq("id", userId)
      .single();

    if (fetchError || !userRow) {
      return NextResponse.json({ error: "Failed to load user" }, { status: 500 });
    }

    return NextResponse.json(userRow);
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 });
}
