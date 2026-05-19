import {
  LayoutDashboard,
  Package,
  Store,
  Ellipsis
} from "lucide-react"

import {
  NavLink
} from "react-router-dom"

function AdminBottomNav() {

  const navItems = [
    {
      label: "Orders",
      icon: LayoutDashboard,
      path: "/admin/dashboard"
    },
    {
      label: "Products",
      icon: Package,
      path: "/admin/products"
    },
    {
      label: "Store",
      icon: Store,
      path: "/admin/store"
    },
    {
      label: "More",
      icon: Ellipsis,
      path: "/admin/settings"
    }
  ]

  return (

    <nav className="
      admin-bottom-nav
    ">

      {navItems.map(item => {

        const Icon =
          item.icon

        return (

          <NavLink
            key={item.path}
            to={item.path}
            className={({
              isActive
            }) => `

              admin-bottom-link

              ${isActive
                ? "active"
                : ""
              }

            `}
          >

            <Icon size={20} />

            <span>
              {item.label}
            </span>

          </NavLink>

        )

      })}

    </nav>

  )

}

export default AdminBottomNav