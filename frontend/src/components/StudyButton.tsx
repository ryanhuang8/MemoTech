import React from "react";
// import axios from 'axios';
import "../styles/StudyButton.css"; // Import the CSS file correctly

const MyComponent: React.FC = () => {
  // const sendRequest = async () => {
  //   try {
  //     const dataToSend = JSON.parse(localStorage.cardPairs);
  //     await axios.post('http://127.0.0.1:5000/', dataToSend);
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };

  return (
    <div>
      <a className="a-button" href="/flashcard">
        Study Your Set
      </a>
    </div>
  );
};

export default MyComponent;
