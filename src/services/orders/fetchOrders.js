import { supabase } from "../../lib/supabase"
import { cleanStatus } from "../../utils/adminUtils"

export async function fetchOrders() {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", {
      ascending: false
    })

  if (error) {
    return {
      success: false,
      data: [],
      error
    }
  }

  const sorted = (data || [])
    .map(order => ({
      ...order,
      status: cleanStatus(order.status)
    }))
    .sort((a, b) => {
      const priority = {
        pending: 0,
        proses: 1,
        selesai: 2
      }

      return (
        priority[a.status] -
        priority[b.status]
      )
    })

  return {
    success: true,
    data: sorted
  }
}