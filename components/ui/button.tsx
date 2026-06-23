import Link from "next/link";

type ButtonVariant = "primary" | "secondary";

interface ButtonProps {
  variant?: ButtonVariant;
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export default function Button({
  variant = "primary",
  href,
  onClick,
  children,
  className = "",
  type = "button",
  disabled = false,
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center font-bold text-[15px] tracking-[0.5px] rounded-[8px] px-[30px] py-[16px] transition-colors duration-150 cursor-pointer";

  const variantClasses =
    variant === "primary"
      ? "bg-[#1183E6] text-white hover:bg-[#2e97f5] shadow-[0_8px_30px_rgba(17,131,230,0.35)]"
      : "text-[#e6e6e8] border border-white/[0.18] hover:border-[#1183E6] bg-transparent";

  const disabledClasses = disabled
    ? "opacity-50 cursor-not-allowed pointer-events-none"
    : "";

  const allClasses =
    `${baseClasses} ${variantClasses} ${disabledClasses} ${className}`.trim();

  if (href) {
    return (
      <Link href={href} className={allClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={allClasses}
    >
      {children}
    </button>
  );
}
