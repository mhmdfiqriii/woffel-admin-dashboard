import {
  useState,
  useRef,
  useCallback
} from "react"

import {
  TOAST_DURATION
} from "../constants/adminConfig"

function useAdminToast() {

  const [toast, setToast] =
    useState(null)

  const toastTimeoutRef =
    useRef(null)

  const showToast =
    useCallback((
      message,
      type = "info"
    ) => {

      clearTimeout(
        toastTimeoutRef.current
      )

      setToast({
        id: Date.now(),
        message,
        type
      })

      toastTimeoutRef.current =
        setTimeout(() => {

          setToast(null)

        }, TOAST_DURATION)

    }, [])

  return {
    toast,
    showToast
  }

}

export default useAdminToast