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

function ProductsPage() {

  const {
    products,
    loading
  } = useProducts()

  return (

    <AdminLayout>

      <PageHeader
        title="Products"
        subtitle="
          Kelola menu store
        "
      />

      <ProductsSearch />

      <ProductsCategories />

      {loading ? (

        <div>
          Loading...
        </div>

      ) : products.length === 0 ? (

        <EmptyProducts />

      ) : (

        <div className="
          admin-product-list
        ">

          {products.map(product => (

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

export default ProductsPage