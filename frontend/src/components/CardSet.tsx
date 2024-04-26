import { useState, useEffect, ReactNode } from "react";
import Flashcard from "./Flashcard";
import reactNodeToString from "react-node-to-string";

interface FlashcardData {
    answer: ReactNode;
    question: ReactNode;
    id: string;
}

interface CardsProps {
    setQuestion: React.Dispatch<React.SetStateAction<string>>;
    setAnswer: React.Dispatch<React.SetStateAction<string>>;
}

export default function Cards({ setQuestion, setAnswer }: CardsProps) {
    const [flashcarddata, setFlashcarddata] = useState<FlashcardData[]>([]);
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        // Fetch data from API or local storage
        // For example, fetching from localStorage
        const savedData = localStorage.getItem("cardPairs");
        if (savedData) {
            const parsedData: FlashcardData[] = JSON.parse(savedData);
            setFlashcarddata(parsedData);
            // Set the question immediately after the cards are rendered
            if (parsedData && parsedData.length > 0) {
                setQuestion(reactNodeToString(parsedData[0].question));
                setAnswer(reactNodeToString(parsedData[0].answer));
            }
        }
    }, [setQuestion]);

    const cards = flashcarddata.map((card) => {
        return <Flashcard card={card} key={card.id} />;
    });

    const loading = <div className="loading">Loading flashcard content...</div>;

    function previousCard() {
        setCurrent(current - 1);
        setQuestion(reactNodeToString(flashcarddata[current - 1].question));
    }

    function nextCard() {
        setCurrent(current + 1);
        setQuestion(reactNodeToString(flashcarddata[current + 1].question));
    }

    return (
        <div>
            {flashcarddata && flashcarddata.length > 0 ? (
                <div className="cardNumber" style={{ color: 'white' }}>
                    Card {current + 1} of {flashcarddata.length}
                </div>
            ) : (
                ""
            )}

            {flashcarddata && flashcarddata.length > 0 ? cards[current] : loading}

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
            </div>
        </div>
    );
}
