import {
  supabase
} from "../../lib/supabase"

function subscribeProducts({
  onInsert,
  onUpdate,
  onDelete,
  onStatusChange
}) {

  return supabase

    .channel("products-realtime")

    .on(
      "postgres_changes",

      {
        event: "INSERT",
        schema: "public",
        table: "products"
      },

      onInsert
    )

    .on(
      "postgres_changes",

      {
        event: "UPDATE",
        schema: "public",
        table: "products"
      },

      onUpdate
    )

    .on(
      "postgres_changes",

      {
        event: "DELETE",
        schema: "public",
        table: "products"
      },

      onDelete
    )

    .subscribe(onStatusChange)

}

function removeProductsSubscription(
  channel
) {

  if (!channel) return

  supabase.removeChannel(channel)

}

export {
  subscribeProducts,
  removeProductsSubscription
}