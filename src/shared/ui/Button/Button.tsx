import type { ReactNode, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export const Button = ({ children, className, ...rest }: ButtonProps) => {
  return (
    <button
      className={["button", className].filter(Boolean).join(" ")}
      {...rest}
    >
      {children}
    </button>
  );
};
