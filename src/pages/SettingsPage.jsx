import AdminLayout
from "../components/admin/shared/AdminLayout"

import PageHeader
from "../components/admin/shared/PageHeader"

function SettingsPage() {

  return (

    <AdminLayout>

      <PageHeader
        title="Settings"
        subtitle="
          Pengaturan admin panel
        "
      />

      <div className="
        admin-settings-list
      ">

        <div className="
          admin-settings-card
        ">
          Admin Management
        </div>

        <div className="
          admin-settings-card
        ">
          Notification Settings
        </div>

        <div className="
          admin-settings-card
        ">
          Sound Settings
        </div>

      </div>

    </AdminLayout>

  )

}

export default SettingsPage