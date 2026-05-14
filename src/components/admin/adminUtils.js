export const formatRupiah = (
  angka = 0
) => {

  return new Intl
    .NumberFormat(
      "id-ID"
    )
    .format(
      Number(angka) || 0
    )

}

export const formatStatus = (
  status = ""
) => {

  const cleaned =
    cleanStatus(status)

  const labels = {

    pending:
      "Pending",

    proses:
      "Diproses",

    selesai:
      "Selesai"

  }

  return (
    labels[cleaned] ||
    "Unknown"
  )

}

export const cleanStatus = (
  status = ""
) => {

  return String(status)

    .replace(/'/g, "")

    .trim()

    .toLowerCase()

}

export const getStatusColor = (
  status
) => {

  const cleaned =
    cleanStatus(status)

  const colors = {

    pending:
      "#ff4d4f",

    proses:
      "#faad14",

    selesai:
      "#52c41a"

  }

  return (
    colors[cleaned] ||
    "#888"
  )

}

export const getTimeAgo = (
  date
) => {

  if (!date)
    return "-"

  const now =
    new Date()

  const created =
    new Date(date)

  const diff =
    Math.floor(
      (now - created) / 1000
    )

  if (diff < 60) {

    return `
      ${diff}
      detik lalu
    `

  }

  const minutes =
    Math.floor(
      diff / 60
    )

  if (minutes < 60) {

    return `
      ${minutes}
      menit lalu
    `

  }

  const hours =
    Math.floor(
      minutes / 60
    )

  if (hours < 24) {

    return `
      ${hours}
      jam lalu
    `

  }

  const days =
    Math.floor(
      hours / 24
    )

  return `
    ${days}
    hari lalu
  `

}

export const getTimeColor = (
  date
) => {

  if (!date)
    return "#888"

  const now =
    new Date()

  const created =
    new Date(date)

  const minutes =
    Math.floor(
      (now - created) / 60000
    )

  if (minutes >= 15)
    return "#cf1322"

  if (minutes >= 10)
    return "#ff4d4f"

  if (minutes >= 5)
    return "#faad14"

  return "#52c41a"

}

export const exportOrdersCSV = (
  orders = [],
  filteredOrders = []
) => {

  if (
    !orders.length
  ) {

    alert(
      "Tidak ada data order"
    )

    return

  }

  const headers = [

    "Order ID",

    "Brand",

    "Status",

    "Customer",

    "Outlet",

    "Phone",

    "Variant",

    "Qty",

    "Price",

    "Created At"

  ]

  const safe = (
    value
  ) => {

    return `"${String(
      value ?? "-"
    ).replace(
      /"/g,
      '""'
    )}"`

  }

  const rows =
    filteredOrders.map(
      order => [

        safe(
          order.order_id
        ),

        safe(
          order.type
        ),

        safe(
          formatStatus(
            order.status
          )
        ),

        safe(
          order.customer_name
        ),

        safe(
          order.outlet
        ),

        safe(
          order.phone
        ),

        safe(
          order.variant
        ),

        safe(
          order.qty || 1
        ),

        safe(
          order.price
        ),

        safe(

          new Date(
            order.created_at
          ).toLocaleString(
            "id-ID",
            {
              timeZone:
                "Asia/Jakarta"
            }
          )

        )

      ]
    )

  const csvContent = [

    headers.join(","),

    ...rows.map(
      row =>
        row.join(",")
    )

  ].join("\n")

  const blob =
    new Blob(
      [csvContent],
      {
        type:
          "text/csv;charset=utf-8;"
      }
    )

  const url =
    URL.createObjectURL(
      blob
    )

  const link =
    document.createElement(
      "a"
    )

  const timestamp =
    new Date()

      .toISOString()

      .replace(
        /[:.]/g,
        "-"
      )

  link.href = url

  link.setAttribute(
    "download",

    `woffel-orders-${timestamp}.csv`

  )

  document.body.appendChild(
    link
  )

  link.click()

  document.body.removeChild(
    link
  )

  URL.revokeObjectURL(
    url
  )

}