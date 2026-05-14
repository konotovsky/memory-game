import type { ReactNode } from "react";
import { RadioGroupContext } from "@/components/RadioGroupContext";
import { cn } from "@/utils/cn";

interface RadioGroupProps {
  title?: string;
  name: string;
  className?: string;
  children: ReactNode;
  value: string;
  setValue: (value: string) => void;
}

export function RadioGroup({
  title,
  name,
  className,
  children,
  value,
  setValue,
}: RadioGroupProps) {
  return (
    <RadioGroupContext.Provider
      value={{
        value,
        setValue,
        name,
      }}
    >
      <label className="font-atkinson-hyperlegible flex flex-col gap-100 text-[15px] leading-[125%] font-bold text-blue-400 md:gap-200 md:text-[20px]">
        {title}
        <div className={cn("flex gap-100 md:gap-400", className)}>
          {children}
        </div>
      </label>
    </RadioGroupContext.Provider>
  );
}
