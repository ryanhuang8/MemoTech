import '../styles/Navbar.css'

const Navbar = () => {
    
    return (
        <nav className={`horizontal-navbar`}>
            <div className="center-nav">
                <div className="nav-tabs">
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/import_files">Import Files</a></li>
                    <li><a href="/flashcard">Cards</a></li>
                </ul>
                </div>
                <div className="nav-buttons">
                </div>
            </div>
        </nav>
      );
}

export default Navbar;
