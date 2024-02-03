import Navbar from "../components/Navbar";
import "../styles/Start.css"; // Import a separate CSS file for styling
import CardInput from "../components/CardInput";

function Start() {
  return (
    <div>
      <Navbar />
      <h1 className="memotech-title">Memotech</h1>
      <CardInput />
    </div>
  );
}

export default Start;