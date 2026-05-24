import {
  useParams
} from "react-router-dom"

import {
  useState
} from "react"

import AdminLayout
from "../components/admin/shared/AdminLayout"

import PageHeader
from "../components/admin/shared/PageHeader"

import ProductsSearch
from "../components/admin/products/ProductsSearch"

import ProductsCategories
from "../components/admin/products/ProductsCategories"

import ProductCard
from "../components/admin/products/ProductCard"

import EmptyProducts
from "../components/admin/products/EmptyProducts"

import useProducts
from "../hooks/useProducts"

import brands
from "../constants/brands"

import SkeletonProductCard
from "../components/admin/products/SkeletonProductCard"

import toggleAvailability
from "../services/products/toggleAvailability"

import ProductEditModal
from "../components/admin/products/ProductEditModal"

import deleteProduct
from "../services/products/deleteProduct"

function BrandProductsPage() {

  const {
    brand
  } = useParams()

  const [
    search,
    setSearch
  ] = useState("")

  const [
    selectedCategory,
    setSelectedCategory
  ] = useState("All")

  const [
    selectedProduct,
    setSelectedProduct
  ] = useState(null)

  const brandData =
    brands.find(
      item =>
        item.slug === brand
    )

  // =====================
  // FETCH PRODUCTS
  // =====================

  const {
    products,
    loading,
    setProducts
  } = useProducts({
    brand
  })

  // =====================
  // TOGGLE AVAILABILITY
  // =====================

  async function handleToggleAvailability(
    productId,
    currentStatus
  ) {

    setProducts(prev =>

      prev.map(product =>

        product.id === productId

          ? {
              ...product,
              is_available:
                !currentStatus
            }

          : product
      )

    )

    const result =
      await toggleAvailability({

        id: productId,

        available:
          !currentStatus

      })

    // rollback
    if (!result.success) {

      setProducts(prev =>

        prev.map(product =>

          product.id === productId

            ? {
                ...product,
                is_available:
                  currentStatus
              }

            : product
        )

      )

    }

  }

  // =====================
  // FILTER
  // =====================

  const filteredProducts =
    products.filter(product => {

      const matchSearch =
        product.name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )

      const matchCategory =

        selectedCategory ===
        "All"

          ? true

          : product.category ===
            selectedCategory

      return (
        matchSearch &&
        matchCategory
      )

    })

    async function handleDeleteProduct(
  productId
) {

  // optimistic
  setProducts(prev =>

    prev.filter(product =>

      product.id !== productId

    )

  )

  const result =
    await deleteProduct(
      productId
    )

  if (!result.success) {

    window.location.reload()

  }

}

  return (

    <AdminLayout>

      <PageHeader
        title={
          brandData?.label ||
          "Unknown Brand"
        }

        subtitle="
          Kelola produk brand
        "
      />

      <ProductsSearch
        value={search}
        onChange={setSearch}
      />

      <ProductsCategories
        products={products}

        selectedCategory={
          selectedCategory
        }

        onChange={
          setSelectedCategory
        }
      />

      {loading ? (

        <div className="
          admin-product-list
        ">

          {Array.from({
            length: 6
          }).map((_, index) => (

            <SkeletonProductCard
              key={index}
            />

          ))}

        </div>

      ) : filteredProducts.length === 0 ? (

        <EmptyProducts

          icon={
            search
              ? "🔍"
              : selectedCategory !==
                "All"

                ? "📂"

                : "🍔"
          }

          title={

            search

              ? "Produk Tidak Ditemukan"

              : selectedCategory !==
                "All"

                ? "Category Kosong"

                : "Belum Ada Produk"

          }

          subtitle={

            search

              ? `
                Tidak ada hasil
                untuk pencarian "${search}"
              `

              : selectedCategory !==
                "All"

                ? `
                  Tidak ada produk
                  pada category ini.
                `

                : `
                  Brand ini belum
                  punya produk.
                `
          }
        />

      ) : (

        <div className="
          admin-product-list
        ">

          {filteredProducts.map(product => (

            <ProductCard
              key={product.id}

              name={product.name}

              category={
                product.category
              }

              price={product.price}

              image={
                product.image_url
              }

              available={
                product.is_available
              }

              onDelete={() =>

  handleDeleteProduct(
    product.id
  )

}

              onToggle={() =>

                handleToggleAvailability(
                  product.id,
                  product.is_available
                )

              }

              onClick={() =>

                setSelectedProduct(
                  product
                )

              }
            />

          ))}

        </div>

      )}

      {/* FAB */}

      <button
        className="
          admin-fab
        "

        onClick={() =>

          setSelectedProduct({

            id: null,

            brand:
              brandData?.label ||

              "Kopi Kenangan",

            name: "",

            category: "",

            price: 0,

            original_price: 0,

            image_url: "",

            sort_order: 0,

            is_available: true

          })

        }
      >
        +
      </button>

      {/* MODAL */}

      <ProductEditModal

        product={
          selectedProduct
        }

        onClose={() =>
          setSelectedProduct(null)
        }
      />

    </AdminLayout>

  )

}

export default BrandProductsPage