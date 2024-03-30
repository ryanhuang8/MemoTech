import React, { useState, useEffect } from 'react';
import '../styles/CardInput.css';
import ImportFiles from "./ImportFiles";
import StudyButton from "./StudyButton";

interface CardPair {
  id: number;
  question: string;
  answer: string;
}

interface CardPairProps {
  pair: CardPair;
  onInputChange: (id: number, field: string, value: string) => void;
  onDeletePair: (id: number) => void;
}

const CardPairComponent: React.FC<CardPairProps> = ({ pair, onInputChange, onDeletePair }) => {
  const handleFocus = (e: React.FocusEvent<HTMLDivElement>) => {
    if (e.currentTarget.innerText === `Question ${pair.id}` || e.currentTarget.innerText === `Answer ${pair.id}`) {
      e.currentTarget.innerText = '';
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>, field: string) => {
    if (e.currentTarget.innerText === `Question ${pair.id}`) {
      e.currentTarget.innerText = `Question ${pair.id}`;
    } else {
      onInputChange(pair.id, field, e.currentTarget.innerText);
    }
  };

  return (
    <div key={pair.id} style={{ display: 'flex', marginBottom: '10px' }}>
      <div
        contentEditable
        onBlur={(e) => handleBlur(e, 'question')}

        onFocus={(e) => handleFocus(e)}
        style={{
          width: '500px',
          minHeight: '20px',
          padding: '15px',
          borderRadius: '8px',
          border: '1px solid #ccc',
          boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
          outline: 'none',
          fontFamily: 'Courier New',
          fontSize: '16px',
          lineHeight: '1.4',
          textAlign: 'left',
        }}
      >
        {pair.question || `Question ${pair.id}`}
      </div>
      <div
        contentEditable
        onBlur={(e) => handleBlur(e, 'answer')}

        onFocus={(e) => handleFocus(e)}
        style={{
          width: '500px',
          minHeight: '20px',
          padding: '15px',
          borderRadius: '8px',
          border: '1px solid #ccc',
          boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
          outline: 'none',
          fontFamily: 'Courier New',
          fontSize: '16px',
          lineHeight: '1.4',
          textAlign: 'left',
        }}
      >
        {pair.answer || `Answer ${pair.id}`}
      </div>
      <button onClick={() => onDeletePair(pair.id)}>Delete Card</button>
    </div>
  );
};

function CardInput() {
  const [pairs, setPairs] = useState<CardPair[]>(() => {
    const storedPairs = localStorage.getItem('cardPairs');
    return storedPairs ? JSON.parse(storedPairs) : [{ id: 1, question: '', answer: '' }];
  });

  const [pairIdCounter, setPairIdCounter] = useState<number>(pairs.length + 1);

  // const [, setCardDictionary] = useState<Record<number, CardPair>>({});

  useEffect(() => {
    localStorage.setItem('cardPairs', JSON.stringify(pairs));
  }, [pairs]);

  const handleAddPair = () => {
    setPairs((prevPairs) => [
      ...prevPairs,
      { id: pairIdCounter, question: '', answer: '' },
    ]);
    setPairIdCounter((prevCounter) => prevCounter + 1);
  };

  const handleDeletePair = (id: number) => {
    setPairs((prevPairs) => {
      const updatedPairs = prevPairs.filter((pair) => pair.id !== id);
      return updatedPairs.map((pair, index) => ({ ...pair, id: index + 1 }));
    });
  
    setPairIdCounter((prevCounter) => prevCounter - 1);
  };

  const handleInputChange = (id: number, field: string, value: string) => {
    setPairs((prevPairs) =>
      prevPairs.map((pair) =>
        pair.id === id ? { ...pair, [field]: value } : pair
      )
    );
  };

  return (
    <div>
      <ImportFiles></ImportFiles>
      <div>
        <br />
        <br />
      </div>
      <StudyButton></StudyButton>
      <div style={{ fontWeight: 'bold', fontSize: 'larger', textAlign: 'left' }}>Create your flashcards:
      {/* <a href="/flashcard" className="a-button" style={{ marginLeft: '880px' }}>
        Study
      </a> */}
      </div>
      {pairs.map((pair) => (
        <CardPairComponent
          key={pair.id}
          pair={pair}
          onInputChange={handleInputChange}
          onDeletePair={handleDeletePair}
        />
      ))}
      <button onClick={handleAddPair}>+</button>
    </div>
  );
}

export default CardInput;