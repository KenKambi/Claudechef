import icon from "../src/assets/react.svg"
import {SiCodechef} from "react-icons/si"

export default function Header() {
  return (
    <header>
      <nav className="navbar">
        <SiCodechef size={40}/> 
        <span>Claude Chef</span>
      </nav>
    </header>
  );    
}
