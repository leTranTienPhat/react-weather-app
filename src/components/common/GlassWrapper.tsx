import { cn } from "@/lib/utils";

type IProps = {
  children: React.ReactNode;
  className?: string;
};

const GlassWrapper = ({ children, className }: IProps) => {
  return <div className={cn("w-full bg-glass/20 p-4 sm:p-10 rounded-lg", className)}>{children}</div>;
};

export default GlassWrapper;
