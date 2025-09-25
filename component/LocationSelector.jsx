import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LocationSelector({
  selectedState,
  city,
  customCity,
  onLocationChange,
}) {
  const stateCityMap = {
    Maharashtra: ["Mumbai", "Pune", "Nagpur"],
    Karnataka: ["Bengaluru", "Mysuru", "Mangaluru"],
    TamilNadu: ["Chennai", "Coimbatore", "Madurai"],
    Delhi: ["New Delhi"],
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* State Dropdown */}
      <div>
        <Label htmlFor="state">State *</Label>
        <Select
          value={selectedState || ""}
          onValueChange={(value) =>
            onLocationChange({ state: value, city: "", customCity: "" })
          }
        >
          <SelectTrigger id="state" className="w-full">
            <SelectValue placeholder="Select your state" />
          </SelectTrigger>
          <SelectContent className="h-60">
            {Object.keys(stateCityMap).map((stateName) => (
              <SelectItem key={stateName} value={stateName}>
                {stateName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* City Dropdown */}
      <div>
        <Label htmlFor="city">City *</Label>
        <Select
          value={city || ""}
          onValueChange={(value) =>
            onLocationChange({ city: value, customCity: "" })
          }
          disabled={!selectedState}
        >
          <SelectTrigger id="city" className="w-full">
            <SelectValue placeholder="Select your city" />
          </SelectTrigger>
          <SelectContent className="h-60">
            {selectedState &&
              stateCityMap[selectedState]?.map((cityOption) => (
                <SelectItem key={cityOption} value={cityOption}>
                  {cityOption}
                </SelectItem>
              ))}
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select>

        {city === "Other" && (
          <div className="mt-2">
            <Input
              placeholder="Enter your city"
              value={customCity || ""}
              onChange={(e) => onLocationChange({ customCity: e.target.value })}
            />
          </div>
        )}
      </div>
    </div>
  );
}
