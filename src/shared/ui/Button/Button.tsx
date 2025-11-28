import type { ReactNode, MouseEventHandler } from "react";
import "./Button.css";

interface ButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
}

export const Button = ({ onClick, children }: ButtonProps) => {
  return (
    <button onClick={onClick} className="button">
      {children}
    </button>
  );
};
