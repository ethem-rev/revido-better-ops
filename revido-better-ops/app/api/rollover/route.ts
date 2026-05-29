import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  const { target_start } = await request.json();
  if (!target_start) {
    return NextResponse.json({ error: "target_start is required" }, { status: 400 });
  }

  const { data: leftovers, error: fetchError } = await supabase
    .from("initiatives")
    .select("id")
    .lt("month_assigned", target_start)
    .in("status", ["Failed", "In Progress"]);

  if (fetchError) {
    return NextResponse.json({ error: fetchError.message }, { status: 500 });
  }

  if (!leftovers || leftovers.length === 0) {
    return NextResponse.json({ rolled: 0 });
  }

  const ids = leftovers.map((i) => i.id);

  const { error: updateError } = await supabase
    .from("initiatives")
    .update({ month_assigned: target_start, status: "In Progress" })
    .in("id", ids);

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  return NextResponse.json({ rolled: ids.length });
}
