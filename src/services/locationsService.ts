import axios from "axios";
import { API_URL } from "@/models/constants";
import Location from "@/models/location";

class LocationService {
	private apiClient = axios.create({ baseURL: API_URL });

	public async fetchAllLocations(userId: string): Promise<Location[]> {
		let url = "Location";
		url += `?userId=${encodeURIComponent(userId)}`;

		const res = await this.apiClient.get(url);
		return res.data.map((location: Location) => new Location(location));
	}

	public async fetchSublocations(userId: string, locationId: number): Promise<Location[]> {
		let url = "Location/sublocations";
		url += `?userId=${encodeURIComponent(userId)}`;
		url += `&locationId=${encodeURIComponent(locationId)}`;

		const res = await this.apiClient.get(url);
		return res.data.map((location: Location) => new Location(location));
	}
}

export default new LocationService();
