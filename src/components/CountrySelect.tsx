"use client";
import { useState } from "react";

export const COUNTRY_LIST = [
  { code: "AF", dial: "+93", label: "🇦🇫 Afghanistan" },
  { code: "AL", dial: "+355", label: "🇦🇱 Albania" },
  { code: "DZ", dial: "+213", label: "🇩🇿 Algeria" },
  { code: "AS", dial: "+1-684", label: "🇦🇸 American Samoa" },
  { code: "AD", dial: "+376", label: "🇦🇩 Andorra" },
  { code: "AO", dial: "+244", label: "🇦🇴 Angola" },
  { code: "AI", dial: "+1-264", label: "🇦🇮 Anguilla" },
  { code: "AQ", dial: "+672", label: "🇦🇶 Antarctica" },
  { code: "AG", dial: "+1-268", label: "🇦🇬 Antigua & Barbuda" },
  { code: "AR", dial: "+54", label: "🇦🇷 Argentina" },
  { code: "AM", dial: "+374", label: "🇦🇲 Armenia" },
  { code: "AW", dial: "+297", label: "🇦🇼 Aruba" },
  { code: "AU", dial: "+61", label: "🇦🇺 Australia" },
  { code: "AT", dial: "+43", label: "🇦🇹 Austria" },
  { code: "AZ", dial: "+994", label: "🇦🇿 Azerbaijan" },
  { code: "BS", dial: "+1-242", label: "🇧🇸 Bahamas" },
  { code: "BH", dial: "+973", label: "🇧🇭 Bahrain" },
  { code: "BD", dial: "+880", label: "🇧🇩 Bangladesh" },
  { code: "BB", dial: "+1-246", label: "🇧🇧 Barbados" },
  { code: "BY", dial: "+375", label: "🇧🇾 Belarus" },
  { code: "BE", dial: "+32", label: "🇧🇪 Belgium" },
  { code: "BZ", dial: "+501", label: "🇧🇿 Belize" },
  { code: "BJ", dial: "+229", label: "🇧🇯 Benin" },
  { code: "BM", dial: "+1-441", label: "🇧🇲 Bermuda" },
  { code: "BT", dial: "+975", label: "🇧🇹 Bhutan" },
  { code: "BO", dial: "+591", label: "🇧🇴 Bolivia" },
  { code: "BA", dial: "+387", label: "🇧🇦 Bosnia & Herzegovina" },
  { code: "BW", dial: "+267", label: "🇧🇼 Botswana" },
  { code: "BR", dial: "+55", label: "🇧🇷 Brazil" },
  { code: "IO", dial: "+246", label: "🇮🇴 British Indian Ocean" },
  { code: "VG", dial: "+1-284", label: "🇻🇬 British Virgin Is." },
  { code: "BN", dial: "+673", label: "🇧🇳 Brunei" },
  { code: "BG", dial: "+359", label: "🇧🇬 Bulgaria" },
  { code: "BF", dial: "+226", label: "🇧🇫 Burkina Faso" },
  { code: "BI", dial: "+257", label: "🇧🇮 Burundi" },
  { code: "KH", dial: "+855", label: "🇰🇭 Cambodia" },
  { code: "CM", dial: "+237", label: "🇨🇲 Cameroon" },
  { code: "CA", dial: "+1", label: "🇨🇦 Canada" },
  { code: "CV", dial: "+238", label: "🇨🇻 Cape Verde" },
  { code: "KY", dial: "+1-345", label: "🇰🇾 Cayman Is." },
  { code: "CF", dial: "+236", label: "🇨🇫 Central African Rep." },
  { code: "TD", dial: "+235", label: "🇹🇩 Chad" },
  { code: "CL", dial: "+56", label: "🇨🇱 Chile" },
  { code: "CN", dial: "+86", label: "🇨🇳 China" },
  { code: "CX", dial: "+61", label: "🇨🇽 Christmas Island" },
  { code: "CC", dial: "+61", label: "🇨🇨 Cocos Islands" },
  { code: "CO", dial: "+57", label: "🇨🇴 Colombia" },
  { code: "KM", dial: "+269", label: "🇰🇲 Comoros" },
  { code: "CK", dial: "+682", label: "🇨🇰 Cook Islands" },
  { code: "CR", dial: "+506", label: "🇨🇷 Costa Rica" },
  { code: "HR", dial: "+385", label: "🇭🇷 Croatia" },
  { code: "CU", dial: "+53", label: "🇨🇺 Cuba" },
  { code: "CW", dial: "+599", label: "🇨🇼 Curaçao" },
  { code: "CY", dial: "+357", label: "🇨🇾 Cyprus" },
  { code: "CZ", dial: "+420", label: "🇨🇿 Czechia" },
  { code: "DK", dial: "+45", label: "🇩🇰 Denmark" },
  { code: "DJ", dial: "+253", label: "🇩🇯 Djibouti" },
  { code: "DM", dial: "+1-767", label: "🇩🇲 Dominica" },
  { code: "DO", dial: "+1-809", label: "🇩🇴 Dominican Rep." },
  { code: "EC", dial: "+593", label: "🇪🇨 Ecuador" },
  { code: "EG", dial: "+20", label: "🇪🇬 Egypt" },
  { code: "SV", dial: "+503", label: "🇸🇻 El Salvador" },
  { code: "GQ", dial: "+240", label: "🇬🇶 Eq. Guinea" },
  { code: "ER", dial: "+291", label: "🇪🇷 Eritrea" },
  { code: "EE", dial: "+372", label: "🇪🇪 Estonia" },
  { code: "SZ", dial: "+268", label: "🇸🇿 Eswatini" },
  { code: "ET", dial: "+251", label: "🇪🇹 Ethiopia" },
  { code: "FK", dial: "+500", label: "🇫🇰 Falkland Is." },
  { code: "FO", dial: "+298", label: "🇫🇴 Faroe Is." },
  { code: "FJ", dial: "+679", label: "🇫🇯 Fiji" },
  { code: "FI", dial: "+358", label: "🇫🇮 Finland" },
  { code: "FR", dial: "+33", label: "🇫🇷 France" },
  { code: "GF", dial: "+594", label: "🇬🇫 French Guiana" },
  { code: "PF", dial: "+689", label: "🇵🇫 French Polynesia" },
  { code: "GA", dial: "+241", label: "🇬🇦 Gabon" },
  { code: "GM", dial: "+220", label: "🇬🇲 Gambia" },
  { code: "GE", dial: "+995", label: "🇬🇪 Georgia" },
  { code: "DE", dial: "+49", label: "🇩🇪 Germany" },
  { code: "GH", dial: "+233", label: "🇬🇭 Ghana" },
  { code: "GI", dial: "+350", label: "🇬🇮 Gibraltar" },
  { code: "GR", dial: "+30", label: "🇬🇷 Greece" },
  { code: "GL", dial: "+299", label: "🇬🇱 Greenland" },
  { code: "GD", dial: "+1-473", label: "🇬🇩 Grenada" },
  { code: "GP", dial: "+590", label: "🇬🇵 Guadeloupe" },
  { code: "GU", dial: "+1-671", label: "🇬🇺 Guam" },
  { code: "GT", dial: "+502", label: "🇬🇹 Guatemala" },
  { code: "GG", dial: "+44-1481", label: "🇬🇬 Guernsey" },
  { code: "GN", dial: "+224", label: "🇬🇳 Guinea" },
  { code: "GW", dial: "+245", label: "🇬🇼 Guinea-Bissau" },
  { code: "GY", dial: "+592", label: "🇬🇾 Guyana" },
  { code: "HT", dial: "+509", label: "🇭🇹 Haiti" },
  { code: "HN", dial: "+504", label: "🇭🇳 Honduras" },
  { code: "HK", dial: "+852", label: "🇭🇰 Hong Kong" },
  { code: "HU", dial: "+36", label: "🇭🇺 Hungary" },
  { code: "IS", dial: "+354", label: "🇮🇸 Iceland" },
  { code: "IN", dial: "+91", label: "🇮🇳 India" },
  { code: "ID", dial: "+62", label: "🇮🇩 Indonesia" },
  { code: "IR", dial: "+98", label: "🇮🇷 Iran" },
  { code: "IQ", dial: "+964", label: "🇮🇶 Iraq" },
  { code: "IE", dial: "+353", label: "🇮🇪 Ireland" },
  { code: "IM", dial: "+44-1624", label: "🇮🇲 Isle of Man" },
  { code: "IL", dial: "+972", label: "🇮🇱 Israel" },
  { code: "IT", dial: "+39", label: "🇮🇹 Italy" },
  { code: "CI", dial: "+225", label: "🇨🇮 Ivory Coast" },
  { code: "JM", dial: "+1-876", label: "🇯🇲 Jamaica" },
  { code: "JP", dial: "+81", label: "🇯🇵 Japan" },
  { code: "JE", dial: "+44-1534", label: "🇯🇪 Jersey" },
  { code: "JO", dial: "+962", label: "🇯🇴 Jordan" },
  { code: "KZ", dial: "+7", label: "🇰🇿 Kazakhstan" },
  { code: "KE", dial: "+254", label: "🇰🇪 Kenya" },
  { code: "KI", dial: "+686", label: "🇰🇮 Kiribati" },
  { code: "XK", dial: "+383", label: "🇽🇰 Kosovo" },
  { code: "KW", dial: "+965", label: "🇰🇼 Kuwait" },
  { code: "KG", dial: "+996", label: "🇰🇬 Kyrgyzstan" },
  { code: "LA", dial: "+856", label: "🇱🇦 Laos" },
  { code: "LV", dial: "+371", label: "🇱🇻 Latvia" },
  { code: "LB", dial: "+961", label: "🇱🇧 Lebanon" },
  { code: "LS", dial: "+266", label: "🇱🇸 Lesotho" },
  { code: "LR", dial: "+231", label: "🇱🇷 Liberia" },
  { code: "LY", dial: "+218", label: "🇱🇾 Libya" },
  { code: "LI", dial: "+423", label: "🇱🇮 Liechtenstein" },
  { code: "LT", dial: "+370", label: "🇱🇹 Lithuania" },
  { code: "LU", dial: "+352", label: "🇱🇺 Luxembourg" },
  { code: "MO", dial: "+853", label: "🇲🇴 Macao" },
  { code: "MK", dial: "+389", label: "🇲🇰 North Macedonia" },
  { code: "MG", dial: "+261", label: "🇲🇬 Madagascar" },
  { code: "MW", dial: "+265", label: "🇲🇼 Malawi" },
  { code: "MY", dial: "+60", label: "🇲🇾 Malaysia" },
  { code: "MV", dial: "+960", label: "🇲🇻 Maldives" },
  { code: "ML", dial: "+223", label: "🇲🇱 Mali" },
  { code: "MT", dial: "+356", label: "🇲🇹 Malta" },
  { code: "MH", dial: "+692", label: "🇲🇭 Marshall Is." },
  { code: "MQ", dial: "+596", label: "🇲🇶 Martinique" },
  { code: "MR", dial: "+222", label: "🇲🇷 Mauritania" },
  { code: "MU", dial: "+230", label: "🇲🇺 Mauritius" },
  { code: "YT", dial: "+262", label: "🇾🇹 Mayotte" },
  { code: "MX", dial: "+52", label: "🇲🇽 Mexico" },
  { code: "FM", dial: "+691", label: "🇫🇲 Micronesia" },
  { code: "MD", dial: "+373", label: "🇲🇩 Moldova" },
  { code: "MC", dial: "+377", label: "🇲🇨 Monaco" },
  { code: "MN", dial: "+976", label: "🇲🇳 Mongolia" },
  { code: "ME", dial: "+382", label: "🇲🇪 Montenegro" },
  { code: "MS", dial: "+1-664", label: "🇲🇸 Montserrat" },
  { code: "MA", dial: "+212", label: "🇲🇦 Morocco" },
  { code: "MZ", dial: "+258", label: "🇲🇿 Mozambique" },
  { code: "MM", dial: "+95", label: "🇲🇲 Myanmar" },
  { code: "NA", dial: "+264", label: "🇳🇦 Namibia" },
  { code: "NR", dial: "+674", label: "🇳🇷 Nauru" },
  { code: "NP", dial: "+977", label: "🇳🇵 Nepal" },
  { code: "NL", dial: "+31", label: "🇳🇱 Netherlands" },
  { code: "NC", dial: "+687", label: "🇳🇨 New Caledonia" },
  { code: "NZ", dial: "+64", label: "🇳🇿 New Zealand" },
  { code: "NI", dial: "+505", label: "🇳🇮 Nicaragua" },
  { code: "NE", dial: "+227", label: "🇳🇪 Niger" },
  { code: "NG", dial: "+234", label: "🇳🇬 Nigeria" },
  { code: "NU", dial: "+683", label: "🇳🇺 Niue" },
  { code: "KP", dial: "+850", label: "🇰🇵 North Korea" },
  { code: "MP", dial: "+1-670", label: "🇲🇵 N. Mariana Is." },
  { code: "NO", dial: "+47", label: "🇳🇴 Norway" },
  { code: "OM", dial: "+968", label: "🇴🇲 Oman" },
  { code: "PK", dial: "+92", label: "🇵🇰 Pakistan" },
  { code: "PW", dial: "+680", label: "🇵🇼 Palau" },
  { code: "PS", dial: "+970", label: "🇵🇸 Palestine" },
  { code: "PA", dial: "+507", label: "🇵🇦 Panama" },
  { code: "PG", dial: "+675", label: "🇵🇬 Papua New Guinea" },
  { code: "PY", dial: "+595", label: "🇵🇾 Paraguay" },
  { code: "PE", dial: "+51", label: "🇵🇪 Peru" },
  { code: "PH", dial: "+63", label: "🇵🇭 Philippines" },
  { code: "PL", dial: "+48", label: "🇵🇱 Poland" },
  { code: "PT", dial: "+351", label: "🇵🇹 Portugal" },
  { code: "PR", dial: "+1-787", label: "🇵🇷 Puerto Rico" },
  { code: "QA", dial: "+974", label: "🇶🇦 Qatar" },
  { code: "RE", dial: "+262", label: "🇷🇪 Réunion" },
  { code: "RO", dial: "+40", label: "🇷🇴 Romania" },
  { code: "RU", dial: "+7", label: "🇷🇺 Russia" },
  { code: "RW", dial: "+250", label: "🇷🇼 Rwanda" },
  { code: "BL", dial: "+590", label: "🇧🇱 St. Barth" },
  { code: "SH", dial: "+290", label: "🇸🇭 St. Helena" },
  { code: "KN", dial: "+1-869", label: "🇰🇳 St. Kitts" },
  { code: "LC", dial: "+1-758", label: "🇱🇨 St. Lucia" },
  { code: "MF", dial: "+590", label: "🇲🇫 St. Martin" },
  { code: "PM", dial: "+508", label: "🇵🇲 St. Pierre & Miquelon" },
  { code: "VC", dial: "+1-784", label: "🇻🇨 St. Vincent" },
  { code: "WS", dial: "+685", label: "🇼🇸 Samoa" },
  { code: "SM", dial: "+378", label: "🇸🇲 San Marino" },
  { code: "ST", dial: "+239", label: "🇸🇹 Sao Tome & Principe" },
  { code: "SA", dial: "+966", label: "🇸🇦 Saudi Arabia" },
  { code: "SN", dial: "+221", label: "🇸🇳 Senegal" },
  { code: "RS", dial: "+381", label: "🇷🇸 Serbia" },
  { code: "SC", dial: "+248", label: "🇸🇨 Seychelles" },
  { code: "SL", dial: "+232", label: "🇸🇱 Sierra Leone" },
  { code: "SG", dial: "+65", label: "🇸🇬 Singapore" },
  { code: "SX", dial: "+1-721", label: "🇸🇽 Sint Maarten" },
  { code: "SK", dial: "+421", label: "🇸🇰 Slovakia" },
  { code: "SI", dial: "+386", label: "🇸🇮 Slovenia" },
  { code: "SB", dial: "+677", label: "🇸🇧 Solomon Is." },
  { code: "SO", dial: "+252", label: "🇸🇴 Somalia" },
  { code: "ZA", dial: "+27", label: "🇿🇦 South Africa" },
  { code: "KR", dial: "+82", label: "🇰🇷 South Korea" },
  { code: "SS", dial: "+211", label: "🇸🇸 South Sudan" },
  { code: "ES", dial: "+34", label: "🇪🇸 Spain" },
  { code: "LK", dial: "+94", label: "🇱🇰 Sri Lanka" },
  { code: "SD", dial: "+249", label: "🇸🇩 Sudan" },
  { code: "SR", dial: "+597", label: "🇸🇷 Suriname" },
  { code: "SE", dial: "+46", label: "🇸🇪 Sweden" },
  { code: "CH", dial: "+41", label: "🇨🇭 Switzerland" },
  { code: "SY", dial: "+963", label: "🇸🇾 Syria" },
  { code: "TW", dial: "+886", label: "🇹🇼 Taiwan" },
  { code: "TJ", dial: "+992", label: "🇹🇯 Tajikistan" },
  { code: "TZ", dial: "+255", label: "🇹🇿 Tanzania" },
  { code: "TH", dial: "+66", label: "🇹🇭 Thailand" },
  { code: "TG", dial: "+228", label: "🇹🇬 Togo" },
  { code: "TK", dial: "+690", label: "🇹🇰 Tokelau" },
  { code: "TO", dial: "+676", label: "🇹🇴 Tonga" },
  { code: "TT", dial: "+1-868", label: "🇹🇹 Trinidad & Tobago" },
  { code: "TN", dial: "+216", label: "🇹🇳 Tunisia" },
  { code: "TR", dial: "+90", label: "🇹🇷 Turkey" },
  { code: "TM", dial: "+993", label: "🇹🇲 Turkmenistan" },
  { code: "TC", dial: "+1-649", label: "🇹🇨 Turks & Caicos" },
  { code: "TV", dial: "+688", label: "🇹🇻 Tuvalu" },
  { code: "UG", dial: "+256", label: "🇺🇬 Uganda" },
  { code: "UA", dial: "+380", label: "🇺🇦 Ukraine" },
  { code: "AE", dial: "+971", label: "🇦🇪 United Arab Emirates" },
  { code: "GB", dial: "+44", label: "🇬🇧 United Kingdom" },
  { code: "US", dial: "+1", label: "🇺🇸 United States" },
  { code: "UY", dial: "+598", label: "🇺🇾 Uruguay" },
  { code: "UZ", dial: "+998", label: "🇺🇿 Uzbekistan" },
  { code: "VU", dial: "+678", label: "🇻🇺 Vanuatu" },
  { code: "VA", dial: "+379", label: "🇻🇦 Vatican City" },
  { code: "VE", dial: "+58", label: "🇻🇪 Venezuela" },
  { code: "VN", dial: "+84", label: "🇻🇳 Vietnam" },
  { code: "WF", dial: "+681", label: "🇼🇫 Wallis & Futuna" },
  { code: "EH", dial: "+212", label: "🇪🇭 Western Sahara" },
  { code: "YE", dial: "+967", label: "🇾🇪 Yemen" },
  { code: "ZM", dial: "+260", label: "🇿🇲 Zambia" },
  { code: "ZW", dial: "+263", label: "🇿🇼 Zimbabwe" },
];

