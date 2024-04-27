import styles from "./input.css";
import Header from "./Header/Header";
import Options from "./Main/Options";
import Toggle from "./Main/Toggle";
import House from "./Main/House";

export default function App() {
  return (
    <div className="px-[40px]">
      <div className="fixed">
        <Header></Header>
        <Options></Options>
      </div>
      <House></House>
    </div>
  );
}
