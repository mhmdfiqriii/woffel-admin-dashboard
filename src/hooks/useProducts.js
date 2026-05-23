import {
  useEffect,
  useState
} from "react"

import fetchProducts
from "../services/products/fetchProducts"

import {
  subscribeProducts,
  removeProductsSubscription
} from "../services/products/subscribeProducts"

import normalizeBrandSlug
from "../utils/normalizeBrandSlug"

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

      normalizeBrandSlug(
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
  normalizeBrandSlug(
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
  normalizeBrandSlug(
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