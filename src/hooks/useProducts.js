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

function useProducts() {

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

        setProducts(result.data)

      }

      setLoading(false)

    }

    loadProducts()

    const channel =
      subscribeProducts({

        onInsert: payload => {

          setProducts(prev => [
            payload.new,
            ...prev
          ])

        },

        onUpdate: payload => {

          setProducts(prev =>

            prev.map(product =>

              product.id ===
              payload.new.id

                ? payload.new
                : product

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

  }, [])

  return {
    products,
    loading,
    setProducts
  }

}

export default useProducts