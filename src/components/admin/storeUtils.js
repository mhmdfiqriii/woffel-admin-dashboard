import { supabase } from "../../lib/supabase"

export const DEFAULT_STORE_STATUS = {
  kopken: true,
  fore: true,
  tomoro: true
}

export const STORE_LIST = [
  {
    key: "kopken",
    label: "Kopi Kenangan"
  },
  {
    key: "fore",
    label: "Fore"
  },
  {
    key: "tomoro",
    label: "Tomoro"
  }
]

export const normalizeStoreData = (
  data = []
) => {

  const normalized = {
    ...DEFAULT_STORE_STATUS
  }

  data.forEach(item => {

    if (
      item?.store_name
    ) {

      normalized[
        item.store_name
      ] = item.is_open

    }

  })

  return normalized

}

export const fetchStoreStatus =
async () => {

  const {
    data,
    error
  } = await supabase
    .from("store_status")
    .select("*")

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
  storeName,
  isOpen,
  adminUser = null
) => {

  const payload = {
    store_name:
      storeName,

    is_open:
      isOpen,

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

    .from("store_status")

    .upsert(
      payload,
      {
        onConflict:
          "store_name"
      }
    )

    .select()

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
        "store-status-realtime"
      )

      .on(
        "postgres_changes",

        {
          event: "*",
          schema: "public",
          table: "store_status"
        },

        payload => {

          const latest =
            payload.new

          if (
            latest &&
            onUpdate
          ) {

            onUpdate(latest)

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

export const getStoreLabel = (
  key
) => {

  const found =
    STORE_LIST.find(
      store =>
        store.key === key
    )

  return (
    found?.label ||
    key
  )

}

export const buildStoreToastMessage = (
  storeName,
  isOpen
) => {

  const label =
    getStoreLabel(
      storeName
    )

  if (isOpen) {

    return `${label} sekarang buka`

  }

  return `${label} sekarang tutup`

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