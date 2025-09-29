import createApiClient from "./api.service";

const baseURL = "/api/nhanvien";

class NhanVienService {
  constructor(baseURL) {
    this.api = createApiClient(baseURL);
  }
  /**
   * @description Gửi thông tin đăng nhập đến Backend và nhận token/user.
   * @param {Object} credentials - { MSNV Password }
   */
  async login(credentials) {
    // Giả định Backend có route POST /api/nhanvien/login
    const result = await this.api.post("/login", credentials);
    return result.data; // Trả về thông tin Nhân viên và/hoặc token
  }
  /**
   * @description
   * @param {Object} data - { MSNV, HoTenNV, Password, ChucVu, DiaChi, SoDienThoai}
   */

  async register(data) {
    const result = await this.api.post("/register", data);
    return result.data;
  }

  /**
   * @description Lấy danh sách tất cả nhân viên
   */
  async getAll() {
    return (await this.api.get("/")).data;
  }

  /**
   * @description Lấy thông tin chi tiết 1 nhân viên theo ID
   */
  async getById(id) {
    return (await this.api.get(`/${id}`)).data;
  }

  /**
   * @description Cập nhật thông tin nhân viên
   */
  async update(id, data) {
    return (await this.api.put(`/${id}`, data)).data;
  }

  /**
   * @description Xóa 1 nhân viên
   */
  async delete(id) {
    return (await this.api.delete(`/${id}`)).data;
  }
}

export default new NhanVienService(baseURL);
