import { useMemo } from "react"

function useAdminStats(
  orders,
  filteredOrders
) {

  return useMemo(() => {

    const totalPending =
      orders.filter(
        o =>
          o.status ===
          "pending"
      ).length

    const totalProses =
      orders.filter(
        o =>
          o.status ===
          "proses"
      ).length

    const totalSelesai =
      orders.filter(
        o =>
          o.status ===
          "selesai"
      ).length

    const totalOmzet =
      filteredOrders.reduce(
        (acc, order) =>
          acc + order.price,
        0
      )

    return {
      totalPending,
      totalProses,
      totalSelesai,
      totalOmzet
    }

  }, [
    orders,
    filteredOrders
  ])

}

export default useAdminStats