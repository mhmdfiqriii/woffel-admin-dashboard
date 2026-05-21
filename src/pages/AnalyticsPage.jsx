import AdminLayout
from "../components/admin/shared/AdminLayout"

import PageHeader
from "../components/admin/shared/PageHeader"

function AnalyticsPage() {

  return (

    <AdminLayout>

      <PageHeader
        title="Analytics"
        subtitle="
          Statistik dan performa store
        "
      />

      <div className="
        admin-empty
      ">

        <div className="
          admin-empty-icon
        ">
          📊
        </div>

        <div className="
          admin-empty-title
        ">
          Analytics Coming Soon
        </div>

        <div className="
          admin-empty-subtitle
        ">
          Statistik penjualan,
          omzet, dan performa
          order akan tampil
          di sini.
        </div>

      </div>

    </AdminLayout>

  )

}

export default AnalyticsPage