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

function BrandProductsPage() {

  const {
    brand
  } = useParams()

  const [
    search,
    setSearch
  ] = useState("")

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
    loading
  } = useProducts({
    brand
  })

  const [
  selectedCategory,
  setSelectedCategory
  ] = useState("All")

  // =====================
  // SEARCH FILTER
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
          admin-products-loading
        ">

          <div className="
            admin-products-loader
          "></div>

          <div className="
            admin-products-loading-text
          ">
            Loading products...
          </div>

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
              category={product.category}
              price={product.price}
              image={product.image_url}
              available={
                product.is_available
              }
            />

          ))}

        </div>

      )}

      <button className="
        admin-fab
      ">
        +
      </button>

    </AdminLayout>

  )

}

export default BrandProductsPage