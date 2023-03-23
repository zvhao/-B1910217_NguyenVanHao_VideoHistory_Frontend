import createApiClient from "./api.service";
class AccountService {
	constructor(baseUrl = "/api/auth") {
		this.api = createApiClient(baseUrl);
	}
	
	// async getAll() {
	// 	return (await this.api.get("/")).data;
	// }

	// async getAllFavorite() {
	// 	return (await this.api.get("/favorite")).data;
	// }
	
	async create(data) {
		return (await this.api.post("/register", data)).data;
	}
	async login(data) {
		return (await this.api.post("/login", data)).data;
	}
	async findAccountByUsername(username) {
		return (await this.api.get(`/account/${username}`)).data;
	}
	async findAccountById(id) {
		return (await this.api.get(`/account/id/${id}`)).data;
	}

	async addFavorite(id, data) {
		return (await this.api.patch(`/favorites/${id}`, data)).data;
	}
	async removeFavorite(id, data) {
		return (await this.api.patch(`/favorites/remove/${id}`, data)).data;
	}
	
	// async deleteAll() {
	// 	return (await this.api.delete("/")).data;
	// }
	
	// async get(slug) {
	// 	return (await this.api.get(`/${slug}`)).data;
	// }
	
	// async update(slug, data) {
	// 	return (await this.api.patch(`/${slug}`, data)).data;
	// }
	
	// async delete(id) {
	// 	return (await this.api.delete(`/${id}`)).data;
	// }
	
}

export default new AccountService();