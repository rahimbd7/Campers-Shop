import  { useEffect, useState } from "react";
import slides from "../constants/SliderData";
import { getNextIndex, getPrevIndex } from "../utils/SliderUtils/sliderUtils";

const Slider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => getNextIndex(prev, slides.length));
    }, 5000); // Auto-slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <div
            className="w-full h-screen bg-cover bg-center flex justify-center items-center"
            style={{ backgroundImage: `url(${slide.background})` }}
          >
            <div className="space-y-5 text-center bg-black/40 p-4 rounded">
              <h1 className="text-3xl w-2/3 lg:w-full lg:text-5xl font-bold text-white">
                {slide.title}
                <span className="text-[#00A4EF]">{slide.highlight}</span>
              </h1>
              <h4 className="text-xl lg:text-3xl font-bold text-white">
                {slide.subtitle}
              </h4>
            </div>
          </div>
        </div>
      ))}

      <div className="absolute flex justify-between w-full px-5 top-1/2 -translate-y-1/2 z-20">
        <button
          onClick={() => setCurrent(getPrevIndex(current, slides.length))}
          className="btn btn-circle"
        >
          ❮
        </button>
        <button
          onClick={() => setCurrent(getNextIndex(current, slides.length))}
          className="btn btn-circle"
        >
          ❯
        </button>
      </div>
    </div>
  );
};

export default Slider;
