export interface Person {
    count: number;
    next: string;
    previous: string;
    results?: (ResultsPerson)[] | null;
  }
  export interface ResultsPerson {
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
    homeworld: string;
    films?: (string)[] | null;
    species?: (string | null)[] | null;
    vehicles?: (string | null)[] | null;
    starships?: (string | null)[] | null;
    created: string;
    edited: string;
    url: string;
  }

  export interface Planet {
    name: string;
    rotation_period: string;
    orbital_period: string;
    diameter: string;
    climate: string;
    gravity: string;
    terrain: string;
    surface_water: string;
    population: string;
    residents?: (string)[] | null;
    films?: (string)[] | null;
    created: string;
    edited: string;
    url: string;
  }

  export interface LikedPerson  {
    name: string;
    gender: string;
  }
    