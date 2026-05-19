import AdminBottomNav
from "./AdminBottomNav"

function AdminLayout({
  children
}) {

  return (

    <div className="
      admin-layout
    ">

      <main className="
        admin-layout-content
      ">

        {children}

      </main>

      <AdminBottomNav />

    </div>

  )

}

export default AdminLayout