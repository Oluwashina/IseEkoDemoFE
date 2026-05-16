"use client";

interface IseEkoLogoProps {
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
}

export default function IseEkoLogo({
  variant = "dark",
  size = "md",
}: IseEkoLogoProps) {
  const textColor = variant === "light" ? "text-white" : "text-[#0B1D6E]";
  const sizes = { sm: "text-sm", md: "text-base", lg: "text-xl" };
  const dotSizes = { sm: "w-1.5 h-1.5", md: "w-2 h-2", lg: "w-2.5 h-2.5" };

  return (
    <div className="flex items-center gap-2">
      <div className="grid grid-cols-2 gap-0.5">
        <span className={`${dotSizes[size]} rounded-full bg-red-500`} />
        <span className={`${dotSizes[size]} rounded-full bg-yellow-400`} />
        <span className={`${dotSizes[size]} rounded-full bg-green-500`} />
        <span className={`${dotSizes[size]} rounded-full bg-blue-500`} />
      </div>
      <span className={`font-bold tracking-tight ${sizes[size]} ${textColor}`}>
        IseEko
      </span>
    </div>
  );
}
