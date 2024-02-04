import "../styles/ImportFiles.css"; // Import a separate CSS file for styling

function ImportFiles() {
  // Function to handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];

      // Check if the selected file is a text file
      if (selectedFile && selectedFile.type === "text/plain") {
        const reader = new FileReader();

        reader.onload = (event) => {
          try {
            if (event.target) {
              const fileContent = event.target.result;
              if (typeof fileContent === 'string') {
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
                for (let index = 2; index < lines.length; index++) {
                  const line = lines[index];
                  // Split each line by ':::' to separate question and answer
                  const [question, answer] = line.split(":::");
                  // Add question-answer pair to the array
                  cardDictionary.push({
                      id: index + 1, // assuming id starts from 1
                      question: question, // remove leading/trailing spaces
                      answer: answer // remove leading/trailing spaces
                  });
              }

                // Use the cardDictionary as needed
                localStorage.setItem('cardPairs', JSON.stringify(cardDictionary));
                console.log("Card Dictionary:", JSON.stringify(cardDictionary));
              } else {
                console.error("file content is null");
              }
          } else {
            console.error("Event target is null.");
          }} catch (error) {
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
    } else {
      alert("Please select a file.");
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