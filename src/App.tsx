import { useState } from "react";
import NumberButton from "./components/NumberButton";
import OperationButton from "./components/OperationButton";
function App() {
  const [display, setDisplay] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);
  const [operator, setOperator] = useState<string | null>("");
  const [operands, setOperands] = useState<{
    operand1: number | null;

    operand2: number | null;
  }>({
    operand1: null,
    operand2: null,
  });

  const [isFirstOperandEntered, setIsFirstOperandEntered] = useState<boolean>(false);
  const handleOperation = (value: string) => {
    if (!display && value !== "Clear") {
      setMessage("Please enter a number first");
      return;
    }
    setOperator(value);
    if (value !== "=" && value !== "Clear") {
      setIsFirstOperandEntered(true);
      if (operator) {
        return;
      }
      setDisplay(display + value);
    } else if (value === "Clear") {
      setDisplay("");
      setMessage(null);
      setOperands({ operand1: null, operand2: null });
      setIsFirstOperandEntered(false);
      setOperator(null);
      return;
    } else if (value === "=" && operands.operand1 && operands.operand2) {
      handleCalculation();
      return;
    }
  };

  const handleCalculation = () => {
    switch (operator) {
      case "+":
        setDisplay((operands.operand1! + operands.operand2!).toString());
        setOperands({
          operand1: operands.operand1! + operands.operand2!,
          operand2: null,
        });
        break;
      case "-":
        setDisplay((operands.operand1! - operands.operand2!).toString());
        setOperands({
          operand1: operands.operand1! - operands.operand2!,
          operand2: null,
        });
        break;
      case "X":
        setDisplay((operands.operand1! * operands.operand2!).toString());
        setOperands({
          operand1: operands.operand1! * operands.operand2!,
          operand2: null,
        });
        break;
      case "/":
        if (operands.operand2 === 0) {
          setMessage("Cannot divide by zero");
          return;
        }
        setDisplay((operands.operand1! / operands.operand2!).toString());
        setOperands({
          operand1: operands.operand1! / operands.operand2!,
          operand2: null,
        });
        break;
      default:
        break;
    }
  };

  const handleNumber = (value: number) => {
    if (!isFirstOperandEntered) {
      setDisplay(display + value.toString());
      setOperands((prev) => ({
        ...prev,
        operand1: parseFloat(display + value.toString()),
      }));
    } else {
      setDisplay(display + value.toString());
      setOperands((prev) => ({
        ...prev,
        operand2: parseFloat(display + value.toString()),
      }));
    }
  };
  return (
    <>
      <main className="relative min-h-screen flex items-center justify-center flex-col">
        <div className="w-[400px]">
          {message !== null && (
            <div className="mb-10 p-2 w-full flex items-center justify-center bg-red-500 rounded-xl ">
              <p className="text-white text-[24px] font-medium">{message}</p>
            </div>
          )}
          <div className="p-2 w-full flex items-center justify-center bg-gray-500 rounded-t-xl ">
            <input
              type="text"
              className="border w-[95%] p-2 h-[65px] bg-lime-800 text-white rounded-xl text-[24px] font-medium"
              value={display}
              readOnly
            />
          </div>
          <div className="border border-neutral-400 rounded-b-xl bg-gray-500 grid grid-cols-4 p-4 gap-4 ">
            <OperationButton value={"Clear"} onOperation={handleOperation} />
            <button></button>
            <button></button>
            <OperationButton value={"/"} onOperation={handleOperation} />
            <NumberButton value={7} onNumber={handleNumber} />
            <NumberButton value={8} onNumber={handleNumber} />
            <NumberButton value={9} onNumber={handleNumber} />
            <OperationButton value={"X"} onOperation={handleOperation} />
            <NumberButton value={4} onNumber={handleNumber} />
            <NumberButton value={5} onNumber={handleNumber} />
            <NumberButton value={6} onNumber={handleNumber} />
            <OperationButton value={"-"} onOperation={handleOperation} />
            <NumberButton value={1} onNumber={handleNumber} />
            <NumberButton value={2} onNumber={handleNumber} />
            <NumberButton value={3} onNumber={handleNumber} />
            <OperationButton value={"+"} onOperation={handleOperation} />
            <NumberButton value={0} onNumber={handleNumber} />
            <button></button>
            <button></button>
            <OperationButton value={"="} onOperation={handleOperation} />
          </div>
        </div>
        <span className="absolute bottom-5 right-10 font-medium">Cedrick Caceres</span>
      </main>
    </>
  );
}

export default App;
