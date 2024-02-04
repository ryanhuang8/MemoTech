import React, { useState } from 'react';
import { FormEvent } from 'react';
import CardSet from '../components/CardSet';
import Navbar from '../components/Navbar';

function Card() {
  const [inputValue, setInputValue] = useState('');
  const [question, setQuestion] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [suggestedDeck, setSuggestedDeck] = useState('');
  const [loading, setLoading] = useState(false); // State for loading indicator

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); // Prevent the default form submission behavior
    setLoading(true); // Set loading state to true when form is submitted
    

    // Fetch the endpoint with the form data
    const url = `http://127.0.0.1:5000/get-feedback?q=${question}&a=${inputValue}`;
    const suggestion_url = `http://127.0.0.1:5000/vector-search?query=${question}${inputValue}`

    fetch(url, {
      method: 'GET',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Handle the response data here
        setSuggestion(data.message);
        console.log('Response:', data);
        // You may want to update your UI based on the response
      })
      .catch(error => {
        // Handle errors here
        console.error('There was a problem with the fetch operation:', error);
      })
      .finally(() => {
        setLoading(false); // Set loading state to false when fetch operation is completed
        setInputValue(''); // Reset the input value after submission
      });

      fetch(suggestion_url, {
        method: 'GET',
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          // Handle the response data here
          setSuggestedDeck(data[1]);
          console.log('fuck u:', data[1]);
          localStorage.cardPairs = data[1];
          // You may want to update your UI based on the response
        })
        .catch(error => {
          // Handle errors here
          console.error('There was a problem with the fetch operation:', error);
        })
        .finally(() => {
          setLoading(false); // Set loading state to false when fetch operation is completed
          setInputValue(''); // Reset the input value after submission
        });
  }

  return (
    <div>
      <Navbar />
      <CardSet setQuestion={setQuestion} />
      <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center' }}>
        <input
          type="text"
          name="name"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          placeholder="Type your message here..."
          style={{
            flex: 1,
            padding: '10px',
            borderRadius: '20px',
            border: '1px solid #ccc',
            marginRight: '10px',
            fontSize: '16px',
          }}
        />
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '20px',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          {loading ? 'Sending...' : 'Send'}
        </button>
      </form>
      {loading && <div>Loading...</div>} {/* Display loading indicator while loading */}
      {suggestion && (
        <div style={{ marginTop: '10px' }}>
          <strong>Suggestion:</strong> {suggestion}
          <div style={{marginTop:'15px'}}>
          <a className="a-button" href="/import">Recommended Flashcards</a>
          </div>

        </div>
        

      )}
      
    </div>
  );
}

export default Card;
