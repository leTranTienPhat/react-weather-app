import { toast } from "@/components/ui/use-toast";

type IToastParams = {
  title?: string;
  description?: string;
  variant?: "success" | "destructive";
};

export const toastNotification = ({ title, description, variant }: IToastParams) => {
  let toastParams: IToastParams = {
    title: title ?? "Error",
    description: description ?? "Error Description",
    variant: "destructive",
  };
  if (variant === "success") {
    toastParams = {
      title: title ?? "Success",
      description: description ?? "Action success!",
      variant: "success",
    };
  }

  toast(toastParams);
};
