import { useState } from 'react';
import { FormEvent } from 'react';
import CardSet from '../components/CardSet';
import Navbar from '../components/Navbar';

function Card() {
  const [inputValue, setInputValue] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); // Prevent the default form submission behavior
    // Handle the form submission here (e.g., send data to server)
    // You can use fetch or any other method to send data to the server
    // For demonstration purposes, let's log the form data to the console
    console.log('Submitted value:', inputValue);
    setInputValue(''); // Reset the input value after submission
  }

  return (
    <div>
      <Navbar />
      <CardSet />
      <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center' }}>
        <input
          type="text"
          name="name"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
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
          Send
        </button>
      </form>
    </div>
  );
}

export default Card;
