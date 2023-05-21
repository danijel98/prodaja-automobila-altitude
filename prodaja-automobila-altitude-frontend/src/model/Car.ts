import { Root } from "./Root";

export interface Car extends Root {
  manufacturer: string;
  model: string;
  picture: string;
  transmission: string;
  fuel: string;
  type: string;
  price: number;
}