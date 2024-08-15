import { useState } from "react";

interface OperationButtonProps {
  value: string;
  onOperation: (value: string) => void;
}
function OperationButton({ value, onOperation }: OperationButtonProps) {
  return (
    <button
      type="button"
      className="bg-white p-4 px-6"
      onClick={() => onOperation(value)}
    >
      {value}
    </button>
  );
}

export default OperationButton;
