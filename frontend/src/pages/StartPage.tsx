import Navbar from "../components/Navbar"

function StartPage() {
  return (
    <div>
        <Navbar />
        <h1>MemoTech</h1>
        <div id="stars1"></div>
        <div id="stars2"></div>
        {/* <div id="stars3"></div> */}
        <li><a href="/import">Create Your Flashcards</a></li>
    </div>
    
  )
}

export default StartPage