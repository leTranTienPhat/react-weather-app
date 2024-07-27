import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/customized/ThemeToggle";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

const Header = () => {
  return (
    <div className="w-full flex justify-center gap-2 md:gap-5 h-[60px] py-5">
      <div className="flex gap-5 w-full">
        <Input placeholder="Enter Country..." />
        <Button className="w-10 h-10 rounded-md p-0">
          <SearchIcon size={20} />
        </Button>
      </div>

      {/* Toogle Light/Dark Mode */}
      <ThemeToggle className="md:absolute right-0 top-0" />
    </div>
  );
};

export default Header;
