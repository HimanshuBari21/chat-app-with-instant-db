import { FC, HTMLAttributes } from "react";

export type ButtonType = HTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

const Button: FC<ButtonType> = (props) => {
  const { variant = "primary", className, children, ...rest } = props;

  return (
    <button
      className={`px-4 py-2 rounded-lg focus:outline-none focus:ring-2 ${
        variant === "primary"
          ? "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500"
          : "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500"
      } ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
