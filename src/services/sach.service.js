import createApiClient from "./api.service"; 
const baseURL = "/api/sach";

class SachService {
  constructor(baseURL) {
    this.api = createApiClient(baseURL); 
  }
  
  // Hàm CRUD
  async getAll() { return (await this.api.get("/")).data; }
  async get(id) { return (await this.api.get(`/${id}`)).data; }
  async create(data) { return (await this.api.post("/", data)).data; }
  async update(id, data) { return (await this.api.put(`/${id}`, data)).data; }
  async delete(id) { return (await this.api.delete(`/${id}`)).data; }
}

export default new SachService(baseURL);