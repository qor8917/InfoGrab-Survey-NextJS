"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function addItem(payload: any) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { sex, age, sum, name, q3a1, q3a2, q3a3, q3a4, q3a5 } = payload;

  try {
    const { data, status, statusText } = await supabase
      .from("infograb")
      .insert({ name, sex, age, sum, q3a1, q3a2, q3a3, q3a4, q3a5 })
      .select();

    return { status, message: statusText };
  } catch (error) {
    return { status, error: error };
  }
}
export async function getAllItems() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  try {
    const { data, status, statusText } = await supabase
      .from("infograb")
      .select();

    return { data, status, message: statusText };
  } catch (error) {
    return { error: error };
  }
}
