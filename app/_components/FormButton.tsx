"use client";

import { useFormStatus } from "react-dom";
import SpinnerMini from "./SpinnerMini";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  pendingText: string;
}

function FormButton({ children, pendingText, ...rest }: ButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button {...rest} disabled={pending} aria-disabled={pending}>
      {pending ? (
        <div className="flex items-center gap-2 justify-center">
          <SpinnerMini />
          <>{pendingText}</>
        </div>
      ) : (
        children
      )}
    </button>
  );
}

export default FormButton;
