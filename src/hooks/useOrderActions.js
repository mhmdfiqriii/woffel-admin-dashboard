import {
  formatStatus
} from "../utils/adminUtils"

function useOrderActions({
  updateOrderStatus,
  adminUser,
  playProses,
  playDone,
  showToast,
  setSelectedOrder
}) {

  const updateStatus =
    async (
      id,
      status
    ) => {

      const result =
        await updateOrderStatus(
          id,
          status,
          adminUser?.email
        )

      if (!result.success) {

        showToast(
          "Gagal update status",
          "error"
        )

        return

      }

      if (
        status === "proses"
      ) {

        playProses()

      }

      if (
        status === "selesai"
      ) {

        playDone()

      }

      showToast(
        `Order ${formatStatus(status)}`,
        status
      )

      setSelectedOrder(
        prev =>

          prev

            ? {
                ...prev,
                status
              }

            : null
      )

    }

  return {
    updateStatus
  }

}

export default useOrderActions