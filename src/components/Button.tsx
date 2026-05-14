import { cn } from "@/utils/cn";
import type { ButtonHTMLAttributes } from "react";

function Button({
  children,
  className,
  type = "button",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type={type}
      className={cn(
        "font-atkinson-hyperlegible text-grey-50 inline-flex h-600 items-center justify-center rounded-full bg-orange-400 px-300 text-lg leading-[125%] font-bold text-nowrap hover:bg-orange-300 disabled:pointer-events-none disabled:opacity-50 md:h-[70px] md:text-[32px]",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export { Button };
