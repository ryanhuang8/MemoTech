import { useState } from 'react';
import { FormEvent } from 'react';
import CardSet from '../components/CardSet';
import Navbar from '../components/Navbar';

function Card() {
  const [inputValue, setInputValue] = useState('');
  const [question, setQuestion] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); // Prevent the default form submission behavior
    console.log(inputValue)
    console.log(question)

    // Fetch the endpoint with the form data
    const url = `http://127.0.0.1:5000//get-feedback?q=${question}&a=${inputValue}`;

    fetch(url, {
      method: 'GET',
      // headers: {
      //   'Content-Type': 'application/json'
      // }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Handle the response data here
      console.log('Response:', data);
      // You may want to update your UI based on the response
    })
    .catch(error => {
      // Handle errors here
      console.error('There was a problem with the fetch operation:', error);
    });
  
    setInputValue(''); // Reset the input value after submission
  }
  

  return (
    <div>
      <Navbar />
      <CardSet setQuestion={setQuestion}/>
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
