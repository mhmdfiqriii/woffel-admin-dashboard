function ReviewCard({
  name,
  rating,
  review
}) {

  return (

    <div className="
      admin-review-card
    ">

      <div className="
        admin-review-top
      ">

        <div className="
          admin-review-name
        ">
          {name}
        </div>

        <div className="
          admin-review-rating
        ">
          ★ {rating}
        </div>

      </div>

      <div className="
        admin-review-text
      ">
        {review}
      </div>

    </div>

  )

}

export default ReviewCard