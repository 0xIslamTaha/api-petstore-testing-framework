import axios, { AxiosStatic } from "axios";

export abstract class ApiClientBase {
  protected constructor() {
    axios.defaults.headers.common = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    axios.defaults.validateStatus = () => true;
  }

  client: AxiosStatic = axios;
}
