// Models within each make are ordered by GCC-market popularity first, then alphabetically.
export const carData: Record<string, string[]> = {
  Acura: ["MDX","RDX","TLX","TL","Integra","CL","CSX/EL","EL","Legend","NSX","RL","RSX","SLX","SLZ"],
  "Alfa Romeo": ["Giulia","Stelvio","Giulietta","Mito","4C","147","156","159","166","8C Competizione","Brera","GT","GTV","Spider","145","146","33"],
  "Aston Martin": ["DB11","DBS","Vantage","DB9","Vanquish","Rapide","V8 Vantage","V12 Vantage","DB7","Cygnet","Virage"],
  Audi: ["Q7","Q5","A6","A4","Q3","A3","Q8","A8","A5","A7","E-Tron","Q2","RS5","RS7","RS6","RS3","RS4","S3","R8","TT","A1","A2","A3 e-tron","A4 Allroad Quattro","A6 Allroad Quattro","S4","S5","S6","S7","S8","TTS"],
  Bentley: ["Bentayga","Continental GT","Continental Flying Spur","Continental GTC","Continental","Arnage","Azure","Brooklands","Continental Supersports"],
  BMW: ["X5","5-Series","3-Series","X3","7-Series","X6","X7","X1","4-Series","6-Series","X4","8-Series","X2","M5","M4","M3","2-Series","1-Series","Z4","I8","M2","M6","X5 M","X6 M","I3","2-Series Active Tourer","3-Series GT","5-Series GT","Z3","Z8"],
  Bugatti: ["Veyron","Grand Sport","Super Sport","Vitesse"],
  Cadillac: ["Escalade","CT5","XT5","CT6","CTS","SRX","ATS","ESV","XT4","XT6","XTS","ATS-V","CTS-V","Deville","DTS","STS"],
  Chevrolet: ["Tahoe","Suburban","Camaro","Silverado","Corvette","Trailblazer","Blazer","Captiva","Equinox","Traverse","Malibu","Impala","Cruze","Caprice","Colorado","Trax","Spark","Aveo","Astro","Avalanche","Bolt","Cobalt","Sonic","Tracker","Volt"],
  Chrysler: ["300C","300","Pacifica","Grand Voyager","Voyager","200","Aspen","Avenger","Crossfire","PT Cruiser","Sebring","Stratus","Town Car"],
  Dodge: ["Challenger","Charger","Durango","Journey","Ram","Dart","Dakota","Caliber","Avenger","Magnum"],
  Ferrari: ["488","458","Roma","Portofino","F12","California T","California","812","296","F430","360","430","355","GTO","Enzo","F40","F50","308"],
  Ford: ["Explorer","Mustang","Expedition","F-150","Edge","Bronco","Ranger","Escape","Taurus","EcoSport","Fusion","Focus","Fiesta","Kuga","Maverick","Galaxy","Mondeo","S-Max","C-Max"],
  GMC: ["Yukon","Yukon XL","Sierra","Terrain","Acadia","Canyon","Denali","Suburban","Envoy","Jimmy"],
  HAVAL: ["H6","Jolion","Dargo","H9","H2","H8"],
  Honda: ["Accord","Civic","CR-V","Pilot","HR-V","City","Odyssey","Jazz","Passport","Vezel","Ridgeline","S2000"],
  Hyundai: ["Tucson","Santa Fe","Elantra","Sonata","Accent","Creta","Kona","Palisade","Staria","Venue","IONIQ","i10","Grand i10","i20","i30","i40","Veloster","Azera","Genesis","Getz","Grand Santa Fe","Grandeur","H1"],
  Infiniti: ["QX80","QX60","QX50","Q50","QX70","FX35","FX50","Q60","Q70","FX37","FX45","G37","G35","G25","QX56","Q30","Q45","QX30","EX35"],
  Jaguar: ["F-Pace","F-Type","XF","XJ","XE","E-Pace","XK","XKR","XFR","XJR","S-Type","X-Type","XJS"],
  Jeep: ["Wrangler","Grand Cherokee","Wrangler Unlimited","Gladiator","Cherokee","Compass","Renegade","Grand Wagoneer","Wagoneer","Commander","Liberty","Patriot"],
  Kia: ["Sportage","Sorento","K5","Seltos","Cerato","Carnival","Telluride","Picanto","Rio","Forte","Stinger","Soul","Optima","Sonet","Cadenza","Carens","K7","Mohave","Pegas","Quoris"],
  Lamborghini: ["Urus","Huracan","Aventador","Gallardo","Murcielago","Countach","Diablo"],
  "Land Rover": ["Range Rover","Range Rover Sport","Range Rover Evoque","Defender","Discovery","Velar","Discovery Sport","LR4","LR3","LR2","Freelander"],
  Lexus: ["LX-Series","RX-Series","ES-Series","IS","GX-Series","NX","LS-Series","GS-Series","RC","UX Series","LC","RC F","LFA","IS-C","IS-F","CT 200h","SC-Series"],
  Lincoln: ["Navigator","Aviator","Nautilus","MKX","MKZ","Continental","Corsair","MKC","MKS","MKT","Town Car"],
  Maserati: ["Levante","Ghibli","Quattroporte","GranTurismo","GranCabrio","Levante S"],
  McLaren: ["720S","570S","650S","540C","675LT","P1","12C","MP4-12C","F1"],
  "Mercedes-Benz": ["G-Class","S-Class","E-Class","GLE-Class","GLC-Class","C-Class","GLS","AMG GT","A-Class","CLA-Class","GLA-Class","GLB Class","S-Class Maybach","EQS","EQC","EQA","EQB","SL-Class","CLS-Class","GL-Class","M-Class","CLK-Class","CL-Class","SLK-Class","SLC-Class","CLC-Class","B-Class","R-Class","GLK-Class","SLR","SLS","Sprinter","Viano","Vito"],
  MG: ["HS","ZS","GT","5","6","3","GS"],
  Mini: ["Cooper","Cooper Countryman","Cooper S","Cooper Clubman","Cooper Coupe","Cooper Paceman"],
  Mitsubishi: ["Pajero","Outlander","ASX","Montero","Eclipse Cross","L200","Lancer","Attrage","Xpander","Eclipse","Galant","Lancer Evolution"],
  Nissan: ["Patrol","Pathfinder","Xtrail","Kicks","Sunny","Altima","Maxima","Sentra","Qashqai","Juke","Murano","Armada","Navara","370Z","GT-R","Tiida","350Z","300Z","Rogue","LEAF","Micra","Almera","Teana","Xterra","Titan"],
  Peugeot: ["3008","2008","5008","508","308","208","301","407","408","307","206","207","4007","107","108","RCZ"],
  Porsche: ["Cayenne","Macan","Panamera","911 Carrera","911 Turbo","911 Turbo S","911 GT3","911 GT3 RS","911 Carrera 4S","911 Carrera 4","Boxster","Cayman","911 GT2","918"],
  RAM: ["1500"],
  Renault: ["Duster","Koleos","Megane","Captur","Clio","Talisman","Symbol","Kadjar","Fluence","Kangoo","Sandero","Logan","Scenic","Espace","Laguna","Modus","Twingo","ZOE"],
  "Rolls Royce": ["Cullinan","Ghost","Phantom","Wraith","Dawn","Silver Shadow","Silver Spur","Corniche","Park Ward"],
  Subaru: ["Outback","Forester","XV","WRX","Impreza","BRZ","Legacy","WRX STI"],
  Suzuki: ["Jimny","Vitara","Grand Vitara","Swift","Baleno","Ertiga","Ciaz","Celerio","Alto","APV","Ignis","Kizashi","Liana","SX4","Wagon R+"],
  TESLA: ["Model 3","Model Y","Model X","Model S","Cybertruck"],
  Toyota: ["Land Cruiser","Camry","Prado","Corolla","RAV4","Hilux","Fortuner","Yaris","C-HR","Highlander","4Runner","Sequoia","Supra","Land Cruiser 70","FJ Cruiser","Innova","Hiace","Avalon","Avanza","Rush","Tundra","Tacoma","86","Aurion","Sienna","Prius","Venza","Previa","Crown","Coaster","Avensis","Aygo","Carina","Celica","Corolla Verso"],
  Volkswagen: ["Tiguan","Golf","Touareg","T-ROC","Teramont","Passat","Golf R","GTI","Polo","ID 4","Jetta","Amarok","Beetle","Caddy","Scirocco","Sharan","Touran","Transporter","Vento"],
  Volvo: ["XC90","XC60","XC40","S90","S60","V90","V60","C30","C70","S40","S80","V40","V50","V70","XC70"],
  Other: [],
};

