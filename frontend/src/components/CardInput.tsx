import React, { useState, ChangeEvent, useEffect } from 'react';
import '../styles/CardInput.css';

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
  const handleFocus = (e: React.FocusEvent<HTMLDivElement>, field: string) => {
    if (e.currentTarget.innerText === `Question ${pair.id}` || e.currentTarget.innerText === `Answer ${pair.id}`) {
      e.currentTarget.innerText = ''; // Clear placeholder text on focus
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>, field: string) => {
    if (e.currentTarget.innerText === '') {
      e.currentTarget.innerText = ``; // Restore placeholder text on blur if the div is empty
    } else {
      onInputChange(pair.id, field, e.currentTarget.innerText);
    }
  };

  return (
    <div key={pair.id} style={{ display: 'flex', marginBottom: '10px' }}>
      <div
        contentEditable
        onBlur={(e) => handleBlur(e, 'question')}
        onFocus={(e) => handleFocus(e, 'question')}
        style={{ width: '500px', minHeight: '100px', paddingRight: '20px', paddingLeft: '20px', textAlign: 'left', marginRight: '10px', wordWrap: 'break-word', border: '1px solid #ccc' }}
      >
        {pair.question || `Question ${pair.id}`}
      </div>
      <div
        contentEditable
        onBlur={(e) => handleBlur(e, 'answer')}
        onFocus={(e) => handleFocus(e, 'answer')}
        style={{ width: '500px', minHeight: '100px', paddingRight: '20px', paddingLeft: '20px', textAlign: 'left', marginRight: '10px', wordWrap: 'break-word', border: '1px solid #ccc' }}
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

  const [cardDictionary, setCardDictionary] = useState<Record<number, CardPair>>({});

  useEffect(() => {
    localStorage.setItem('cardPairs', JSON.stringify(pairs));
  }, [pairs]);

  const handleAddPair = () => {
    setPairs((prevPairs) => [
      ...prevPairs,
      { id: prevPairs.length + 1, question: '', answer: '' },
    ]);
  };

  const handleDeletePair = (id: number) => {
    setPairs((prevPairs) => {
      const updatedPairs = prevPairs.filter((pair) => pair.id !== id);
      return updatedPairs.map((pair, index) => ({ ...pair, id: index + 1 }));
    });
  };

  const handleInputChange = (id: number, field: string, value: string) => {
    setPairs((prevPairs) =>
      prevPairs.map((pair) =>
        pair.id === id ? { ...pair, [field]: value } : pair
      )
    );
  };

  const handleStudy = () => {
    const dictionary: Record<number, CardPair> = {};
    pairs.forEach((pair) => {
      dictionary[pair.id] = pair;
    });
    setCardDictionary(dictionary);

    // You can do something else with the dictionary, like navigate to a study page
    // or send it to an API for further processing.
  };

  return (
    <div>
      <div>Input your card here:</div>
      {pairs.map((pair) => (
        <CardPairComponent
          key={pair.id}
          pair={pair}
          onInputChange={handleInputChange}
          onDeletePair={handleDeletePair}
        />
      ))}
      <button onClick={handleAddPair}>Add Card</button>
      <a onClick={handleStudy} href="/flashcard" className="a-button">
        Study
      </a>
    </div>
  );
}

export default CardInput;