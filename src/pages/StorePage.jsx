import AdminLayout
from "../components/admin/shared/AdminLayout"

import PageHeader
from "../components/admin/shared/PageHeader"

function StorePage() {

  return (

    <AdminLayout>

      <PageHeader
        title="Store"
        subtitle="
          Kelola operasional store
        "
      />

      <div className="
        admin-store-section
      ">

        <div className="
          admin-store-box
        ">
          Store Status
        </div>

        <div className="
          admin-store-box
        ">
          Store Hours
        </div>

        <div className="
          admin-store-box
        ">
          Delivery Settings
        </div>

      </div>

    </AdminLayout>

  )

}

export default StorePage