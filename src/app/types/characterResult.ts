export interface CharacterDetails {
  uid: string;
  description: string;
  properties: {
    name: string;
    gender: string;
    skin_color: string;
    hair_color: string;
    height: string;
    eye_color: string;
    mass: string;
    homeworld: string;
    birth_year: string;
    created: string;
    edited: string;
    url: string;
  }
}

export interface CharacterResult {
  result: CharacterDetails;
}
