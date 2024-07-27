import SearchSvg from "@/assets/icons/searchIcon";
import CustomInput from "@/components/common/CustomInput";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <div className="w-full flex justify-center gap-2 md:gap-5 h-[60px] py-5">
      <div className="flex gap-5 w-full">
        <CustomInput placeholder="Search..." labelPosition="inside" label="Country" />
        <Button className="w-[60px] h-[60px] rounded-2xl p-0 shrink-0">
          <SearchSvg fill="white" width={36} height={36} />
        </Button>
      </div>

      {/* Toogle Light/Dark Mode */}
      <ThemeToggle className="md:absolute right-0 top-0" />
    </div>
  );
};

export default Header;