interface CountrySelectProps {
  value: string; // current selected dial code
  onChange: (val: string) => void; // called when selection changes (dial code)
  onCountryChange?: (iso: string) => void; // optional ISO code callback
}

export default function CountrySelect({ value, onChange, onCountryChange }: CountrySelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedCountry = COUNTRY_LIST.find((c) => c.dial === value) || COUNTRY_LIST[0];

  return (
    <div className="relative w-32">
      {/* Selected country button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center bg-background/80 justify-between border rounded px-3 py-2 text-left"
      >
        <div className="flex items-center space-x-2">
          <img
            src={`https://flagcdn.com/24x18/${selectedCountry.code.toLowerCase()}.png`}
            alt={selectedCountry.code}
            className="w-5 h-4 rounded-sm object-cover"
            onError={(e: any) => {
              e.currentTarget.style.display = "none";
            }}
          />
          <span className="truncate">{selectedCountry.code}</span>
        </div>
        <span className="ml-2 text-sm text-muted-foreground">{selectedCountry.dial}</span>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <ul className="absolute z-10 w-full bg-black border rounded mt-1 max-h-56 overflow-y-auto shadow-lg">
          {COUNTRY_LIST.map((country) => (
            <li
              key={country.code}
              onClick={() => {
                onChange(country.dial);
                if (onCountryChange) onCountryChange(country.code);
                setIsOpen(false);
              }}
              className={`flex justify-between items-center px-3 py-2 cursor-pointer hover:bg-gray-800 ${
                country.dial === value ? "bg-black font-semibold" : ""
              }`}
            >
              <div className="flex items-center space-x-2">
                <img
                  src={`https://flagcdn.com/24x18/${country.code.toLowerCase()}.png`}
                  alt={country.code}
                  className="w-5 h-4 rounded-sm object-cover"
                  onError={(e: any) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
                <span>{country.code}</span>
              </div>
              <span className="text-sm text-muted-foreground">{country.dial}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
