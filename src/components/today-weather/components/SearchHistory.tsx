import { ITodayWeatherResponse } from "@/api/today-weather-api";
import { svgColor } from "@/assets/icons/config";
import DeleteSvg from "@/assets/icons/deleteIcon";
import SearchSvg from "@/assets/icons/searchIcon";
import GlassWrapper from "@/components/common/GlassWrapper";
import { WEATHER_STORAGE } from "@/constants/storage";
import { useLocalStorage } from "@/context/LocalStorageContext";
import { useTheme } from "@/context/ThemeProvider";

const SearchHistory = () => {
  const { theme } = useTheme();
  const { getStorage } = useLocalStorage(WEATHER_STORAGE);

  const getWeatherHistory = (): ITodayWeatherResponse[] | undefined => {
    return getStorage() as ITodayWeatherResponse[];
  };

  if (!getWeatherHistory() || getWeatherHistory()?.length === 0) return null;

  return (
    <GlassWrapper className="p-4 mt-5">
      <p>Search History</p>
      <div className="flex flex-col pt-5 gap-4">
        {getWeatherHistory()?.map((history, idx) => (
          <GlassWrapper className="p-2 gap hover:bg-glass/30 transition-all" key={history.name + idx}>
            <div className="flex justify-between items-center gap-4">
              <div className="grow flex justify-start md:justify-between flex-col md:flex-row items-start">
                <p>{history.name}</p>
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
