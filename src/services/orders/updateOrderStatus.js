import { supabase } from "../../lib/supabase"

export async function updateOrderStatus({
  id,
  status,
  adminEmail
}) {
  const { error } = await supabase
    .from("orders")
    .update({
      status,
      updated_by: adminEmail || null,
      updated_at: new Date().toISOString()
    })
    .eq("id", id)

  if (error) {
    return {
      success: false,
      error
    }
  }

  return {
    success: true
  }
}