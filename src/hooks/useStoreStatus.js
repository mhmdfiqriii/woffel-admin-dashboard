import {
  useState
} from "react"

import {
  supabase
} from "../lib/supabase"

function useStoreStatus(
  showToast
) {

  const [
    storeStatus,
    setStoreStatus
  ] = useState({
    admin_status: "online"
  })

  const updateStoreStatus =
    async (
      isOpen
    ) => {

      const { error } =
        await supabase

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

        console.log(error)

        showToast(
          "Gagal update store",
          "error"
        )

        return

      }

      setStoreStatus({
        admin_status:
          isOpen
            ? "online"
            : "offline"
      })

      showToast(

        isOpen
          ? "Store dibuka"
          : "Store ditutup",

        isOpen
          ? "success"
          : "warning"

      )

    }

  return {

    storeStatus,
    setStoreStatus,
    updateStoreStatus

  }

}

export default useStoreStatus