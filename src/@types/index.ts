 export interface CharacterData {
  id: string;
  name: string;
  image: string;
    origin: {
    name: string;
  }
  species: string;
  status: string;
 }

 export interface Info {
  count: number;
  pages: number;
  next: string;
  prev: string;
 }

export interface Response {
    info: Info;
    results: CharacterData[];
 }