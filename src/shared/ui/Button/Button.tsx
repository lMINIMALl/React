import type { FC, ReactNode, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export const Button: FC<ButtonProps> = ({ children, className, ...rest }) => {
  return (
    <button className={["button", className].filter(Boolean).join(" ")} {...rest}>
      {children}
    </button>
  );
};
