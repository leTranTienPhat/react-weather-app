import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type IProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  labelPosition?: "default" | "inside";
};

const CustomInput = ({ label, labelPosition, ...props }: IProps) => {
  return (
    <div
      className={cn("relative w-full bg-glass/20 rounded-3xl px-2", {
        "h-[60px] ": labelPosition === "inside",
      })}
    >
      {label && (
        <Label
          className={cn({
            "px-3 text-muted-foreground text-[10px]": labelPosition === "inside",
          })}
        >
          {label}
        </Label>
      )}
      <Input className="bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 scroll -mt-2" {...props} />
    </div>
  );
};

export default CustomInput;
