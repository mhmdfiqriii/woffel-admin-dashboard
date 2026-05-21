import {
  Clock3,
  Store
} from "lucide-react"

import AdminLayout
from "../components/admin/shared/AdminLayout"

import PageHeader
from "../components/admin/shared/PageHeader"

import StoreToggleCard
from "../components/admin/store/StoreToggleCard"

import useStoreStatus
from "../hooks/useStoreStatus"

import useAdminToast
from "../hooks/useAdminToast"

function StorePage() {

  const {
  showToast
} = useAdminToast()

const {
  storeStatus,
  updateStoreStatus
} = useStoreStatus(
  showToast
)

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

          <div className="
            admin-store-box-top
          ">

            <div className="
              admin-store-box-icon
            ">
              <Store size={20} />
            </div>

            <div>

              <div className="
                admin-store-box-label
              ">
                Store Status
              </div>

              <div className="
                admin-store-box-title
              ">
                Woffle Store Online
              </div>

            </div>

          </div>

          <div className="
            admin-store-live
          ">

            <div className="
              admin-store-live-dot
            " />

            Currently Open

          </div>

        </div>

       <StoreToggleCard
  isOpen={
    storeStatus
      ?.admin_status ===
    "online"
  }

  onToggle={() =>

    updateStoreStatus(
      storeStatus
        ?.admin_status !==
      "online"
    )

  }
/>

        <div className="
          admin-store-box
        ">

          <div className="
            admin-store-box-top
          ">

            <div className="
              admin-store-box-icon
            ">
              <Clock3 size={20} />
            </div>

            <div>

              <div className="
                admin-store-box-label
              ">
                Operating Hours
              </div>

              <div className="
                admin-store-box-title
              ">
                09:00 - 22:00
              </div>

            </div>

          </div>

        </div>

        <div className="
          admin-store-box
        ">

          <div className="
            admin-store-history-head
          ">

            <div className="
              admin-store-box-title
            ">
              Recent Activity
            </div>

          </div>

          <div className="
            admin-store-history-list
          ">

            <div className="
              admin-store-history-item
            ">

              <div>
                Store opened
              </div>

              <span>
                2 min ago
              </span>

            </div>
            
            <div className="
              admin-store-history-item
            ">

              <div>
                Admin updated settings
              </div>

              <span>
                25 min ago
              </span>

            </div>

          </div>

        </div>

      </div>

    </AdminLayout>

  )

}

export default StorePage