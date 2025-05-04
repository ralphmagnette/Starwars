export interface Planet {
  uid: string;
  name: string;
  url: string;
}

export interface PlanetDetails {
  uid: string;
  description: string;
  properties: {
    climate: string;
    created: string;
    diameter: string;
    edited: string;
    gravity: string;
    name: string;
    orbital_period: string;
    population: string;
    rotation_period: string;
    surface_water: string;
    terrain: string;
    url: string;
  };
}

export interface PlanetResults {
  results?: Planet[];
  result?: PlanetDetails[];
}
