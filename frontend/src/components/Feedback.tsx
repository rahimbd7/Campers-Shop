import React from "react";

import StarRatingComponent from "react-star-rating-component";

interface CustomerFeedback {
  id?: number;
  name: string;
  feedback: string;
  rating: number;
  image: string;
}

interface FeedbackProps {
  customerfeedback: CustomerFeedback;
}

const Feedback: React.FC<FeedbackProps> = ({ customerfeedback }) => {
  const { name, feedback, rating, image } = customerfeedback;

  return (
    <div className="mt-10">
      <div className="card card-side bg-base-100 rounded-none w-1/3 md:w-2/3 lg:w-2/3">
        <figure className="avatar h-[50px] w-[200px] md:h-[100px] md:w-[150px] mt-20 md:mt-10">
          <img src={image} alt="customer feedback" className="rounded-full" />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-[#605DFF] font-bold">{name}</h2>
          <p className="text-black">{feedback}</p>
          <div className="card-actions text-2xl ">
            <StarRatingComponent
              name="rate1"
              starCount={5}
              value={rating}
              starColor="#605DFF"
              emptyStarColor="#D9D9D9"
              editing={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