// Common GCC-market brands surface first; everything else follows alphabetically.
const POPULAR_MAKES = [
  "Toyota",
  "Nissan",
  "Mercedes-Benz",
  "Lexus",
  "Hyundai",
  "Kia",
  "BMW",
  "Ford",
  "Land Rover",
  "Chevrolet",
  "Mitsubishi",
  "Honda",
  "Jeep",
  "Dodge",
  "GMC",
];

// Number of leading models in each make's array that count as "popular" in the GCC.
// Models beyond this index are shown in a separate "All Models" section (alphabetically).
export const popularModelCount: Record<string, number> = {
  Acura: 3,
  "Alfa Romeo": 3,
  "Aston Martin": 4,
  Audi: 8,
  Bentley: 3,
  BMW: 10,
  Bugatti: 2,
  Cadillac: 4,
  Chevrolet: 6,
  Chrysler: 3,
  Dodge: 4,
  Ferrari: 5,
  Ford: 6,
  GMC: 4,
  HAVAL: 3,
  Honda: 5,
  Hyundai: 7,
  Infiniti: 5,
  Jaguar: 4,
  Jeep: 5,
  Kia: 6,
  Lamborghini: 3,
  "Land Rover": 6,
  Lexus: 6,
  Lincoln: 3,
  Maserati: 3,
  McLaren: 3,
  "Mercedes-Benz": 8,
  MG: 3,
  Mini: 3,
  Mitsubishi: 4,
  Nissan: 7,
  Peugeot: 4,
  Porsche: 4,
  RAM: 1,
  Renault: 4,
  "Rolls Royce": 4,
  Subaru: 3,
  Suzuki: 4,
  TESLA: 3,
  Toyota: 8,
  Volkswagen: 5,
  Volvo: 4,
};

