import { cn } from "@/utils/cn";
import { useRadioGroup } from "@/components/RadioGroupContext";
import { Button } from "@/components/Button";

interface RadioGroupItemProps {
  value: string;
  className?: string;
}

function RadioGroupItem({ value, className }: RadioGroupItemProps) {
  const { value: selected, setValue, name } = useRadioGroup();

  const checked = selected === value;

  return (
    <>
      <input
        type="radio"
        name={name}
        checked={checked}
        readOnly
        className="hidden"
      />
      <Button
        onClick={() => setValue(value)}
        className={cn(
          "hover:bg-blue-350 font-atkinson-hyperlegible h-500 flex-1 bg-blue-300 text-base leading-[125%] font-bold md:h-[52px] md:text-[26px]",
          className,
          {
            "bg-blue-800 hover:bg-blue-800": checked,
          },
        )}
      >
        {value}
      </Button>
    </>
  );
}

export { RadioGroupItem };
