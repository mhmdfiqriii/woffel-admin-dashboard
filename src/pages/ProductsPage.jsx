import {
  useNavigate
} from "react-router-dom"

import AdminLayout
from "../components/admin/shared/AdminLayout"

import PageHeader
from "../components/admin/shared/PageHeader"

import BrandCard
from "../components/admin/products/BrandCard"

import brands
from "../constants/brands"

function ProductsPage() {

  const navigate =
    useNavigate()

  return (

    <AdminLayout>

      <PageHeader
        title="Products"
        subtitle="
          Kelola brand store
        "
      />

      <div className="
        admin-brand-list
      ">

        {brands.map(brand => (

          <BrandCard
            key={brand.slug}

            title={brand.label}

            logo={brand.logo}

            color={brand.color}

            onClick={() =>

              navigate(
                `/admin/products/${brand.slug}`
              )

            }
          />

        ))}

      </div>

    </AdminLayout>

  )

}

export default ProductsPage