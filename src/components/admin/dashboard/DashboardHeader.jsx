import {
  useEffect,
  useState
} from "react"

import StoreStatusBadge
from "../store/StoreStatusBadge"

function DashboardHeader({
  displayName,
  realtimeStatus,
  unreadCount
}) {

  const [time, setTime] =
    useState("")

  useEffect(() => {

    const updateClock = () => {

      const now =
        new Date()

      setTime(

        now.toLocaleTimeString(
          "id-ID",
          {
            hour: "2-digit",
            minute: "2-digit"
          }
        )

      )

    }

    updateClock()

    const interval =
      setInterval(
        updateClock,
        1000
      )

    return () =>
      clearInterval(interval)

  }, [])

  return (

    <div className="
      admin-header
    ">

      <div className="
        admin-header-top
      ">

        <div className="
          admin-header-brand
        ">

          <div
            className={`
              admin-header-dot

              ${
                realtimeStatus ===
                "online"

                  ? `
                    admin-header-dot-online
                  `

                  : `
                    admin-header-dot-offline
                  `
              }
            `}
          ></div>

          <div>

            <div className="
              admin-header-label
            ">

              WOFFEL STORE

            </div>

            <h1 className="
              admin-header-title
            ">

              Admin Dashboard

            </h1>

          </div>

        </div>

        <div className="
          admin-header-right
        ">

          <div className="
            admin-header-clock
          ">

            {time}

          </div>

          {unreadCount > 0 && (

            <div className="
              admin-header-unread
            ">

              <span className="
                admin-header-unread-pulse
              "></span>

              <span className="
                admin-header-unread-count
              ">

                {unreadCount}

              </span>

            </div>

          )}

        </div>

      </div>

      <div className="
        admin-header-divider
      "></div>

      <div className="
        admin-header-info
      ">

        <div className="
          admin-header-user-wrap
        ">

          <div className="
            admin-header-user-section
          ">

            <div className="
              admin-header-subtitle
            ">

              Selamat datang kembali

            </div>

            <div className="
              admin-header-user
            ">

              {displayName || "Admin"}

            </div>

          </div>

          <StoreStatusBadge
            realtimeStatus={
              realtimeStatus
            }
          />

        </div>

      </div>

    </div>

  )

}

export default DashboardHeader