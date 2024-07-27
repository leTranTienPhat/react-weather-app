import { svgColor } from "@/assets/icons/config";
import DeleteSvg from "@/assets/icons/deleteIcon";
import SearchSvg from "@/assets/icons/searchIcon";
import GlassWrapper from "@/components/common/GlassWrapper";
import { useTheme } from "@/components/providers/ThemeProvider";

const SearchHistory = () => {
  const { theme } = useTheme();
  return (
    <GlassWrapper className="p-4 mt-5">
      <p>Search History</p>
      <div className="flex flex-col pt-5 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 21, 22, 23, 24, 25, 26].map((item) => (
          <GlassWrapper className="p-2 gap hover:bg-glass/30 transition-all" key={item}>
            <div className="flex justify-between items-center gap-4">
              <div className="grow flex justify-start md:justify-between flex-col md:flex-row items-start">
                <p>City Name</p>
                <p className="text-muted-foreground md:text-current text-sm md:text-base">01-02-2024 02:01am</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="rounded-full bg-white dark:bg-transparent dark:border-white/40 dark:border-2 w-[34px] h-[34px] flex justify-center items-center hover:opacity-80">
                  <SearchSvg fill={theme === "dark" ? svgColor.fadedWhite : svgColor.fadedBlack} />
                </button>
                <button className="rounded-full bg-white dark:bg-transparent dark:border-white/40 dark:border-2 w-[34px] h-[34px] flex justify-center items-center hover:opacity-80">
                  <DeleteSvg fill={theme === "dark" ? svgColor.fadedWhite : svgColor.fadedBlack} />
                </button>
              </div>
            </div>
          </GlassWrapper>
        ))}
      </div>
    </GlassWrapper>
  );
};

export default SearchHistory;
