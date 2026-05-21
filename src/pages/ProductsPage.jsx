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

function ProductsPage() {

  const products = [
    1,
    2,
    3
  ]

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

      {products.length === 0 ? (

        <EmptyProducts />

      ) : (

       <div className="
  admin-product-list
">

  <ProductCard
    name="Kopi Susu Gula Aren"
    category="Coffee"
    price="28.000"
    available={true}
  />

  <ProductCard
    name="Matcha Latte"
    category="Non Coffee"
    price="32.000"
    available={false}
  />

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