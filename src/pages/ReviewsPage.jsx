import AdminLayout
from "../components/admin/shared/AdminLayout"

import PageHeader
from "../components/admin/shared/PageHeader"

import ReviewCard
from "../components/admin/reviews/ReviewCard"

function ReviewsPage() {

  return (

    <AdminLayout>

      <PageHeader
        title="Reviews"
        subtitle="
          Monitor customer feedback
        "
      />

      <div className="
        admin-review-list
      ">

        <ReviewCard />
        <ReviewCard />

      </div>

    </AdminLayout>

  )

}

export default ReviewsPage