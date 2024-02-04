import { useState, useEffect, ReactNode } from "react";
// import "./CardsStyles.css";

import Flashcard from "./Flashcard";
import reactNodeToString from "react-node-to-string"

// https://www.youtube.com/watch?v=hEtZ040fsD8&feature=youtu.be&t=719 (flashcards)
// https://www.youtube.com/watch?v=vs6usnS5OTE (slider)

interface FlashcardData {
    answer: ReactNode;
    question: ReactNode;
    id: string;
    // Add other properties here as needed
}

interface CardsProps {
  setQuestion: React.Dispatch<React.SetStateAction<string>>;
}

export default function Cards({ setQuestion }: CardsProps) {
    const [flashcarddata, setFlashcarddata] = useState<FlashcardData[]>([]);

    useEffect(() => {
        // const url =
        //   "https://api.airtable.com/v0/appqY5UZYlf41Q5VT/Table%201?api_key=keyPZ9SKzXIt4Ek1v";
        // fetch(url)
        //   .then((response) => {
        //     if (!response.ok) {
        //       throw new Error("Network response was not ok");
        //     }
        //     return response.json();
        //   })
        //   .then((json) => {
        //     setFlashcarddata(json.records);
        //   })
        //   .catch((error) => {
        //     console.error("Error fetching data:", error);
        //   });
        setFlashcarddata(JSON.parse(localStorage.cardPairs));
      }, []);
   
  // https://www.debuggr.io/react-map-of-undefined/
  const cards = flashcarddata.map((card) => {
    return <Flashcard card={card} key={card.id} />;
  });

  const loading = <div className="loading">Loading flashcard content...</div>;

  // navigation in cards
  const [current, setCurrent] = useState(0);
  function previousCard() {
    setCurrent(current - 1);
    console.log(cards[current-1].props.card.question)
    setQuestion(cards[current-1].props.card.question);
  }
  function nextCard() {
    setCurrent(current + 1);
    console.log(cards[current+1].props.card.question)
    setQuestion(reactNodeToString(cards[current+1].props.card.question)); // get question
  }

  // if (flashcarddata) {
  //   return (
  //     <div>
  //       <div>The number of cards is: {flashcarddata.length}</div>
  //       {cards[0]}
  //     </div>
  //   );
  // } else {
  //   return <div>Loading...</div>;
  // }
  return (
    <div>
      {/* number of cards */}
      {flashcarddata && flashcarddata.length > 0 ? (
        <div className="cardNumber">
          Card {current + 1} of {flashcarddata.length}
        </div>
      ) : (
        ""
      )}
      {/* /number of cards */}

      {/* render cards */}
      {flashcarddata && flashcarddata.length > 0 ? cards[current] : loading}
      {/* /render cards */}

      {/* render nav buttons */}
      <div className="nav">
        {current > 0 ? (
          <button onClick={previousCard}>Previous card</button>
        ) : (
          <button className="disabled" disabled>
            Previous card
          </button>
        )}
        {current < flashcarddata.length - 1 ? (
          <button onClick={nextCard}>Next card</button>
        ) : (
          <button className="disabled" disabled>
            Next card
          </button>
        )}
        {/* /render nav buttons */}
      </div>
    </div>
  );
}
