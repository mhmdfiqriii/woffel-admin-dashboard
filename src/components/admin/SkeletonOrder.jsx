function SkeletonOrder() {

  return (

    <div className="admin-order admin-order-skeleton">

      <div className="admin-order-top">

        <div className="admin-skeleton admin-skeleton-type"></div>

        <div className="admin-skeleton admin-skeleton-badge"></div>

      </div>

      <div className="admin-order-main">

        <div className="admin-skeleton admin-skeleton-id"></div>

        <div className="admin-skeleton admin-skeleton-customer"></div>

      </div>

      <div className="admin-order-bottom">

        <div className="admin-order-info">

          <div className="admin-skeleton admin-skeleton-time"></div>

          <div className="admin-skeleton admin-skeleton-price"></div>

        </div>

        <div className="admin-order-actions">

          <div className="admin-skeleton admin-skeleton-action"></div>

          <div className="admin-skeleton admin-skeleton-action"></div>

        </div>

      </div>

    </div>

  )

}

export default SkeletonOrder