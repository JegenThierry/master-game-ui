import axios from "axios";
import { WebPage } from "@/models/webPage";
import { API_URL } from "@/models/constants";

const apiClient = axios.create({ baseURL: API_URL });

export default {
  async fetchWebpages(userId: string): Promise<WebPage[]> {
    try {
      const res = await apiClient.get(`WebPage/${encodeURI(userId)}`);
      return res.data.map((wp: WebPage) => new WebPage(wp));
    } catch (error) {
      console.error("Error fetching webpages:", error);
      throw error;
    }
  },
};
