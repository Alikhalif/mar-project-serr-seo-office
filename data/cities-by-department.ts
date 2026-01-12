// app/data/cities-by-department.ts

// Define the department type
export type Department = {
  id: string;
  name: string;
  department: string;
  cities: readonly string[];
};

// Define the department keys type
export type DepartmentKey = keyof typeof citiesByDepartment;

// Your existing data
export const citiesByDepartment = {
  "paris": {
    id: "75",
    name: "Paris",
    department: "Paris (75)",
    cities: [
      "Paris 1", "Paris 2", "Paris 3", "Paris 4", "Paris 5", "Paris 6", 
      "Paris 7", "Paris 8", "Paris 9", "Paris 10", "Paris 11", "Paris 12",
      "Paris 13", "Paris 14", "Paris 15", "Paris 16", "Paris 17", "Paris 18",
      "Paris 19", "Paris 20"
    ] as const
  },
  "hauts-de-seine": {
    id: "92",
    name: "Hauts-de-Seine",
    department: "Hauts-de-Seine (92)",
    cities: [
      "Boulogne-Billancourt", "Nanterre", "Courbevoie", "Colombes",
      "Asnières-sur-Seine", "Levallois-Perret", "Neuilly-sur-Seine",
      "Issy-les-Moulineaux", "Rueil-Malmaison", "Meudon", "Clamart",
      "Montrouge", "Puteaux", "Suresnes", "Gennevilliers", "Clichy",
      "Châtenay-Malabry", "Villeneuve-la-Garenne", "Malakoff"
    ] as const
  },
  "val-de-marne": {
    id: "94",
    name: "Val-de-Marne",
    department: "Val-de-Marne (94)",
    cities: [
      "Créteil", "Vitry-sur-Seine", "Ivry-sur-Seine", "Saint-Maur-des-Fossés",
      "Champigny-sur-Marne", "Maisons-Alfort", "Alfortville", "Villejuif",
      "Charenton-le-Pont", "Le Kremlin-Bicêtre", "Orly", "Thiais",
      "Choisy-le-Roi", "Nogent-sur-Marne", "Fontenay-sous-Bois", "Vincennes",
      "Sucy-en-Brie", "Limeil-Brévannes"
    ] as const
  },
  "essonne": {
    id: "91",
    name: "Essonne",
    department: "Essonne (91)",
    cities: [
      "Évry-Courcouronnes", "Massy", "Savigny-sur-Orge", "Sainte-Geneviève-des-Bois",
      "Corbeil-Essonnes", "Palaiseau", "Athis-Mons", "Viry-Châtillon",
      "Les Ulis", "Draveil", "Ris-Orangis", "Brunoy",
      "Grigny", "Gif-sur-Yvette", "Yerres"
    ] as const
  },
  "seine-et-marne": {
    id: "77",
    name: "Seine-et-Marne",
    department: "Seine-et-Marne (77)",
    cities: [
      "Meaux", "Chelles", "Melun", "Pontault-Combault",
      "Savigny-le-Temple", "Champs-sur-Marne", "Villeparisis", "Torcy",
      "Lagny-sur-Marne", "Bussy-Saint-Georges", "Fontainebleau", "Coulommiers",
      "Mitry-Mory", "Sénart"
    ] as const
  },
  "yvelines": {
    id: "78",
    name: "Yvelines",
    department: "Yvelines (78)",
    cities: [
      "Versailles", "Saint-Germain-en-Laye", "Mantes-la-Jolie", "Poissy",
      "Sartrouville", "Conflans-Sainte-Honorine", "Houilles", "Trappes",
      "Montigny-le-Bretonneux", "Rambouillet", "Le Chesnay-Rocquencourt",
      "Élancourt", "Les Mureaux"
    ] as const
  },
  "val-doise": {
    id: "95",
    name: "Val-d'Oise",
    department: "Val-d'Oise (95)",
    cities: [
      "Argenteuil", "Sarcelles", "Cergy", "Garges-lès-Gonesse",
      "Franconville", "Ermont", "Pontoise", "Taverny",
      "Saint-Gratien", "Sannois", "Gonesse", "Bezons",
      "Villiers-le-Bel", "Enghien-les-Bains"
    ] as const
  },
  "alpes-maritimes": {
    id: "06",
    name: "Alpes-Maritimes",
    department: "Alpes-Maritimes (06)",
    cities: [
      "Nice", "Cannes", "Antibes", "Grasse",
      "Cagnes-sur-Mer", "Menton", "Le Cannet", "Saint-Laurent-du-Var",
      "Mougins", "Vallauris", "Villeneuve-Loubet"
    ] as const
  },
  "bouches-du-rhone": {
    id: "13",
    name: "Bouches-du-Rhône",
    department: "Bouches-du-Rhône (13)",
    cities: [
      "Marseille 1", "Marseille 2", "Marseille 3", "Marseille 4",
      "Marseille 5", "Marseille 6", "Marseille 7", "Marseille 8",
      "Marseille 9", "Marseille 10", "Marseille 11", "Marseille 12",
      "Marseille 13", "Marseille 14", "Marseille 15", "Marseille 16",
      "Aix-en-Provence", "Aubagne", "Martigues", "Salon-de-Provence",
      "Vitrolles", "Marignane", "Istres", "La Ciotat",
      "Miramas", "Allauch", "Les Pennes-Mirabeau"
    ] as const
  },
  "var": {
    id: "83",
    name: "Var",
    department: "Var (83)",
    cities: [
      "Toulon", "Hyères", "La Seyne-sur-Mer", "Fréjus",
      "Saint-Raphaël", "Six-Fours-les-Plages", "Brignoles", "Draguignan",
      "La Garde", "La Valette-du-Var"
    ] as const
  },
  "vaucluse": {
    id: "84",
    name: "Vaucluse",
    department: "Vaucluse (84)",
    cities: [
      "Avignon", "Orange", "Carpentras", "Cavaillon",
      "Le Pontet", "Sorgues", "L'Isle-sur-la-Sorgue", "Apt",
      "Bollène", "Pertuis", "Monteux", "Vedène",
      "Morières-lès-Avignon", "Le Thor", "Sarrians", "Châteaurenard"
    ] as const
  }
} as const;

// Type-safe way to get department keys
export const departmentKeys = Object.keys(citiesByDepartment) as DepartmentKey[];

// Flat array of all cities
export const allCities = departmentKeys.flatMap(key => 
  citiesByDepartment[key].cities.map(city => ({
    name: city,
    department: citiesByDepartment[key].department,
    departmentId: citiesByDepartment[key].id,
    departmentKey: key,
    slug: createSlug(city)
  }))
);

// Helper function to create slugs
function createSlug(cityName: string): string {
  return cityName
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '');
}


// Get all cities by department ID
export function getCitiesByDepartmentId(departmentId: string) {
  const department = Object.values(citiesByDepartment).find(dept => dept.id === departmentId);
  return department ? department.cities : [];
}

// Get all departments for dropdown or navigation
export const allDepartments = Object.values(citiesByDepartment).map(dept => ({
  id: dept.id,
  name: dept.name,
  department: dept.department,
  slug: dept.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
}));

// Get department by slug
export function getDepartmentBySlug(slug: string) {
  return Object.values(citiesByDepartment).find(
    dept => dept.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '') === slug
  );
}