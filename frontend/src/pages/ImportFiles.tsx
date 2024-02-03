import React from "react";
import Navbar from "../components/Navbar";
import "../styles/ImportFiles.css"; // Import a separate CSS file for styling

function ImportFiles() {
  // Function to handle file selection
  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];

    // Check if the selected file is a text file
    if (selectedFile && selectedFile.type === "text/plain") {
      const reader = new FileReader();

      reader.onload = (event) => {
        try {
          const fileContent = event.target.result;
          const parsedData = JSON.parse(fileContent);

          // Create a dictionary based on the parsed data
          const cardDictionary = {};
          parsedData.forEach((pair) => {
            cardDictionary[pair.id] = pair;
          });

          // Use the cardDictionary as needed
          console.log("Card Dictionary:", cardDictionary);
        } catch (error) {
          console.error("Error parsing file:", error);
        }
      };

      reader.readAsText(selectedFile);
    } else {
      alert("Please select a valid text file (.txt)");
      // You can also clear the file input if needed
      // e.target.value = null;
    }
  };

  return (
    <div>
      <Navbar />
      <h1 className="memotech-title">Memotech</h1>
      {/* File input button */}
      <input
        type="file"
        onChange={handleFileSelect}
        className="file-input"
        accept=".txt"
      />
      {/* Add any additional content or components as needed */}
    </div>
  );
}

export default ImportFiles;