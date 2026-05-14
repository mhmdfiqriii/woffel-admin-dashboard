function StoreStatusBadge({
  realtimeStatus
}) {

  const isOnline =
    realtimeStatus ===
    "online"

  const isConnecting =
    realtimeStatus ===
    "connecting"

  const isReconnecting =
    realtimeStatus ===
    "reconnecting"

  const getLabel = () => {

    if (isOnline) {
      return "Realtime Online"
    }

    if (isConnecting) {
      return "Connecting..."
    }

    if (isReconnecting) {
      return "Reconnect..."
    }

    return "Realtime Offline"

  }

  return (

    <div
      className={`
        admin-realtime-status

        ${
          isOnline

            ? `
              admin-realtime-online
            `

            : `
              admin-realtime-offline
            `
        }
      `}
    >

      <div className="
        admin-realtime-dot
      "></div>

      <span>

        {getLabel()}

      </span>

    </div>

  )

}

export default StoreStatusBadge