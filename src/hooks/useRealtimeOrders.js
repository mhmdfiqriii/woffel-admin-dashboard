import {
  useEffect,
  useRef
} from "react"

import {
  cleanStatus
} from "../utils/adminUtils"

import {
  REALTIME_RECONNECT
} from "../constants/adminConfig"

import {
  subscribeOrders,
  removeOrderSubscription
} from "../services/orders"

function useRealtimeOrders({
  notify,
  setOrders,
  setHighlightId,
  setRealtimeStatus,
  setStoreStatus,
  showToast,
  topRef
}) {

  const channelRef =
    useRef(null)

  const reconnectTimeoutRef =
    useRef(null)

  const notifyRef =
    useRef(notify)

  const showToastRef =
    useRef(showToast)

  useEffect(() => {

    notifyRef.current =
      notify

  }, [notify])

  useEffect(() => {

    showToastRef.current =
      showToast

  }, [showToast])

  useEffect(() => {

    const createChannel =
      () => {

        if (
          channelRef.current
        ) return

        setRealtimeStatus(
          "connecting"
        )

        const channel =
          subscribeOrders({

            onInsert: payload => {

              const data =
                payload.new

              if (!data)
                return

              const cleanData = {
                ...data,
                status:
                  cleanStatus(
                    data.status
                  )
              }

              notifyRef.current?.(
                cleanData.id
              )

              setHighlightId(
                cleanData.id
              )

              setTimeout(() => {

                topRef.current
                  ?.scrollIntoView({
                    behavior:
                      "smooth"
                  })

              }, 100)

              setOrders(prev => {

                const exists =
                  prev.find(
                    order =>

                      order.id ===
                      cleanData.id
                  )

                if (exists) {

                  return prev.map(
                    order =>

                      order.id ===
                      cleanData.id

                        ? cleanData
                        : order
                  )

                }

                return [
                  cleanData,
                  ...prev
                ]

              })

            },

            onSettingsUpdate:
              payload => {

                if (
                  !payload.new
                ) return

                setStoreStatus({
                  admin_status:
                    payload.new
                      .admin_status
                })

              },

            onStatusChange:
              status => {

                if (
                  status ===
                  "SUBSCRIBED"
                ) {

                  setRealtimeStatus(
                    "online"
                  )

                }

                if (
                  status ===
                  "CHANNEL_ERROR"
                ) {

                  setRealtimeStatus(
                    "offline"
                  )

                  showToastRef.current?.(
                    "Realtime error",
                    "error"
                  )

                }

                if (
                  status ===
                  "TIMED_OUT"
                ) {

                  setRealtimeStatus(
                    "reconnecting"
                  )

                  showToastRef.current?.(
                    "Reconnect database...",
                    "warning"
                  )

                  channelRef.current =
                    null

                  reconnectTimeoutRef.current =
                    setTimeout(
                      createChannel,
                      REALTIME_RECONNECT
                    )

                }

              }

          })

        channelRef.current =
          channel

      }

    createChannel()

    return () => {

      clearTimeout(
        reconnectTimeoutRef.current
      )

      removeOrderSubscription(
        channelRef.current
      )

      channelRef.current =
        null

    }

  }, [
    setOrders,
    setHighlightId,
    setRealtimeStatus,
    setStoreStatus,
    topRef
  ])

}

export default useRealtimeOrders