interface InputProps {
  className?: string;
  type?: string;
  value?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({
  placeholder = "",
  className = "",
  type = "text",
  ...props
}: InputProps) => {
  return (
    <input
      placeholder={placeholder}
      type={type}
      className={`
      border bg-zinc-800 rounded-lg
      py-1.5 px-2 text-zinc-200 border-zinc-700
      transition-all duration-100 m-1
      hover:border-zinc-600 text-xs
      focus:ring-1 focus:ring-zinc-800
      outline-none font-semibold

        ${className}
      `}
      {...props}
    />
  );
};

export default Input;
