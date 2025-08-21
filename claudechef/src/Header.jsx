import icon from "../src/assets/react.svg"
//Header with svg file
export default function Header() {
  return (
    <header>
      <nav className="navbar">
        <img src={icon} alt="React Logo" />
        <span>Claude Chef</span>
      </nav>
    </header>
  );    
}