const alphabeticalMakes = Object.keys(carData).sort();
export const makes = [
  ...POPULAR_MAKES.filter((m) => carData[m]),
  ...alphabeticalMakes.filter((m) => !POPULAR_MAKES.includes(m)),
];

// Logos are served from the open-source car-logos-dataset via jsDelivr —
// file names are the make's slug (lowercase, spaces -> hyphens), which lines
// up with every key in carData except the synthetic "Other" entry.
export function makeLogoUrl(make: string): string | null {
  if (!make || make === "Other") return null;
  const slug = make.toLowerCase().replace(/\s+/g, "-");
  return `https://cdn.jsdelivr.net/gh/filippofilip95/car-logos-dataset@master/logos/thumb/${slug}.png`;
}

export const mileageOptions = [
  "50,000 – 75,000 km",
  "75,000 – 100,000 km",
  "100,000 – 150,000 km",
  "150,000 – 200,000 km",
  "200,000+ km",
  "0 – 10,000 km",
  "10,000 – 20,000 km",
  "20,000 – 30,000 km",
  "30,000 – 40,000 km",
  "40,000 – 50,000 km",
];

export const specsOptions = ["GCC", "American", "European", "Japanese", "Other"];

export const emirateOptions = [
  "Dubai",
  "Abu Dhabi",
  "Sharjah",
  "Ajman",
  "Umm Al Quwain",
  "Ras Al Khaimah",
  "Fujairah",
];

export const yearOptions: number[] = [];
for (let y = 2026; y >= 2010; y--) yearOptions.push(y);
