import Navbar from "../components/Navbar";
import CardInput from "../components/CardInput";
import ImportFiles from "../components/ImportFiles";
function CreateFlashcards() {
  return (
    <div>
      <Navbar />
      <ImportFiles></ImportFiles>
      <CardInput />
    </div>
  );
}

export default CreateFlashcards;