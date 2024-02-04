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
          const cardDictionary = [];
          let index = 0;
          for (const key in parsedData[0]) {
            cardDictionary[index++] = {"id": index, "question": key, "answer": parsedData[0][key]};
          }

          console.log(parsedData[0])
          // Use the cardDictionary as needed
          localStorage.setItem('cardPairs', JSON.stringify(cardDictionary));
          console.log(localStorage);
          console.log("Card Dictionary:", JSON.stringify(cardDictionary));
        } catch (error) {
          console.error("Error parsing file:", error);
        }
      };

      reader.readAsText(selectedFile);
      window.location.reload();
    } else {
      alert("Please select a valid text file (.txt)");
      // You can also clear the file input if needed
      // e.target.value = null;
    }
  };

  return (
    <div>
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