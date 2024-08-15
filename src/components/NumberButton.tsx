import { useState } from "react";

interface NumberButtonProps {
  value: number;
  onNumber: (value: number) => void;
}
function NumberButton({ value, onNumber }: NumberButtonProps) {
  const [display, setDisplay] = useState<number | null>(null);
  return (
    <button type="button" className="bg-white p-4 px-6" onClick={() => onNumber(value)}>
      {value}
    </button>
  );
}

export default NumberButton;
