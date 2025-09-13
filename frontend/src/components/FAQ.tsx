import React, { useEffect, useState } from "react";

const FAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
const [faqs,setFaqs] = useState<{ question: string; answer: string}[]>([
    
])
  useEffect(() => {
     fetch("data/faqs.json")
       .then((res) => res.json())
       .then((data) => setFaqs(data));
   }, []);

  return (
    <div className="container mx-auto my-10">
      <section className="px-4 md:px-10 lg:px-20 py-8">
        <h1 className="text-[#605DFF] text-2xl font-bold lg:text-3xl text-center mb-6 md:py-8 lg:py-10">
          Frequently Asked Questions
        </h1>

        <div className="join join-vertical bg-base-100 w-full mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`collapse collapse-arrow join-item border-base-300 border transition-colors duration-300 ${
                activeIndex === index ? "bg-[#605DFF] text-white" : "bg-base-100"
              }`}
            >
              <input
                type="radio"
                name="faq-accordion"
                checked={activeIndex === index}
                onChange={() => setActiveIndex(index)}
              />
              <div className="collapse-title font-semibold">{faq.question}</div>
              <div className="collapse-content text-sm">{faq.answer}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default FAQ;
