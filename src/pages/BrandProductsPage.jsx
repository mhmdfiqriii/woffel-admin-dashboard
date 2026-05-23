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

  // =====================
  // SEARCH FILTER
  // =====================

  const filteredProducts =
    products.filter(product =>

      product.name
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )

    )

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

      <ProductsCategories />

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

        <EmptyProducts />

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