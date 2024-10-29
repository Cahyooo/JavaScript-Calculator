import { useState } from "react";
import "./style.css";

function App() {
  const [resultCalculations, setResultCalculations] = useState(null);
  const [result, setResult] = useState("0");
  const [decimal, setDecimal] = useState(true);
  const [answered, setAnswered] = useState(false);

  const handleClick = (e) => {
    const button = e.target.innerText;
    console.log(button);

    // Menghapus Data
    if (button === "AC") {
      setResult("0");
      setResultCalculations(null);
      setDecimal(true);
      setAnswered(false)
      return;
    }

    if (button === ".") {
      setDecimal(false);
      if (resultCalculations.slice(-1) === "0") {
        setResult("0.");
        setResultCalculations(`${resultCalculations}.`);
        return;
      }
      if (!resultCalculations) {
        setResult("0.");
        setResultCalculations("0.");
        return;
      }
      if (
        resultCalculations.slice(-1) === "/" ||
        resultCalculations.slice(-1) === "+" ||
        resultCalculations.slice(-1) === "x" ||
        resultCalculations.slice(-1) === "-"
      ) {
        setResult(`0.`);
        setResultCalculations(`${resultCalculations}0.`);
        return;
      }
      if (!decimal) {
        return;
      }
    }

    // Cek apakah hasilnya kosong,jika iya biarin saja
    if (button === "=" && result === "0" && !resultCalculations) {
      return;
    }

    //! HASIL
    if (button === "=") {
      if (resultCalculations.includes("=")) {
        return;
      }
      let filteredQuestions = resultCalculations;
      filteredQuestions = resultCalculations.replace(/x/g, "*");
      if (
        resultCalculations.slice(-1) === "/" ||
        resultCalculations.slice(-1) === "+" ||
        resultCalculations.slice(-1) === "x" ||
        resultCalculations.slice(-1) === "-"
      ) {
        filteredQuestions = filteredQuestions.slice(0, -1);
      }

      console.log(filteredQuestions);
      const answer = eval(filteredQuestions);
      setDecimal(true);
      setResult(answer);
      setResultCalculations(`${filteredQuestions}=${answer}`);
      setAnswered(answer);
      return;
    }

    // Apakah inputan menerima x,/,+,-
    if (button === "x" || button === "/" || button === "+" || button === "-") {
      setDecimal(true);

      if (answered) {
        setResult(button);
        setResultCalculations(answered + button);
        return
      }

      // Cek apakah hasil kosong, dan inputan adalah -,maka dimasukkan sebagai minus
      if (button === "-" && !resultCalculations) {
        setResult("-");
        setResultCalculations("-");
        return;
      }

      // Cek apakah hasil kosong,tetapi sudah ada minusnya,maka dibiarin
      if (!resultCalculations || resultCalculations === "-") {
        return;
      }

      if (
        resultCalculations.slice(-1) === "-" &&
        (resultCalculations.slice(-2)[0] === "/" ||
          resultCalculations.slice(-2)[0] === "+" ||
          resultCalculations.slice(-2)[0] === "x") &&
        (button === "x" || button === "/" || button === "+")
      ) {
        setResult(button);
        setResultCalculations(resultCalculations.slice(0, -2) + button);
        return;
      }

      if (
        resultCalculations.slice(-1) === "-" &&
        (resultCalculations.slice(-2)[0] === "/" ||
          resultCalculations.slice(-2)[0] === "+" ||
          resultCalculations.slice(-2)[0] === "x") &&
        button === "-"
      ) {
        return;
      }

      if (
        resultCalculations.slice(-1) === "-" &&
        button === "-" &&
        resultCalculations.slice(-2)[0] === "-"
      ) {
        return;
      }

      if (
        resultCalculations.slice(-1) === "-" &&
        resultCalculations.slice(-2)[0] === "-" &&
        (button === "x" || button === "/" || button === "+")
      ) {
        setResult(button);
        setResultCalculations(resultCalculations.slice(0, -2) + button);
        return;
      }

      if (
        resultCalculations.slice(-1) === "-" &&
        (button === "x" || button === "/" || button === "+")
      ) {
        setResult(button);
        setResultCalculations(resultCalculations.slice(0, -1) + button);
        return;
      }

      // Cek apakah hasil string akhir seperti x,/,+
      if (
        (resultCalculations.slice(-1) === "x" ||
          resultCalculations.slice(-1) === "/" ||
          resultCalculations.slice(-1) === "+") &&
        button !== "-"
      ) {
        setResult(button);
        setResultCalculations(resultCalculations.slice(0, -1) + button);
        return;
      }

      setResult(button);
      setResultCalculations(resultCalculations + button);
      return;
    }

    if (result === "0") {
      setResult(button);
      setResultCalculations(button);
      return;
    }

    if (
      result[0] === "+" ||
      result[0] === "-" ||
      result[0] === "/" ||
      result[0] === "x"
    ) {
      setResult(button);
      setResultCalculations(resultCalculations + button);
      return;
    }
    if (!answered) {
      setResult(result + button);
      setResultCalculations(resultCalculations + button);
      return;
    }
    if (answered) {
      console.log("tembus");
      setResult(button);
      setResultCalculations(button);
      setAnswered(false);
      setDecimal(true)
    }
  };

  return (
    <main className="position-absolute top-50 start-50 translate-middle">
      <p id="display-calculations">{resultCalculations}</p>
      <p id="display">{result}</p>

      <button onClick={handleClick} id="clear">
        AC
      </button>
      <button onClick={handleClick} id="divide">
        /
      </button>
      <button onClick={handleClick} id="multiply">
        x
      </button>
      <button onClick={handleClick} id="seven">
        7
      </button>
      <button onClick={handleClick} id="eight">
        8
      </button>
      <button onClick={handleClick} id="nine">
        9
      </button>
      <button onClick={handleClick} id="subtract">
        -
      </button>
      <button onClick={handleClick} id="four">
        4
      </button>
      <button onClick={handleClick} id="five">
        5
      </button>
      <button onClick={handleClick} id="six">
        6
      </button>
      <button onClick={handleClick} id="add">
        +
      </button>
      <button onClick={handleClick} id="one">
        1
      </button>
      <button onClick={handleClick} id="two">
        2
      </button>
      <button onClick={handleClick} id="three">
        3
      </button>
      <button onClick={handleClick} id="zero">
        0
      </button>
      <button onClick={handleClick} id="decimal">
        .
      </button>
      <div className="equals">
        <button onClick={handleClick} id="equals">
          =
        </button>
      </div>
    </main>
  );
}

export default App;
