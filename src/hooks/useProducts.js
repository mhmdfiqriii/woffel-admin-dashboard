import {
  useEffect,
  useState
} from "react"

import fetchProducts
from "../services/products/fetchProducts"

import {
  normalizeBrand
} from "../utils/storeUtils"

import {
  subscribeProducts,
  removeProductsSubscription
} from "../services/products/subscribeProducts"

function useProducts({

  brand = null

} = {}) {

  const [products, setProducts] =
    useState([])

  const [loading, setLoading] =
    useState(true)

  useEffect(() => {

    async function loadProducts() {

      setLoading(true)

      const result =
        await fetchProducts()

      if (result.success) {

        let filtered =
          result.data

        // =====================
        // BRAND FILTER
        // =====================

        if (brand) {

          filtered =
            result.data.filter(
  product =>

    normalizeBrand(
      product.brand
    ) === brand
)

        }

        setProducts(filtered)

      }

      setLoading(false)

    }

    loadProducts()

    // =====================
    // REALTIME
    // =====================

    const channel =
      subscribeProducts({

        onInsert: payload => {

          const product =
            payload.new

          if (
  brand &&
  normalizeBrand(
    product.brand
  ) !== brand
) return

          setProducts(prev => [
            product,
            ...prev
          ])

        },

        onUpdate: payload => {

          const product =
            payload.new

          if (
  brand &&
  normalizeBrand(
    product.brand
  ) !== brand
) return

          setProducts(prev =>

            prev.map(item =>

              item.id ===
              product.id

                ? product
                : item

            )

          )

        },

        onDelete: payload => {

          setProducts(prev =>

            prev.filter(
              product =>

                product.id !==
                payload.old.id
            )

          )

        }

      })

    return () => {

      removeProductsSubscription(
        channel
      )

    }

  }, [brand])

  return {
    products,
    loading,
    setProducts
  }

}

export default useProducts