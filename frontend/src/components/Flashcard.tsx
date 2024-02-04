import { useState } from "react";
import '../styles/CardStyles.css';

export default function Flashcard({ card }) {
  const [side, setSide] = useState<boolean>(false);

  function handleClick() {
    console.log("clicked!");
    setSide(!side);
    console.log(side);
  }
  return (
    <div className={`card ${side ? "side" : ""}`} onClick={handleClick}>
      {/* <small>
        <span>Card ID</span>
        {card.id}
      </small> */}
      {/* {side ? card.fields.side1 : card.fields.side2} */}
      <div className="front">{card.question}</div>
      <div className="back">{card.answer}</div>
    </div>
  );
}
