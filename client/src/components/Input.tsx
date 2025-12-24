interface InputProps {
  className?: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ className = "", type = "text", ...props }: InputProps) => {
  return (
    <input
      type={type}
      className={`
        border bg-zinc-800 rounded-lg
        py-1.5 px-2 text-zinc-200 border-zinc-700
        transition-all duration-100 m-1
        hover:border-zinc-600 text-xs focus:ring-1 ring-zinc-800 outline-zinc-800
        ${className}
      `}
      {...props}
    />
  );
};

export default Input;
