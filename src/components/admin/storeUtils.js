import { supabase } from "../../lib/supabase"

export const DEFAULT_STORE_STATUS = {
  admin_status: "online"
}

export const normalizeStoreData = (
  data
) => {

  if (!data) {

    return {
      ...DEFAULT_STORE_STATUS
    }

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
      "Fetch settings error:",
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
  isOpen,
  adminUser = null
) => {

  const payload = {

    admin_status:
      isOpen
        ? "online"
        : "offline",

    updated_at:
      new Date()
        .toISOString()

  }

  if (adminUser) {

    payload.updated_by =
      adminUser

  }

  const {
    data,
    error
  } = await supabase

    .from("settings")

    .update(payload)

    .eq("id", 1)

    .select()

    .single()

  if (error) {

    console.log(
      "Update settings error:",
      error
    )

    return {
      success: false,
      error
    }

  }

  return {
    success: true,
    data
  }

}

export const subscribeStoreRealtime = ({
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
          table: "settings",
          filter: "id=eq.1"
        },

        payload => {

          const latest =
            payload.new

          if (
            latest &&
            onUpdate
          ) {

            onUpdate(
              normalizeStoreData(
                latest
              )
            )

          }

        }
      )

      .subscribe(status => {

        if (
          onStatusChange
        ) {

          onStatusChange(
            status
          )

        }

      })

  return channel

}

export const removeStoreRealtime =
async (channel) => {

  if (!channel)
    return

  await supabase
    .removeChannel(
      channel
    )

}

export const buildStoreToastMessage = (
  isOpen
) => {

  if (isOpen) {

    return `
      Store berhasil dibuka
    `.trim()

  }

  return `
    Store berhasil ditutup
  `.trim()

}

export const buildRealtimeLabel = (
  status
) => {

  const labels = {

    SUBSCRIBED:
      "Realtime Online",

    CLOSED:
      "Realtime Closed",

    CHANNEL_ERROR:
      "Realtime Error",

    TIMED_OUT:
      "Realtime Timeout",

    CONNECTING:
      "Realtime Connecting"

  }

  return (
    labels[status] ||
    "Realtime Unknown"
  )

}