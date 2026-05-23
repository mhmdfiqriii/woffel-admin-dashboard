import {
  useNavigate
} from "react-router-dom"

import {
  useMemo
} from "react"

import AdminLayout
from "../components/admin/shared/AdminLayout"

import PageHeader
from "../components/admin/shared/PageHeader"

import BrandCard
from "../components/admin/products/BrandCard"

import brands
from "../constants/brands"

import useProducts
from "../hooks/useProducts"

function ProductsPage() {

  const navigate =
    useNavigate()

  const {
    products,
    loading
  } = useProducts()

  // =====================
  // COUNT PRODUCTS
  // =====================

  const brandsWithTotal =
    useMemo(() => {

      return brands.map(brand => {

        const total =
          products.filter(product => {

            const productBrand =
              product.brand
                ?.toLowerCase()
                .replaceAll(
                  " ",
                  "-"
                )

            return (
              productBrand ===
              brand.slug
            )

          }).length

        return {
          ...brand,
          total
        }

      })

    }, [products])

  return (

    <AdminLayout>

      <PageHeader
        title="Products"
        subtitle="
          Kelola brand store
        "
      />

      {loading ? (

        <div>
          Loading...
        </div>

      ) : (

        <div className="
          admin-brand-list
        ">

          {brandsWithTotal.map(
            brand => (

              <BrandCard
                key={brand.slug}

                title={brand.label}

                logo={brand.logo}

                color={brand.color}

                total={brand.total}

                onClick={() =>

                  navigate(
                    `/admin/products/${brand.slug}`
                  )

                }
              />

            )
          )}

        </div>

      )}

    </AdminLayout>

  )

}

export default ProductsPage