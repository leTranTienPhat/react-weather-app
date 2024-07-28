import { ILocationListResponse, useApiGetLocationList } from "@/api/get-location-list.";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSearch } from "@/context/SearchContext";
import { cn } from "@/lib/utils";
import { useDebouncedCallback } from "use-debounce";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { Loader2 } from "lucide-react";

type IProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  labelPosition?: "default" | "inside";
};

const AutoCompleteInput = ({ label, labelPosition, ...props }: IProps) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openSearchDropdown, setOpenSearchDropdown] = useState<boolean>(false);
  const { setGeoLocation } = useSearch();

  // State use for api call
  const [hiddenQuery, setHiddenQuery] = useState<string>("");

  const debouncedQuery = useDebouncedCallback((value) => {
    if (value !== "") setOpenSearchDropdown(true);
    else setOpenSearchDropdown(false);
    setHiddenQuery(value);
  }, 250);

  const { data: locationList, isFetching } = useApiGetLocationList(
    {
      enabled: hiddenQuery !== "",
    },
    {
      q: hiddenQuery,
      limit: 5,
      appId: import.meta.env.VITE_OPEN_WEATHER_API_KEY,
    }
  );

  const onSelectAction = (location: ILocationListResponse) => {
    // Set the Geolocation and reset all states
    setSearchQuery("");
    setHiddenQuery("");
    setOpenSearchDropdown(false);
    setGeoLocation({ lat: location.lat, lon: location.lon });
  };
  return (
    <div className="flex gap-5 w-full">
      <div
        className={cn("relative w-full bg-glass/20 rounded-3xl px-2", {
          "h-[60px] ": labelPosition === "inside",
        })}
      >
        {label && (
          <Label
            className={cn({
              "px-3 text-muted-foreground text-[10px]": labelPosition === "inside",
            })}
          >
            {label}
          </Label>
        )}

        <Input
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            debouncedQuery(e.target.value);
          }}
          onClick={(e) => {
            e.stopPropagation();
            if (searchQuery !== "") {
              if (!openSearchDropdown) setOpenSearchDropdown(true);
              setHiddenQuery(searchQuery);
            }
          }}
          className="bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 scroll -mt-2 -mb-4"
          {...props}
        />
        <DropdownMenu open={true} modal={false}>
          <DropdownMenuTrigger className="w-full h-0"></DropdownMenuTrigger>
          <DropdownMenuContent
            onPointerDownOutside={() => {
              if (openSearchDropdown) setOpenSearchDropdown(false);
            }}
            className={cn("DropdownMenuContent bg-glass border-none", { hidden: !openSearchDropdown })}
            align="end"
          >
            {isFetching ? (
              <Loader2 className="animate-spin repeat-infinite m-auto" />
            ) : (
              <>
                {(!locationList || locationList?.length === 0) && <div className="text-center py-5">No location found</div>}
                {locationList?.map((location, idx) => (
                  <DropdownMenuItem
                    key={location.name + idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectAction(location);
                    }}
                  >
                    <span className="font-bold pr-2">{location.name}</span>
                    <span className="text-muted-foreground">
                      {location.state} {location.country}
                    </span>
                  </DropdownMenuItem>
                ))}
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {/* <Button
        className="w-[60px] h-[60px] rounded-2xl p-0 shrink-0"
        onClick={() => debouncedQuery(searchQuery)}
        disabled={searchQuery === "" || isFetching}
      >
        <SearchSvg fill="white" width={36} height={36} />
      </Button> */}
    </div>
  );
};

export default AutoCompleteInput;
