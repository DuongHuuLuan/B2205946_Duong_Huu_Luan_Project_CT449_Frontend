import createApiClient from "./api.service";

const baseURL = "/api/nhanvien";

class NhanVienService {
    constructor(baseURL){
        this.api = createApiClient(baseURL);
    }
     /**
   * @description Gửi thông tin đăng nhập đến Backend và nhận token/user.
   * @param {Object} credentials - { MaNhanVien, password }
   */
  async login(credentials) {
    // Giả định Backend có route POST /api/nhanvien/login
    const result = await this.api.post("/login", credentials);
    return result.data; // Trả về thông tin Nhân viên và/hoặc token
  }

  // --- Các hàm CRUD khác (sẽ hoàn thiện sau) ---
  async getAll() {
    return (await this.api.get("/")).data; 
  }
}

export default new NhanVienService(baseURL);