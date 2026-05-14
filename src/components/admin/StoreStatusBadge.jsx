function StoreStatusBadge({
  status = "online",
  text
}) {

  const normalizedStatus =
    status?.toLowerCase()

  const statusConfig = {

    online: {
      label:
        text ||
        "Realtime Online",

      className:
        "admin-realtime-online"
    },

    offline: {
      label:
        text ||
        "Realtime Offline",

      className:
        "admin-realtime-offline"
    },

    reconnecting: {
      label:
        text ||
        "Reconnect Database...",

      className:
        "admin-realtime-reconnecting"
    },

    connecting: {
      label:
        text ||
        "Connecting Realtime...",

      className:
        "admin-realtime-connecting"
    }

  }

  const current =
    statusConfig[
      normalizedStatus
    ] ||
    statusConfig.online

  return (

    <div
      className={`
        admin-realtime-status
        ${current.className}
      `}
    >

      <div className="
        admin-realtime-dot
      "></div>

      <span>
        {current.label}
      </span>

    </div>

  )

}

export default StoreStatusBadge