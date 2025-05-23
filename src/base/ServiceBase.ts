import { AxiosResponse, type AxiosRequestConfig } from "axios";
import { ApiClient } from "./ApiClient.js";

export class ServiceBase {
  private api: ApiClient;
  protected url: string;
  protected defaultConfig: AxiosRequestConfig;

  constructor(endpointPath: string) {
    this.api = ApiClient.getInstance();
    this.url = this.baseUrl + endpointPath;
    this.defaultConfig = {};
  }

  get baseUrl(): string {
    return process.env["BASE_URL"] || "http://localhost:8080/api/v3";
  }

  protected async get<T>(
    url: string,
    config: AxiosRequestConfig = this.defaultConfig,
  ): Promise<AxiosResponse<T>> {
    const response = await this.api.client.get<T>(url, config);
    return response;
  }

  protected async post<T>(
    url: string,
    data: unknown,
    config: AxiosRequestConfig = this.defaultConfig,
  ): Promise<AxiosResponse<T>> {
    const response = await this.api.client.post<T>(url, data, config);
    return response;
  }

  protected async put<T>(
    url: string,
    data: unknown,
    config: AxiosRequestConfig = this.defaultConfig,
  ): Promise<AxiosResponse<T>> {
    const response = await this.api.client.put<T>(url, data, config);
    return response;
  }

  protected async delete<T>(
    url: string,
    config: AxiosRequestConfig = this.defaultConfig,
  ): Promise<AxiosResponse<T>> {
    const response = await this.api.client.delete<T>(url, config);
    return response;
  }
}
