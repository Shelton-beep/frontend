import { GiHouse } from "react-icons/gi";
import { useState, useEffect } from "react";

interface HeaderProps {
  predictedPrice: number | null;
}

const Header = ({ predictedPrice }: HeaderProps) => {
  const [animatedPrice, setAnimatedPrice] = useState(0);

  useEffect(() => {
    if (predictedPrice !== null) {
      const start = 0;
      const duration = 2000; // Animation duration in milliseconds
      const increment = (predictedPrice - start) / (duration / 16); // frame rate (~60 FPS)

      let currentPrice = start;

      const animate = () => {
        if (currentPrice < predictedPrice) {
          currentPrice = Math.min(currentPrice + increment, predictedPrice); // Ensuring it doesn't exceed the final value
          setAnimatedPrice(currentPrice);
          requestAnimationFrame(animate);
        }
      };

      animate();
    }
  }, [predictedPrice]);

  return (
    <div className="w-full bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 h-[12rem] flex flex-col md:flex-row items-center shadow-lg">
      <div className="justify-start items-center p-6">
        <GiHouse className="md:h-24 md:w-24 w-5 h-5 text-red-500 drop-shadow-lg" />
      </div>
      <div className="flex flex-col justify-center items-center text-center md:text-left md:items-start mx-4">
        <h2 className="text-white md:text-3xl font-extrabold">
          House Price Prediction
        </h2>
        <p className="text-gray-200 md:text-lg hidden md:flex">
          Predict the price of your house using machine learning (Linear
          Regression)
        </p>
        <p className="text-gray-200 flex md:hidden">Machine Learning</p>
        <p className="text-green-500 md:text-lg">
          Predicted Price is:
          {` $${new Intl.NumberFormat("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }).format(animatedPrice)}`}
        </p>
      </div>
    </div>
  );
};

export default Header;
