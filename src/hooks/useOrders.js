import {
  useEffect,
  useMemo,
  useState
} from "react"

import {
  fetchOrders as fetchOrdersService,
  updateOrderStatus as updateOrderStatusService
} from "../services/orders"

function useOrders(
  filter,
  debouncedSearch
) {

  const [orders, setOrders] =
    useState([])

  const [loading, setLoading] =
    useState(true)

  useEffect(() => {

    const loadOrders =
      async () => {

        const result =
          await fetchOrdersService()

        if (!result.success) {

          console.log(result.error)

          setLoading(false)

          return

        }

        setOrders(result.data)

        setLoading(false)

      }

    loadOrders()

  }, [])

  const filteredOrders =
    useMemo(() => {

      const keyword =
        debouncedSearch
          .toLowerCase()
          .trim()

      return orders.filter(
        order => {

          const matchFilter =
            filter === "all" ||
            order.status === filter

          const matchSearch =
            keyword === "" ||

            order.order_id
              ?.toLowerCase()
              .includes(keyword)

            ||

            order.customer_name
              ?.toLowerCase()
              .includes(keyword)

          return (
            matchFilter &&
            matchSearch
          )

        }
      )

    }, [
      orders,
      filter,
      debouncedSearch
    ])

  const updateOrderStatus =
    async (
      id,
      status,
      adminEmail
    ) => {

      const result =
        await updateOrderStatusService({
          id,
          status,
          adminEmail
        })

      if (!result.success) {

        console.log(result.error)

        return {
          success: false
        }

      }

      setOrders(prev =>

        prev.map(order =>

          order.id === id

            ? {
                ...order,
                status
              }

            : order

        )

      )

      return {
        success: true
      }

    }

  return {
    orders,
    setOrders,
    loading,
    filteredOrders,
    updateOrderStatus
  }

}

export default useOrders