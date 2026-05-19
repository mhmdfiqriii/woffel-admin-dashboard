import { supabase } from "../lib/supabase"

export const DEFAULT_STORE_STATUS = {
  admin_status: "online"
}

export const normalizeStoreData = (
  data
) => {

  if (!data) {

    return DEFAULT_STORE_STATUS

  }

  return {
    admin_status:
      data.admin_status ||
      "online"
  }

}

export const fetchStoreStatus =
async () => {

  const {
    data,
    error
  } = await supabase

    .from("settings")

    .select(`
      admin_status,
      updated_at
    `)

    .eq("id", 1)

    .single()

  if (error) {

    console.log(
      "Fetch store status error:",
      error
    )

    return {
      success: false,
      data:
        DEFAULT_STORE_STATUS
    }

  }

  return {
    success: true,
    data:
      normalizeStoreData(
        data
      )
  }

}

export const updateStoreStatus =
async (
  isOpen
) => {

  const {
    error
  } = await supabase

    .from("settings")

    .update({

      admin_status:
        isOpen
          ? "online"
          : "offline",

      updated_at:
        new Date()
          .toISOString()

    })

    .eq("id", 1)

  if (error) {

    console.log(
      "Update store status error:",
      error
    )

    return {
      success: false,
      error
    }

  }

  return {
    success: true
  }

}

export const subscribeStoreRealtime =
({
  onUpdate,
  onStatusChange
}) => {

  const channel =
    supabase

      .channel(
        "settings-realtime"
      )

      .on(
        "postgres_changes",

        {
          event: "*",
          schema: "public",
          table: "settings"
        },

        payload => {

          if (
            payload.new &&
            onUpdate
          ) {

            onUpdate(
              normalizeStoreData(
                payload.new
              )
            )

          }

        }
      )

      .subscribe(status => {

        onStatusChange?.(
          status
        )

      })

  return channel

}

export const removeStoreRealtime =
async (
  channel
) => {

  if (!channel)
    return

  await supabase
    .removeChannel(
      channel
    )

}