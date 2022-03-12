import axios from "axios";
import { SERVER_URL } from "../constants/config";

const service = axios.create({
  baseURL: SERVER_URL + 'api/'
});

class HttpService {
  async post(url: string, data: any, headers?: any) {
    try {
      const response = await service.post(url, data, { headers });
      return response.data;
    } catch (error: any) {
      throw {
        error: error.message
      };
    }
  }
  async patch(url: string, data: any, headers?: any) {
    try {
      const response = await service.patch(url, data, { headers });
      return response.data;
    } catch (error: any) {
      throw {
        error: error.message
      };
    }
  }
  async delete(url: string, headers?: any) {
    try {
      const response = await service.delete(url, { headers });
      return response.data;
    } catch (error: any) {
      throw {
        error: error.message
      };
    }
  }
  async get(url: string, headers?: any) {
    try {
      const response = await service.get(url, { headers });
      return response.data;
    } catch (error) {
      return {
        error: error
      };
    }
  }
}

const httpService = new HttpService();
export default httpService;