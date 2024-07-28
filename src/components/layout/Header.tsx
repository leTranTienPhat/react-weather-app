import AutoCompleteInput from "@/components/common/AutoCompleteInput";
import { ThemeToggle } from "@/components/common/ThemeToggle";

const Header = () => {
  return (
    <div className="w-full flex justify-center gap-2 md:gap-5 h-[60px] py-5">
      <AutoCompleteInput placeholder="Enter a City Name, Country, City Code..." labelPosition="inside" label="City, Country" />

      {/* Toogle Light/Dark Mode */}
      <ThemeToggle className="md:absolute right-0 top-0" />
    </div>
  );
};

export default Header;
