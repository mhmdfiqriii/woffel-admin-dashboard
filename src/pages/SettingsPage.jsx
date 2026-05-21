import {
  LogOut,
  Bell,
  Volume2,
  Shield,
  ChevronRight,
  Info
} from "lucide-react"

import {
  useNavigate
} from "react-router-dom"

import {
  supabase
} from "../lib/supabase"

import AdminLayout
from "../components/admin/shared/AdminLayout"

import PageHeader
from "../components/admin/shared/PageHeader"

import useAdminUser
from "../hooks/useAdminUser"

function SettingsPage() {

  const navigate =
    useNavigate()

  const {
    displayName,
    role
  } = useAdminUser()

  const handleLogout =
    async () => {

      await supabase.auth
        .signOut()

      navigate("/login")

    }

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

          <div className="
            admin-settings-profile
          ">

            <div className="
              admin-settings-avatar
            ">
              {displayName?.charAt(0)}
            </div>

            <div>

              <div className="
                admin-settings-name
              ">
                {displayName}
              </div>

              <div className="
                admin-settings-role
              ">
                {role || "Admin"}
              </div>

            </div>

          </div>

        </div>

        <button className="
          admin-settings-menu
        ">

          <div className="
            admin-settings-menu-left
          ">

            <Bell size={18} />

            <span>
              Notifications
            </span>

          </div>

          <ChevronRight size={18} />

        </button>

        <button className="
          admin-settings-menu
        ">

          <div className="
            admin-settings-menu-left
          ">

            <Volume2 size={18} />

            <span>
              Sound Settings
            </span>

          </div>

          <ChevronRight size={18} />

        </button>

        <button className="
          admin-settings-menu
        ">

          <div className="
            admin-settings-menu-left
          ">

            <Shield size={18} />

            <span>
              Admin Access
            </span>

          </div>

          <ChevronRight size={18} />

        </button>

        <div className="
          admin-settings-card
        ">

          <div className="
            admin-settings-info
          ">

            <Info size={18} />

            <div>

              <div className="
                admin-settings-info-title
              ">
                Woffel Admin Panel
              </div>

              <div className="
                admin-settings-info-subtitle
              ">
                Version 1.0.0
              </div>

            </div>

          </div>

        </div>

        <button
          onClick={handleLogout}
          className="
            admin-settings-logout
          "
        >

          <LogOut size={18} />

          Logout

        </button>

      </div>

    </AdminLayout>

  )

}

export default SettingsPage