
interface CrimeRecord {
  id: string;
  type: string;
  date: string;
  location: string;
  district: string;
  state: string;
  status: "Solved" | "Under Investigation";
  description: string;
}

export const indianCrimeData: CrimeRecord[] = [
  {
    id: "1",
    type: "Cybercrime",
    date: "2024-04-10",
    location: "Koramangala",
    district: "Bangalore Urban",
    state: "Karnataka",
    status: "Under Investigation",
    description: "Online banking fraud involving multiple accounts. Suspects used phishing techniques to gather sensitive information."
  },
  {
    id: "2",
    type: "Vehicle Theft",
    date: "2024-04-09",
    location: "Bandra West",
    district: "Mumbai Suburban",
    state: "Maharashtra",
    status: "Solved",
    description: "Two-wheeler theft from residential complex. CCTV footage helped identify the suspects."
  },
  {
    id: "3",
    type: "Robbery",
    date: "2024-04-08",
    location: "Connaught Place",
    district: "New Delhi",
    state: "Delhi",
    status: "Under Investigation",
    description: "Armed robbery at jewelry store. Suspects escaped with valuable items."
  },
  {
    id: "4",
    type: "Drug Trafficking",
    date: "2024-04-07",
    location: "Salt Lake",
    district: "Kolkata",
    state: "West Bengal",
    status: "Solved",
    description: "Major drug bust operation resulting in seizure of controlled substances."
  },
  {
    id: "5",
    type: "Assault",
    date: "2024-04-06",
    location: "Jubilee Hills",
    district: "Hyderabad",
    state: "Telangana",
    status: "Under Investigation",
    description: "Physical altercation between two groups outside entertainment venue."
  },
  {
    id: "6",
    type: "Burglary",
    date: "2024-04-05",
    location: "Aundh",
    district: "Pune",
    state: "Maharashtra",
    status: "Solved",
    description: "Break-in at commercial establishment during night hours."
  },
  {
    id: "7",
    type: "Financial Fraud",
    date: "2024-04-04",
    location: "Electronic City",
    district: "Bangalore Urban",
    state: "Karnataka",
    status: "Under Investigation",
    description: "Investment fraud scheme targeting senior citizens."
  },
  {
    id: "8",
    type: "Kidnapping",
    date: "2024-04-03",
    location: "Civil Lines",
    district: "Jaipur",
    state: "Rajasthan",
    status: "Solved",
    description: "Minor kidnapping case resolved with victim safely recovered."
  },
  {
    id: "9",
    type: "Cyberstalking",
    date: "2024-04-02",
    location: "Adyar",
    district: "Chennai",
    state: "Tamil Nadu",
    status: "Under Investigation",
    description: "Online harassment case involving social media platforms."
  },
  {
    id: "10",
    type: "Property Dispute",
    date: "2024-04-01",
    location: "Gomti Nagar",
    district: "Lucknow",
    state: "Uttar Pradesh",
    status: "Under Investigation",
    description: "Violent dispute over property ownership between family members."
  },
  {
    id: "11",
    type: "Vehicle Accident",
    date: "2024-03-31",
    location: "MG Road",
    district: "Kochi",
    state: "Kerala",
    status: "Solved",
    description: "Hit and run case solved using traffic camera footage."
  },
  {
    id: "12",
    type: "Domestic Violence",
    date: "2024-03-30",
    location: "Patel Nagar",
    district: "Patna",
    state: "Bihar",
    status: "Under Investigation",
    description: "Reported case of domestic abuse requiring immediate intervention."
  }
];
