import { AxiosResponse } from "axios";
import { ServiceBase } from "../base/ServiceBase.js";
import { PetInterface } from "../models/PetsModel.js";

export class PetsService extends ServiceBase {
  constructor() {
    super("/pet");
  }

  async getPet<T>(id: number, config = this.defaultConfig): Promise<AxiosResponse<T>> {
    return await this.get<T>(`${this.url}/${id}`, config);
  }

  async addPet<T>(pet: PetInterface | any, config = this.defaultConfig): Promise<AxiosResponse<T>> {
    return await this.post(this.url, pet, config);
  }

  async getPetsByStatus<T>(
    status: string = "available | pending | sold",
    config = this.defaultConfig,
  ): Promise<AxiosResponse<T>> {
    const _url = `${this.url}/findByStatus`;
    config.params = { status };
    return await this.get<T>(_url, config);
  }

  async putPet<T>(pet: PetInterface, config = this.defaultConfig): Promise<AxiosResponse<T>> {
    return await this.put<T>(this.url, pet, config);
  }

  async deletePet<T>(id: number, config = this.defaultConfig): Promise<AxiosResponse<T>> {
    return await this.delete<T>(`${this.url}/${id}`, config);
  }

  async getPetsByTags<T>(tags: string[], config = this.defaultConfig): Promise<AxiosResponse<T>> {
    const _url = `${this.url}/findByTags`;
    config.params = { tags: tags.join(",") };
    return await this.get<T>(_url, config);
  }
}
