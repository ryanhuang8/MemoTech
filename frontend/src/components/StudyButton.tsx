import React, { useState } from 'react';
import axios from 'axios';

const MyComponent: React.FC = () => {
  const [responseData, setResponseData] = useState<string>('');

  const sendRequest = async () => {
    try {

        const dataToSend = JSON.parse(localStorage.cardPairs);
        const response = await axios.post('http://127.0.0.1:5000/', dataToSend);

      setResponseData(JSON.stringify(response.data));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <a className="a-button" href="/flashcard" onClick={sendRequest}>Study Your Set</a>
      {/* <div>Response: {responseData}</div> */}
    </div>
  );
};

export default MyComponent;