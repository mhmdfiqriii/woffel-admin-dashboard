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

import normalizeProduct
from "../services/products/normalizeProduct"

import {
  sortProducts
} from "../utils/adminUtils"


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
  result.data.map(
    normalizeProduct
  )

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

        setProducts(
  sortProducts(
    filtered
  )
)

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
    normalizeProduct(
      payload.new
    )

  if (
    brand &&
    normalizeBrandSlug(
      product.brand
    ) !== brand
  ) return

  setProducts(prev => {

  const exists =
    prev.some(item =>
      item.id === product.id
    )

  if (exists) {
    return prev
  }

  return sortProducts([
  product,
  ...prev
])

})

},

        onUpdate: payload => {

  const product =
    normalizeProduct(
      payload.new
    )

  // SOFT DELETE
  if (product.is_deleted) {

    setProducts(prev =>

      prev.filter(item =>

        item.id !==
        product.id

      )

    )

    return

  }

  if (
    brand &&
    normalizeBrandSlug(
      product.brand
    ) !== brand
  ) return

  setProducts(prev => {

  const updated =

    prev.map(item =>

      item.id ===
      product.id

        ? product
        : item

    )

  return sortProducts(
    updated
  )

})

},

        onDelete: payload => {

          setProducts(prev =>

  prev.filter(item =>

    item.id !==
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