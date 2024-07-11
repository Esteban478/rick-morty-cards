
export type modalData = {
    name: string;
    image: string;
    origin: {
    name: string;
    }
    species: string;
    status: string;
}

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