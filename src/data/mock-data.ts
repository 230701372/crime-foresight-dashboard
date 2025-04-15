
// Mock crime data for the dashboard with Indian context
export const crimeTrendData = [
  { name: 'Jan', violent: 140, property: 265, other: 135 },
  { name: 'Feb', violent: 135, property: 259, other: 130 },
  { name: 'Mar', violent: 145, property: 270, other: 138 },
  { name: 'Apr', violent: 150, property: 275, other: 142 },
  { name: 'May', violent: 160, property: 280, other: 145 },
  { name: 'Jun', violent: 155, property: 273, other: 141 },
  { name: 'Jul', violent: 148, property: 268, other: 138 },
  { name: 'Aug', violent: 142, property: 265, other: 136 },
  { name: 'Sep', violent: 138, property: 260, other: 132 },
  { name: 'Oct', violent: 144, property: 268, other: 137 },
  { name: 'Nov', violent: 152, property: 275, other: 140 },
  { name: 'Dec', violent: 158, property: 282, other: 146 },
];

export const predictionData = [
  { name: 'Jan', actual: 405, predicted: 410 },
  { name: 'Feb', actual: 390, predicted: 395 },
  { name: 'Mar', actual: 415, predicted: 420 },
  { name: 'Apr', actual: 430, predicted: 425 },
  { name: 'May', actual: 440, predicted: 450 },
  { name: 'Jun', actual: 435, predicted: 430 },
  { name: 'Jul', predicted: 425 },
  { name: 'Aug', predicted: 420 },
  { name: 'Sep', predicted: 415 },
];

export const crimeTypeData = [
  { name: 'Theft', value: 35 },
  { name: 'Physical Assault', value: 20 },
  { name: 'House Break-in', value: 15 },
  { name: 'Street Crime', value: 10 },
  { name: 'Cyber Crime', value: 12 },
  { name: 'Others', value: 8 },
];

export const recentIncidents = [
  {
    id: '1',
    type: 'Street Crime',
    location: 'Connaught Place, New Delhi',
    time: '2h ago',
    severity: 'high' as const,
    status: 'investigating' as const,
  },
  {
    id: '2',
    type: 'Vehicle Theft',
    location: 'Bandra West, Mumbai',
    time: '3h ago',
    severity: 'medium' as const,
    status: 'open' as const,
  },
  {
    id: '3',
    type: 'Cyber Crime',
    location: 'Electronic City, Bangalore',
    time: '5h ago',
    severity: 'low' as const,
    status: 'closed' as const,
  },
  {
    id: '4',
    type: 'House Break-in',
    location: 'Salt Lake, Kolkata',
    time: '8h ago',
    severity: 'high' as const,
    status: 'investigating' as const,
  },
  {
    id: '5',
    type: 'Physical Assault',
    location: 'T Nagar, Chennai',
    time: '12h ago',
    severity: 'medium' as const,
    status: 'closed' as const,
  },
];

