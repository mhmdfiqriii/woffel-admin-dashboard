export const formatRupiah = (angka) =>
  new Intl.NumberFormat("id-ID")
    .format(angka)

export const formatStatus = (status) => {

  return status?.charAt(0)
    .toUpperCase() +
    status?.slice(1)

}

export const cleanStatus = (status) => {

  return status
    ?.replace(/'/g, "")
    .trim()
    .toLowerCase()

}

export const getStatusColor = (status) => {

  if (status === "pending")
    return "#ff4d4f"

  if (status === "proses")
    return "#faad14"

  return "#52c41a"

}

export const getTimeAgo = (date) => {

  const now = new Date()
  const created = new Date(date)

  const diff =
    Math.floor((now - created) / 1000)

  if (diff < 60)
    return `${diff} detik lalu`

  const minutes =
    Math.floor(diff / 60)

  if (minutes < 60)
    return `${minutes} menit lalu`

  const hours =
    Math.floor(minutes / 60)

  return `${hours} jam lalu`

}

export const getTimeColor = (date) => {

  const now = new Date()
  const created = new Date(date)

  const minutes =
    Math.floor((now - created) / 60000)

  if (minutes >= 15)
    return "#cf1322"

  if (minutes >= 10)
    return "#ff4d4f"

  if (minutes >= 5)
    return "#faad14"

  return "#888"

}

export const exportOrdersCSV = (
  orders,
  filteredOrders
) => {

  if (orders.length === 0) {

    alert("Tidak ada data")
    return

  }

  const headers = [
    "Order ID",
    "Type",
    "Status",
    "Customer",
    "Outlet",
    "Phone",
    "Variant",
    "Price",
    "Created At"
  ]

  const safe = (val) =>
    `"${String(val)
      .replace(/"/g, '""')}"`

  const rows =
    filteredOrders.map(o => [

      safe(o.order_id),
      safe(o.type),
      safe(o.status),
      safe(o.customer_name || "-"),
      safe(o.outlet || "-"),
      safe(o.phone || "-"),
      safe(o.variant),
      safe(o.price),

      safe(
        new Date(o.created_at)
          .toLocaleString(
            "id-ID",
            {
              timeZone:
                "Asia/Jakarta"
            }
          )
      )

    ])

  const csvContent = [

    headers.join(","),

    ...rows.map(r =>
      r.join(",")
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
    URL.createObjectURL(blob)

  const link =
    document.createElement("a")

  link.href = url

  const timestamp =
    new Date().getTime()

  link.setAttribute(
    "download",
    `orders-${timestamp}.csv`
  )

  document.body.appendChild(link)

  link.click()

  document.body.removeChild(link)

}