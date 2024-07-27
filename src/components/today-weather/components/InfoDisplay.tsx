import { images } from "@/assets/images";

const InfoDisplay = () => {
  return (
    <div className="relative">
      <img
        src={true ? images.sun : images.cloud}
        alt="sunny day"
        className="w-[140px] md:w-[300px] absolute -top-[80px] md:-top-[120px] -right-[40px] transition-all"
      />
      <div>
        <h1 className="font-semibold">Today's Weather</h1>
        <p className="text-[100px] leading-none text-primary dark:text-white font-bold">26°</p>
        <p className="font-semibold">H:26° L:29°</p>
        <div className="flex justify-between items-center">
          <span className="font-bold text-muted-foreground w-[120px]">Johor, MY </span>
          <div className="absolute w-full md:static flex flex-col-reverse md:flex-row md:justify-between right-0 bottom-0 text-right">
            <span className="text-muted-foreground">01-09-2024 09:41am</span>
            <span className="text-muted-foreground">Humidity: 58% </span>
            <span className="text-muted-foreground">Clouds </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoDisplay;
