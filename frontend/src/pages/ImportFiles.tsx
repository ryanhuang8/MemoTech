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
          const replacedTabs = fileContent.replace(/\t/g, ":::");
          console.log(replacedTabs)
          const parsedData = replacedTabs.replace(/\n/g, ";;;");
          console.log("Modified Content:", parsedData);
          // parse here
          console.log(parsedData)
          const lines = parsedData.split(";;;");

          // Initialize an array to store question-answer pairs
          const cardDictionary = [];

          // Loop through each line
          lines.forEach((line, index) => {
            // Split each line by ':::' to separate question and answer
            const [question, answer] = line.split(":::");
            // Add question-answer pair to the array
            cardDictionary.push({
              id: index + 1, // assuming id starts from 1
              question: question, // remove leading/trailing spaces
              answer: answer // remove leading/trailing spaces
            });
          });

          // Use the cardDictionary as needed
          localStorage.setItem('cardPairs', JSON.stringify(cardDictionary));
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