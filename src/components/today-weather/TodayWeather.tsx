import InfoDisplay from "@/components/today-weather/components/InfoDisplay";
import SearchHistory from "@/components/today-weather/components/SearchHistory";
import GlassWrapper from "@/components/common/GlassWrapper";

const TodayWeather = () => {
  return (
    <GlassWrapper>
      <InfoDisplay />
      <SearchHistory />
    </GlassWrapper>
  );
};

export default TodayWeather;
