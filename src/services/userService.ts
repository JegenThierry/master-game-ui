import { API_URL } from "@/models/constants";
import { ResourceTypes } from "@/models/enums";
import ResponseMessage from "@/models/responseMessage";
import { User } from "@/models/user";
import UserResources from "@/models/userResources";
import axios from "axios";

const apiClient = axios.create({ baseURL: API_URL });

export interface ResponseTuple {
	userResources: UserResources;
	messages: ResponseMessage[];
}

class UserService {
	public async createUser(): Promise<User> {
		const url = "User";
		const res = await apiClient.post(url);

		return new User(res.data);
	}

	public async fetchUser(userId: string): Promise<User> {
		let url = "User";
		url += `/${encodeURIComponent(userId)}`;

		const res = await apiClient.get(url);

		console.log(JSON.stringify(res.data, null, 2));
		return new User(res.data);
	}

	public async fetchUserResources(userId: string): Promise<UserResources> {
		let url = "Resources";
		url += `?userId=${encodeURIComponent(userId)}`;

		const res = await apiClient.get(url);
		return new UserResources(res.data);
	}

	public async consumeResource(userId: string, resource: ResourceTypes, amount: number): Promise<ResponseTuple> {
		let url = "Resources/consume";
		url += `?userId=${encodeURIComponent(userId)}`;
		url += `&resourceType=${encodeURIComponent(resource)}`;
		url += `&amount=${encodeURIComponent(amount)}`;

		const res = await apiClient.post(url);

		console.warn(JSON.stringify(res.data, null, 2));
		let { item1, item2 } = res.data;
		const userResources = new UserResources(item1);
		const messages = item2.map((m: ResponseMessage) => new ResponseMessage(m));

		return { userResources, messages };
	}
}

export default new UserService();
