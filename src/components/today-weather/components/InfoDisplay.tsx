import { ITodayWeatherResponse, useApiTodayWeather } from "@/api/today-weather-api";
import { images } from "@/assets/images";
import { WEATHER_STORAGE } from "@/constants/storage";
import { PLACEHOLDER } from "@/constants/variables";
import { useLocalStorage } from "@/context/LocalStorageContext";
import { useSearch } from "@/context/SearchContext";
import { dateFormat } from "@/lib/utils";
import { Dispatch, SetStateAction, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

type IProps = {
  selectedHistory: ITodayWeatherResponse | null;
  setSelectedHistory: Dispatch<SetStateAction<ITodayWeatherResponse | null>>;
};

const InfoDisplay = ({ selectedHistory, setSelectedHistory }: IProps) => {
  const { geoLocation } = useSearch();
  const { setStorage, getStorage } = useLocalStorage(WEATHER_STORAGE);

  const { data: weatherData } = useApiTodayWeather(
    {
      enabled: geoLocation !== null,
    },
    {
      lat: geoLocation?.lat ?? 0,
      lon: geoLocation?.lon ?? 0,
      appId: import.meta.env.VITE_OPEN_WEATHER_API_KEY,
      units: "metric",
    }
  );

  useEffect(() => {
    if (weatherData) {
      const historyData = getStorage() as ITodayWeatherResponse[];

      const currentHistory: ITodayWeatherResponse[] = historyData ?? [];
      const newHistory = [{ ...weatherData, timestamp: new Date() }, ...currentHistory];

      // Save updated history to localStorage
      setStorage(newHistory);
      setSelectedHistory(null);
    }
  }, [weatherData, setStorage]);

  const generateTemp = (temp?: number) => {
    if (!temp) return PLACEHOLDER + "°";
    return `${Math.round(temp)}°`;
  };

  const displayData = selectedHistory ?? weatherData;

  return (
    <div className="relative">
      <AnimatePresence initial={false}>
        {displayData?.weather && (
          <motion.div
            key={selectedHistory?.id + String(selectedHistory?.timestamp)}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 100, duration: 0.3 }}
            className="absolute -top-[80px] md:-top-[120px] -right-[40px]"
          >
            <img
              src={displayData?.weather[0].id >= 700 ? images.sun : images.cloud}
              alt="current weather"
              className="w-[140px] md:w-[300px]"
            />
          </motion.div>
        )}
      </AnimatePresence>
      <div>
        <h1 className="font-semibold">Today's Weather</h1>
        <p className="text-[80px] sm:text-[100px] leading-none text-primary dark:text-white font-bold">
          {generateTemp(displayData?.main?.temp)}
        </p>
        <p className="font-semibold">
          H:{generateTemp(displayData?.main?.temp_max)} L:{generateTemp(displayData?.main?.temp_min)}
        </p>
        <div className="xs:flex justify-between items-center text-sm sm:text-base">
          <span className="font-bold text-muted-foreground grow pr-5">
            {displayData?.name ?? PLACEHOLDER}, {displayData?.sys?.country ?? PLACEHOLDER}
          </span>
          <div className="xs:absolute grow gap-5 md:static flex xs:flex-col-reverse md:flex-row md:justify-between right-0 bottom-0 xs:text-right pt-2 xs:pt-0">
            <span className="text-muted-foreground">
              {displayData?.timestamp ? dateFormat(displayData?.timestamp, true) : dateFormat(new Date(), true)}
            </span>
            <span className="text-muted-foreground">
              Humidity: {displayData?.main?.humidity ? displayData?.main?.humidity.toString() + "%" : PLACEHOLDER}
            </span>
            <span className="text-muted-foreground">{displayData?.weather?.[0].main ?? PLACEHOLDER} </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoDisplay;
