import React, { useState, ChangeEvent, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

interface CardPair {
  id: number;
  question: string;
  answer: string;
}

function CardInput() {
  const [pairs, setPairs] = useState<CardPair[]>(() => {
    // Retrieve stored pairs from local storage or initialize with a default pair
    const storedPairs = localStorage.getItem('cardPairs');
    return storedPairs ? JSON.parse(storedPairs) : [{ id: 1, question: '', answer: '' }];
  });

  useEffect(() => {
    // Save pairs to local storage whenever pairs change
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
      // Reassign new IDs to the remaining pairs
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

  return (
    <div>
      <div>Input your card here:</div>
      {pairs.map((pair) => (
        <div key={pair.id} style={{ display: 'flex', marginBottom: '10px' }}>
          <input
            type="text"
            placeholder={`Question ${pair.id}`}
            value={pair.question}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleInputChange(pair.id, 'question', e.target.value)
            }
            style={{ width: '500px', height: '100px', marginRight: '10px' }}
          />
          <input
            type="text"
            placeholder={`Answer ${pair.id}`}
            value={pair.answer}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleInputChange(pair.id, 'answer', e.target.value)
            }
            style={{ width: '500px', height: '100px', marginRight: '10px' }}
          />
          <button onClick={() => handleDeletePair(pair.id)}>Delete Card</button>
        </div>
      ))}
      <button onClick={handleAddPair}>Add Card</button>
    </div>
  );
}

export default CardInput;