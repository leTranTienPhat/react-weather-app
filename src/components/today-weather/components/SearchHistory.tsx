import { ITodayWeatherResponse } from "@/api/today-weather-api";
import { svgColor } from "@/assets/icons/config";
import DeleteSvg from "@/assets/icons/deleteIcon";
import SearchSvg from "@/assets/icons/searchIcon";
import GlassWrapper from "@/components/common/GlassWrapper";
import { HISTORY_DELETE_SUCCESS_DIALOG } from "@/constants/message";
import { WEATHER_STORAGE } from "@/constants/storage";
import { useLocalStorage } from "@/context/LocalStorageContext";
import { useSearch } from "@/context/SearchContext";
import { useTheme } from "@/context/ThemeProvider";
import { queryClient } from "@/lib/reactQuery";
import { toastNotification } from "@/lib/toastAction";
import { cn, dateFormat } from "@/lib/utils";
import { Dispatch, SetStateAction } from "react";
import { AnimatePresence, motion } from "framer-motion";

type IProps = {
  selectedHistory: ITodayWeatherResponse | null;
  setSelectedHistory: Dispatch<SetStateAction<ITodayWeatherResponse | null>>;
};

const SearchHistory = ({ selectedHistory, setSelectedHistory }: IProps) => {
  const { theme } = useTheme();
  const { getStorage, setStorage, deleteStorage } = useLocalStorage(WEATHER_STORAGE);
  const { setGeoLocation } = useSearch();

  const getWeatherHistory = (): ITodayWeatherResponse[] | undefined => {
    return getStorage() as ITodayWeatherResponse[];
  };

  if (!getWeatherHistory() || getWeatherHistory()?.length === 0) return null;

  // View a history record
  const handleViewDetail = (history: ITodayWeatherResponse) => {
    console.log("test");
    if (history.timestamp === selectedHistory?.timestamp) setSelectedHistory(null);
    else setSelectedHistory(history);

    // Reset cached Data when view detail
    setGeoLocation(null);
    queryClient.removeQueries();
  };

  //Clear a single record
  const handleDeleteHistory = (selectedHistory: ITodayWeatherResponse) => {
    const currentHistory = getWeatherHistory()?.filter((history) => history.timestamp !== selectedHistory?.timestamp);
    toastNotification({ ...HISTORY_DELETE_SUCCESS_DIALOG, variant: "success" });
    setStorage(currentHistory);
    setSelectedHistory(null);
  };

  //Clear all Records
  const handleDeleteAll = () => {
    deleteStorage();
    setSelectedHistory(null);
  };

  return (
    <GlassWrapper className="p-4 mt-5">
      <div className="flex justify-between gap-4">
        <p className="font-semibold">Search History</p>
        <button onClick={handleDeleteAll} className="text-muted-foreground hover:opacity-80">
          Clear History
        </button>
      </div>
      <div className="flex flex-col pt-5 gap-4">
        <AnimatePresence initial={false}>
          {getWeatherHistory()?.map((history) => (
            <motion.div
              key={history.id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
            >
              <GlassWrapper
                className={cn("p-2 gap hover:bg-glass/30 transition-all", {
                  "bg-glass/70 hover:bg-glass/80": selectedHistory?.timestamp === history.timestamp,
                })}
              >
                <div
                  className="flex justify-between items-center gap-4 hover:cursor-pointer"
                  onClick={() => handleViewDetail(history)}
                >
                  <div className="grow flex justify-start md:justify-between flex-col md:flex-row items-start">
                    <p>{history.name}</p>
                    <p className="text-muted-foreground md:text-current text-sm md:text-base">
                      {dateFormat(history.timestamp, true)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="rounded-full bg-white dark:bg-transparent dark:border-white/40 dark:border-2 w-[34px] h-[34px] flex justify-center items-center hover:opacity-80">
                      <SearchSvg fill={theme === "dark" ? svgColor.fadedWhite : svgColor.fadedBlack} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteHistory(history);
                      }}
                      className="rounded-full bg-white dark:bg-transparent dark:border-white/40 dark:border-2 w-[34px] h-[34px] flex justify-center items-center hover:opacity-80"
                    >
                      <DeleteSvg fill={theme === "dark" ? svgColor.fadedWhite : svgColor.fadedBlack} />
                    </button>
                  </div>
                </div>
              </GlassWrapper>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </GlassWrapper>
  );
};

export default SearchHistory;
