import { createContext, useContext } from "react";

interface RadioGroupContextType {
  value: string;
  setValue: (value: string) => void;
  name: string;
}

export const RadioGroupContext = createContext<RadioGroupContextType | null>(
  null,
);

export function useRadioGroup() {
  const ctx = useContext(RadioGroupContext);

  if (!ctx) {
    throw new Error("RadioGroupItem must be used inside RadioGroup");
  }

  return ctx;
}
