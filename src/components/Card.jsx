import React from "react";

const Card = ({ card, handleClick, flipped }) => (
  <div
    onClick={() => handleClick(card)}
    className={`md:w-28 md:h-28 w-16 h-16 flex items-center justify-center cursor-pointer border border-gray-300 rounded-lg transition-transform transform ${
      flipped ? "bg-white" : "bg-green-800"
    } hover:scale-105`}
  >
    {flipped ? (
      <div className="w-full h-full flex items-center justify-center text-2xl font-semibold">
        {card.symbol}
      </div>
    ) : (
      <div className="w-full h-full flex items-center justify-center md:text-[4rem] text-[2rem] text-amber-800  font-semibold">
        ?
      </div>
    )}
  </div>
);

export default Card;
