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
  const [note, setNote] = useState("");
  const [valid, setValid] = useState(true);

  const handleInput = (e) => {
    const formattedSoc = formatSoc(e.target.value);
    setSoc(formattedSoc);
  };
  console.log(soc);
  console.log(valid);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (soc.slice(0, 1) == 9) {
      setNote(`A valid Social Security Number cannot begin with 9`);
      setSoc("");
    } else if (soc.slice(0, 3) == "000") {
      setNote(`A valid Social Security Number cannot begin with 000`);
      setSoc("");
    } else if (soc.slice(0, 3) == "666") {
      setNote(`A valid Social Security Number cannot begin with 666`);
      setSoc("");
    } else if (soc.slice(4, 6) == "00") {
      setNote(`A valid Social Security Number cannot contain XXX-00-XXXX`);
      setSoc("");
    } else if (soc.slice(7) == "0000") {
      setNote(`A valid Social Security Number cannot end in 0000`);
      setSoc("");
    } else if (soc.length < 11) {
      setNote(`A valid Social Security Number contains 9 numbers.`);
      setSoc("");
    } else if (soc.length === 11) {
      setNote(`Social Security Number XXX-XX-${soc.slice(7)} is valid`);
      setSoc("");
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
