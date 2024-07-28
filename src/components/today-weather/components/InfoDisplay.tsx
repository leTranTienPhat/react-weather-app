import { ITodayWeatherResponse, useApiTodayWeather } from "@/api/today-weather-api";
import { images } from "@/assets/images";
import { WEATHER_STORAGE } from "@/constants/storage";
import { PLACEHOLDER } from "@/constants/variables";
import { useLocalStorage } from "@/context/LocalStorageContext";
import { useSearch } from "@/context/SearchContext";
import { dateFormat } from "@/lib/utils";
import { useEffect, useState } from "react";

const InfoDisplay = () => {
  const { geoLocation } = useSearch();
  const [currentDate] = useState<Date>(new Date());
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
      const newHistory = [weatherData, ...currentHistory];

      // Save updated history to localStorage
      setStorage(newHistory);
    }
  }, [weatherData, setStorage]);

  const generateTemp = (temp?: number) => {
    if (!temp) return PLACEHOLDER + "°";
    return `${Math.round(temp)}°`;
  };

  return (
    <div className="relative">
      {weatherData?.weather && (
        <img
          src={weatherData?.weather[0].id >= 700 ? images.sun : images.cloud}
          alt="current weather"
          className="w-[140px] md:w-[300px] absolute -top-[80px] md:-top-[120px] -right-[40px] transition-all"
        />
      )}
      <div>
        <h1 className="font-semibold">Today's Weather</h1>
        <p className="text-[100px] leading-none text-primary dark:text-white font-bold">
          {generateTemp(weatherData?.main?.temp)}
        </p>
        <p className="font-semibold">
          H:{generateTemp(weatherData?.main?.temp_max)} L:{generateTemp(weatherData?.main?.temp_min)}
        </p>
        <div className="flex justify-between items-center">
          <span className="font-bold text-muted-foreground grow pr-5">
            {weatherData?.name ?? PLACEHOLDER}, {weatherData?.sys?.country ?? PLACEHOLDER}
          </span>
          <div className="absolute grow gap-5 md:static flex flex-col-reverse md:flex-row md:justify-between right-0 bottom-0 text-right">
            <span className="text-muted-foreground">{weatherData ? dateFormat(currentDate, true) : PLACEHOLDER}</span>
            <span className="text-muted-foreground">
              Humidity: {weatherData?.main?.humidity ? weatherData?.main?.humidity.toString() + "%" : PLACEHOLDER}
            </span>
            <span className="text-muted-foreground">{weatherData?.weather?.[0].main ?? PLACEHOLDER} </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoDisplay;
