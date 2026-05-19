import { supabase } from "../../lib/supabase"
import {
  REALTIME_CHANNEL
} from "../../constants/adminConfig"

export function subscribeOrders({
  onInsert,
  onSettingsUpdate,
  onStatusChange
}) {
  const channel = supabase
    .channel(REALTIME_CHANNEL)
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "orders"
      },
      payload => {
        onInsert?.(payload)
      }
    )
    .on(
      "postgres_changes",
      {
        event: "UPDATE",
        schema: "public",
        table: "settings",
        filter: "id=eq.1"
      },
      payload => {
        onSettingsUpdate?.(payload)
      }
    )
    .subscribe(status => {
      onStatusChange?.(status)
    })

  return channel
}

export async function removeOrderSubscription(channel) {
  if (!channel) return

  await supabase.removeChannel(channel)
}