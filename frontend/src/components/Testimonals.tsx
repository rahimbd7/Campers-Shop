import { useEffect, useState } from "react";
import Feedback from "./Feedback";
import Marquee from "react-fast-marquee";

const Testimonals = () => {
  const [feedback, setFeedback] = useState<{id: number; name: string; feedback: string; rating: number; image: string}[]>([]);

  useEffect(() => {
    fetch("data/customersFeedback.json")
      .then((res) => res.json())
      .then((data) => setFeedback(data));
  }, []);
  return (
    <div className="my-20">
      <h1 className="text-[#605DFF] text-2xl font-bold lg:text-3xl text-center  md:py-8 lg:py-10">
        Testimonials
      </h1>
      <Marquee pauseOnHover={true} speed={200}>
        {feedback.map((customerfeedback) => (
          <Feedback
            key={customerfeedback?.id}
            customerfeedback={customerfeedback}
          ></Feedback>
        ))}
      </Marquee>
    </div>
  );
};

export default Testimonals;
