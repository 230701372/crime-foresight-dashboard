
// Mock crime data for the dashboard
export const crimeTrendData = [
  { name: 'Jan', violent: 40, property: 65, other: 35 },
  { name: 'Feb', violent: 35, property: 59, other: 30 },
  { name: 'Mar', violent: 45, property: 70, other: 38 },
  { name: 'Apr', violent: 50, property: 75, other: 42 },
  { name: 'May', violent: 60, property: 80, other: 45 },
  { name: 'Jun', violent: 55, property: 73, other: 41 },
  { name: 'Jul', violent: 48, property: 68, other: 38 },
  { name: 'Aug', violent: 42, property: 65, other: 36 },
  { name: 'Sep', violent: 38, property: 60, other: 32 },
  { name: 'Oct', violent: 44, property: 68, other: 37 },
  { name: 'Nov', violent: 52, property: 75, other: 40 },
  { name: 'Dec', violent: 58, property: 82, other: 46 },
];

export const predictionData = [
  { name: 'Jan', actual: 105, predicted: 110 },
  { name: 'Feb', actual: 90, predicted: 95 },
  { name: 'Mar', actual: 115, predicted: 120 },
  { name: 'Apr', actual: 130, predicted: 125 },
  { name: 'May', actual: 140, predicted: 150 },
  { name: 'Jun', actual: 135, predicted: 130 },
  { name: 'Jul', predicted: 125 },
  { name: 'Aug', predicted: 120 },
  { name: 'Sep', predicted: 115 },
];

export const crimeTypeData = [
  { name: 'Theft', value: 35 },
  { name: 'Assault', value: 20 },
  { name: 'Burglary', value: 15 },
  { name: 'Robbery', value: 10 },
  { name: 'Vandalism', value: 12 },
  { name: 'Others', value: 8 },
];

export const recentIncidents = [
  {
    id: '1',
    type: 'Armed Robbery',
    location: 'Downtown, Main St.',
    time: '2h ago',
    severity: 'high' as const,
    status: 'investigating' as const,
  },
  {
    id: '2',
    type: 'Vehicle Theft',
    location: 'Westside Mall Parking',
    time: '3h ago',
    severity: 'medium' as const,
    status: 'open' as const,
  },
  {
    id: '3',
    type: 'Vandalism',
    location: 'Park Avenue',
    time: '5h ago',
    severity: 'low' as const,
    status: 'closed' as const,
  },
  {
    id: '4',
    type: 'Assault',
    location: 'Nightclub District',
    time: '8h ago',
    severity: 'high' as const,
    status: 'investigating' as const,
  },
  {
    id: '5',
    type: 'Residential Burglary',
    location: 'Hillcrest Neighborhood',
    time: '12h ago',
    severity: 'medium' as const,
    status: 'closed' as const,
  },
];
