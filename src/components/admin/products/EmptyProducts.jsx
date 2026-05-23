function EmptyProducts({

  icon = "📦",

  title = "Tidak Ada Produk",

  subtitle = `
    Menu kosong.
    Kapitalisme lagi tidur.
  `

}) {

  return (

    <div className="
      admin-empty
    ">

      <div className="
        admin-empty-icon
      ">
        {icon}
      </div>

      <div className="
        admin-empty-title
      ">
        {title}
      </div>

      <div className="
        admin-empty-subtitle
      ">
        {subtitle}
      </div>

    </div>

  )

}

export default EmptyProducts