interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
}

const Button = ({
  children,
  onClick,
  type = "button",
  className = "",
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
                border m-1 flex justify-center items-center bg-zinc-800 hover:bg-zinc-900/20 rounded-lg
                py-1.5 px-4 font-semibold text-zinc-200 border-zinc-700 transition-all duration-100 hover:border-zinc-700/90 text-xs
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;
