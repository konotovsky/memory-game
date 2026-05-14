import { cn } from "@/utils/cn";

interface StatCardProps {
  label: string;
  value: string;
  active?: boolean;
  className?: string;
}

function StatCard({ label, value, active, className }: StatCardProps) {
  return (
    <div
      className={cn(
        "font-atkinson-hyperlegible relative flex h-[70px] flex-1 flex-col items-center justify-center rounded-[5px] bg-blue-100 px-200 text-center leading-[125%] font-bold md:flex-row md:justify-between md:rounded-[10px] md:px-300",
        { "bg-orange-400": active },
        className,
      )}
    >
      <div
        className={cn(
          "absolute -top-100 left-1/2 -translate-x-1/2 md:top-[-12px]",
          "border-r-8 border-b-8 border-l-8 md:border-r-12 md:border-b-12 md:border-l-12",
          "border-transparent",
          {
            "border-b-orange-400": active,
            hidden: !active,
          },
        )}
      />
      <h2
        className={cn("text-[15px] text-blue-400 md:text-lg", {
          "text-grey-50": active,
        })}
      >
        {label}
      </h2>
      <p
        className={cn("text-2xl text-blue-800 md:text-[32px]", {
          "text-grey-50": active,
        })}
      >
        {value}
      </p>
    </div>
  );
}

export { StatCard };
