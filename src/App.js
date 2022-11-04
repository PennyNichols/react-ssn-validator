import { useState } from "react";
import "./styles.css";

function formatSoc(value) {
  if (!value) return value;
  const soc = value.replace(/[^\d]/g, "");
  const socLength = soc.length;
  if (socLength < 4) return soc;
  if (socLength < 6) {
    return `${soc.slice(0, 3)}-${soc.slice(3)}`;
  }
  return `${soc.slice(0, 3)}-${soc.slice(3, 5)}-${soc.slice(5, 9)}`;
}

export default function App() {
  const [soc, setSoc] = useState("");
  const [valid, setValid] = useState(false);
  const [note, setNote] = useState("");

  const handleInput = (e) => {
    const formattedSoc = formatSoc(e.target.value);
    setSoc(formattedSoc);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (soc.length < 11) {
      setValid(false);
      setNote(`A Valid Social Security Number contains 9 numbers.`);
    }
    if (soc.length === 11) {
      setValid(true);
      setNote(`Social Security Number XXX-XX-${soc.slice(7, 11)} is valid`);
    }
  };

  return (
    <div className="App">
      <h3>SSN Validator</h3>
      <form onSubmit={handleSubmit}>
        <input
          value={soc}
          placeholder="XXX-XX-XXXX"
          onChange={(e) => handleInput(e)}
        />
        <button type="submit">Validate</button>
      </form>
      {note}
    </div>
  );
}
