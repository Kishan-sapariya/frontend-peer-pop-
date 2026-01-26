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
    // States
    AndhraPradesh: [
      "Visakhapatnam",
      "Vijayawada",
      "Guntur",
      "Tirupati",
      "Nellore",
      "Kurnool",
      "Rajahmundry",
      "Kakinada",
      "Eluru",
      "Ongole",
    ],
    ArunachalPradesh: [
      "Itanagar",
      "Naharlagun",
      "Tawang",
      "Pasighat",
      "Along",
      "Ziro",
      "Bomdila",
      "Roing",
      "Daporijo",
      "Namsai",
    ],
    Assam: [
      "Guwahati",
      "Silchar",
      "Dibrugarh",
      "Jorhat",
      "Nagaon",
      "Tinsukia",
      "Tezpur",
      "Bongaigaon",
      "Karimganj",
      "Sibsagar",
    ],
    Bihar: [
      "Patna",
      "Gaya",
      "Bhagalpur",
      "Muzaffarpur",
      "Darbhanga",
      "Purnia",
      "Arrah",
      "Begusarai",
      "Bettiah",
      "Motihari",
    ],
    Chhattisgarh: [
      "Raipur",
      "Bhilai",
      "Bilaspur",
      "Korba",
      "Durg",
      "Rajnandgaon",
      "Ambikapur",
      "Jagdalpur",
      "Chirimiri",
      "Dhamtari",
    ],
    Goa: [
      "Panaji",
      "Margao",
      "Vasco da Gama",
      "Mapusa",
      "Ponda",
      "Bicholim",
      "Curchorem",
      "Sanquelim",
      "Valpoi",
      "Goa Velha",
    ], // Maximizing list for smaller state
    Gujarat: [
      "Ahmedabad",
      "Surat",
      "Vadodara",
      "Rajkot",
      "Bhavnagar",
      "Jamnagar",
      "Junagadh",
      "Gandhinagar",
      "Anand",
      "Nadiad",
    ],
    Haryana: [
      "Gurugram",
      "Faridabad",
      "Panipat",
      "Ambala",
      "Hisar",
      "Rohtak",
      "Karnal",
      "Jind",
      "Sonipat",
      "Sirsa",
    ],
    HimachalPradesh: [
      "Shimla",
      "Dharamshala",
      "Manali",
      "Mandi",
      "Solan",
      "Kullu",
      "Una",
      "Nahan",
      "Hamirpur",
      "Chamba",
    ],
    Jharkhand: [
      "Ranchi",
      "Jamshedpur",
      "Dhanbad",
      "Bokaro",
      "Hazaribagh",
      "Deoghar",
      "Ramgarh",
      "Giridih",
      "Adityapur",
      "Phusro",
    ],
    Karnataka: [
      "Bengaluru",
      "Mysuru",
      "Mangaluru",
      "Hubballi",
      "Belagavi",
      "Davanagere",
      "Ballari",
      "Tumakuru",
      "Shivamogga",
      "Kalaburagi",
    ],
    Kerala: [
      "Thiruvananthapuram",
      "Kochi",
      "Kozhikode",
      "Thrissur",
      "Kollam",
      "Alappuzha",
      "Palakkad",
      "Malappuram",
      "Kannur",
      "Kottayam",
    ],
    MadhyaPradesh: [
      "Bhopal",
      "Indore",
      "Jabalpur",
      "Gwalior",
      "Ujjain",
      "Sagar",
      "Rewa",
      "Satna",
      "Dewas",
      "Ratlam",
    ],
    Maharashtra: [
      "Mumbai",
      "Pune",
      "Nagpur",
      "Nashik",
      "Aurangabad",
      "Solapur",
      "Kolhapur",
      "Thane",
      "Pimpri-Chinchwad",
      "Amaravati",
    ],
    Manipur: [
      "Imphal",
      "Bishnupur",
      "Churachandpur",
      "Thoubal",
      "Kakching",
      "Ukhrul",
      "Senapati",
      "Tamenglong",
      "Jiribam",
      "Moreh",
    ], 
    Meghalaya: [
      "Shillong",
      "Tura",
      "Jowai",
      "Nongpoh",
      "Williamnagar",
      "Baghmara",
      "Resubelpara",
      "Mairang",
      "Nongstoin",
      "Cherrapunji",
    ], 
    Mizoram: [
      "Aizawl",
      "Lunglei",
      "Champhai",
      "Kolasib",
      "Serchhip",
      "Lawngtlai",
      "Saiha",
      "Mamit",
      "Khawzawl",
      "Hnahthial",
    ], 
    Nagaland: [
      "Kohima",
      "Dimapur",
      "Mokokchung",
      "Tuensang",
      "Wokha",
      "Zunheboto",
      "Phek",
      "Kiphire",
      "Peren",
      "Mon",
    ], 
    Odisha: [
      "Bhubaneswar",
      "Cuttack",
      "Rourkela",
      "Sambalpur",
      "Berhampur",
      "Puri",
      "Balasore",
      "Bhadrak",
      "Baripada",
      "Jeypore",
    ],
    Punjab: [
      "Chandigarh",
      "Amritsar",
      "Ludhiana",
      "Jalandhar",
      "Patiala",
      "Bathinda",
      "Mohali",
      "Ferozepur",
      "Moga",
      "Hoshiarpur",
    ],
    Rajasthan: [
      "Jaipur",
      "Udaipur",
      "Jodhpur",
      "Kota",
      "Ajmer",
      "Bikaner",
      "Alwar",
      "Bhilwara",
      "Sikar",
      "Ganganagar",
    ],
    Sikkim: [
      "Gangtok",
      "Namchi",
      "Gyalshing",
      "Mangan",
      "Singtam",
      "Rangpo",
      "Jorethang",
      "Nayabazar",
      "Pelling",
      "Lachung",
    ], 
    TamilNadu: [
      "Chennai",
      "Coimbatore",
      "Madurai",
      "Salem",
      "Tiruchirappalli",
      "Tirunelveli",
      "Vellore",
      "Erode",
      "Thoothukudi",
      "Dindigul",
    ],
    Telangana: [
      "Hyderabad",
      "Warangal",
      "Nizamabad",
      "Karimnagar",
      "Khammam",
      "Ramagundam",
      "Mahbubnagar",
      "Siddipet",
      "Miryalaguda",
      "Adilabad",
    ],
    Tripura: [
      "Agartala",
      "Udaipur",
      "Dharmanagar",
      "Kailasahar",
      "Belonia",
      "Khowai",
      "Ambassa",
      "Sonamura",
      "Amarpur",
      "Jirania",
    ], // Maximizing list
    UttarPradesh: [
      "Lucknow",
      "Kanpur",
      "Varanasi",
      "Agra",
      "Prayagraj",
      "Meerut",
      "Ghaziabad",
      "Bareilly",
      "Aligarh",
      "Moradabad",
    ],
    Uttarakhand: [
      "Dehradun",
      "Haridwar",
      "Rishikesh",
      "Haldwani",
      "Roorkee",
      "Kashipur",
      "Rudrapur",
      "Pithoragarh",
      "Nainital",
      "Almora",
    ],
    WestBengal: [
      "Kolkata",
      "Howrah",
      "Durgapur",
      "Siliguri",
      "Asansol",
      "Bardhaman",
      "Malda",
      "Kharagpur",
      "Midnapore",
      "Raiganj",
    ],

    AndamanAndNicobarIslands: [
      "Port Blair",
      "Diglipur",
      "Mayabunder",
      "Rangat",
      "Hut Bay",
      "Campbell Bay",
      "Ferrargunj",
      "Garacharma",
      "Bamboo Flat",
      "Wimberlygunj",
    ], 
    Chandigarh: [
      "Chandigarh",
      "Mohali (part of Chandigarh Tricity)",
      "Panchkula (part of Chandigarh Tricity)",
      "Zirakpur",
      "Kharar",
    ], 
    DadraAndNagarHaveliAndDamanAndDiu: [
      "Daman",
      "Silvassa",
      "Diu",
      "Vapi",
      "Amli",
      "Rakholi",
      "Dadra",
      "Kala",
      "Kanvel",
      "Moti Daman",
    ], 
    Delhi: [
      "New Delhi",
      "Old Delhi",
      "Noida (NCR)",
      "Gurugram (NCR)",
      "Faridabad (NCR)",
      "Ghaziabad (NCR)",
      "Dwarka",
      "Rohini",
      "Saket",
      "Janakpuri",
    ], 
    JammuAndKashmir: [
      "Srinagar",
      "Jammu",
      "Anantnag",
      "Baramulla",
      "Pulwama",
      "Sopore",
      "Udhampur",
      "Kathua",
      "Rajouri",
      "Bandipora",
    ],
    Ladakh: [
      "Leh",
      "Kargil",
      "Nubra",
      "Zanskar",
      "Dras",
      "Nyoma",
      "Pangong",
      "Hunder",
      "Padum",
      "Choglamsar",
    ], 
    Lakshadweep: [
      "Kavaratti",
      "Agatti",
      "Minicoy",
      "Amini",
      "Andrott",
      "Kalpeni",
      "Kadmat",
      "Chetlat",
      "Bitra",
      "Kilttan",
    ], 
    Puducherry: [
      "Puducherry",
      "Karaikal",
      "Yanam",
      "Mahe",
      "Ozhukarai",
      "Villianur",
      "Bahour",
      "Mannadipet",
      "Nettapakkam",
      "Ariankuppam",
    ], 
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
