import { AxiosResponse } from "axios";
import http from "../../../http-common";
import { Car } from "../../../model/Car";

export interface Metadata{
  offset:number,
  limit:number,
}

export interface GetData{
  id:string,
}


export class CarService{

  async getAll(): Promise<AxiosResponse<Car[]>> {
    return await http.post('car/list');
  }

  async getByPage(offset: number, limit: number): Promise<AxiosResponse<Car[]>> {
    const metadata: Metadata = {
      offset: offset,
      limit: limit,
    };
    return await http.post('car/list', {metadata});
  }

  async create(data:any): Promise<AxiosResponse<Car[]>> {
    return await http.post('car/create', data);
  }

  async get(id:string): Promise<AxiosResponse<Car[]>> {
    const data: GetData = {
      id: id,
    };
    return await http.post('car/read', {data});
  }

  async delete(id:string): Promise<AxiosResponse<Car[]>> {
    const data: GetData = {
      id: id,
    };
    return await http.post('car/delete', {data});
  }

  async update(data:any): Promise<AxiosResponse<Car[]>> {
    return await http.post('car/update', data);
  }

}

export const carService = new CarService();
