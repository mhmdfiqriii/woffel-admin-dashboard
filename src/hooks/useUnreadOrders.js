import {
  useEffect,
  useRef,
  useState,
  useCallback
} from "react"

function useUnreadOrders({
  playNewOrder,
  showToast
}) {

  const [
    unreadCount,
    setUnreadCount
  ] = useState(0)

  const lastNotifyTime =
    useRef(0)

  const lastOrderId =
    useRef(null)

  const notify =
    useCallback((id) => {

      const now =
        Date.now()

      if (
        now -
        lastNotifyTime.current <
        1000
      ) return

      if (
        id !==
        lastOrderId.current
      ) {

        playNewOrder()

        showToast(
          "Order baru masuk 🚨",
          "new-order"
        )

        setUnreadCount(
          prev => prev + 1
        )

        lastOrderId.current =
          id

        lastNotifyTime.current =
          now

      }

    }, [
      playNewOrder,
      showToast
    ])

  useEffect(() => {

    const resetUnread =
      () => {

        setUnreadCount(0)

      }

    window.addEventListener(
      "focus",
      resetUnread
    )

    return () => {

      window.removeEventListener(
        "focus",
        resetUnread
      )

    }

  }, [])

  return {
    unreadCount,
    notify
  }

}

export default useUnreadOrders