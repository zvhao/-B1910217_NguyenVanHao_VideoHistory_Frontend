import createApiClient from "./api.service";
class VideoService {
	constructor(baseUrl = "/api/videos") {
		this.api = createApiClient(baseUrl);
	}
	
	async getAll() {
		return (await this.api.get("/")).data;
	}

	async getAllFavorite() {
		return (await this.api.get("/favorite")).data;
	}
	async getChannel(id) {
		return (await this.api.get(`/channel/${id}`)).data;
	}
	
	async create(data) {
		return (await this.api.post("/", data)).data;
	}
	
	async deleteAll() {
		return (await this.api.delete("/")).data;
	}
	
	async get(slug) {
		return (await this.api.get(`/${slug}`)).data;
	}
	
	async update(slug, data) {
		return (await this.api.patch(`/${slug}`, data)).data;
	}
	
	async delete(id) {
		return (await this.api.delete(`/${id}`)).data;
	}
	
}

export default new VideoService();