import {
  useEffect,
  useState
} from "react"

import { supabase }
from "../../lib/supabase"

function DashboardHeader({
  displayName,
  soundOn,
  setSoundOn,
  exportCSV,
  navigate,
  role,
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

  const handleLogout =
    async () => {

      await supabase.auth
        .signOut()

      localStorage.removeItem(
        "admin_user"
      )

      navigate("/login")

    }

  const realtimeLabel = {

    online:
      "Realtime Online",

    connecting:
      "Connecting...",

    reconnecting:
      "Reconnecting...",

    offline:
      "Realtime Offline"

  }

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

          <div className={`
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
          `}></div>

          <div>

            <div className="
              admin-header-label
            ">

              WOFFEL ADMIN

            </div>

            <h1 className="
              admin-header-title
            ">

              Dashboard

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

              {unreadCount}

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

          <div>

            <div className="
              admin-header-subtitle
            ">

              Selamat datang kembali

            </div>

            <div className="
              admin-header-user
            ">

              {displayName}

            </div>

          </div>

          <div className={`
            admin-realtime-status
            admin-realtime-${realtimeStatus}
          `}>

            <div className="
              admin-realtime-dot
            "></div>

            <span>

              {
                realtimeLabel[
                  realtimeStatus
                ]
              }

            </span>

          </div>

        </div>

      </div>

      <div className="
        admin-header-actions
      ">

        <button

          onClick={() =>
            setSoundOn(
              prev => !prev
            )
          }

          className={`
            admin-btn

            ${
              soundOn
                ? `
                  admin-btn-active
                `
                : ""
            }
          `}

        >

          <span>

            {
              soundOn
                ? "🔊"
                : "🔇"
            }

          </span>

          <span>

            {
              soundOn
                ? "Sound On"
                : "Muted"
            }

          </span>

        </button>

        <button

          onClick={handleLogout}

          className="
            admin-btn
          "

        >

          <span>
            ↗
          </span>

          <span>
            Logout
          </span>

        </button>

      </div>

      {role === "admin" && (

        <button

          onClick={exportCSV}

          className="
            admin-btn
            admin-btn-export
          "

        >

          ⭳ Export CSV

        </button>

      )}

    </div>

  )

}

export default DashboardHeader