import AdminLayout
from "../components/admin/shared/AdminLayout"

import PageHeader
from "../components/admin/shared/PageHeader"

import ReviewCard
from "../components/admin/reviews/ReviewCard"

import EmptyReviews
from "../components/admin/reviews/EmptyReviews"

function ReviewsPage() {

  const reviews = [
    {
      id: 1,
      name: "Pikri",
      rating: 5,
      review:
        "Kopinya bikin melek sampe lupa mantan."
    },
    {
      id: 2,
      name: "Rafly",
      rating: 4.8,
      review:
        "Packaging rapih, order cepet banget."
    },
    {
      id: 3,
      name: "Nadia",
      rating: 4.9,
      review:
        "Matchanya enak parah sih."
    }
  ]

  return (

    <AdminLayout>

      <PageHeader
        title="Reviews"
        subtitle="
          Monitor customer feedback
        "
      />

      <div className="
        admin-review-summary
      ">

        <div className="
          admin-review-summary-score
        ">
          4.9
        </div>

        <div>

          <div className="
            admin-review-summary-title
          ">
            Excellent Reviews
          </div>

          <div className="
            admin-review-summary-subtitle
          ">
            124 customer reviews
          </div>

        </div>

      </div>

      {reviews.length === 0 ? (

  <EmptyReviews />

) : (

  <div className="
    admin-review-list
  ">

    {reviews.map(review => (

      <ReviewCard
        key={review.id}
        name={review.name}
        rating={review.rating}
        review={review.review}
      />

    ))}

  </div>

)}

      <button className="
        admin-review-more
      ">
        View All Reviews
      </button>

    </AdminLayout>

  )

}

export default ReviewsPage