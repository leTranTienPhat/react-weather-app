import InfoDisplay from "@/components/today-weather/components/InfoDisplay";
import SearchHistory from "@/components/today-weather/components/SearchHistory";
import GlassWrapper from "@/components/common/GlassWrapper";
import { ITodayWeatherResponse } from "@/api/today-weather-api";
import { useState } from "react";

const TodayWeather = () => {
  const [selectedHistory, setSelectedHistory] = useState<ITodayWeatherResponse | null>(null);
  return (
    <GlassWrapper className="p-4 md:p-10">
      <InfoDisplay selectedHistory={selectedHistory} setSelectedHistory={setSelectedHistory} />
      <SearchHistory selectedHistory={selectedHistory} setSelectedHistory={setSelectedHistory} />
    </GlassWrapper>
  );
};

export default TodayWeather;
