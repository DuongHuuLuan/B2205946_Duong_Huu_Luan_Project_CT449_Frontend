<template>
    <div class="card shadow-sm">
        <div class="card-body p-4">
            <h4 class="card-title text-center mb-4">Đăng Nhập Quản Lý Mượn Sách</h4>
            <form @submit.prevent="handleLogin">

                <div class="mb-3">
                    <label for="username" class="form-label">Tên Đăng Nhập (Mã NV):</label>
                    <input type="text" id="username" class="form-control" v-model="loginData.MaNhanVien" required />
                </div>

                <div class="mb-3">
                    <label for="password" class="form-label">Mật Khẩu:</label>
                    <input type="password" id="password" class="form-control" v-model="loginData.password" required />
                </div>

                <div v-if="error" class="alert alert-danger">{{ error }}</div>

                <button type="submit" class="btn btn-primary w-100">
                    Đăng Nhập
                </button>
            </form>
        </div>
    </div>
</template>

<script>
import NhanVienService from "@/services/nhanvien.service";

export default {
    name: "LoginForm",
    data() {
        return {
            loginData: {
                MaNhanVien: "",
                password: "",
            },
            error: null,
        };
    },
    methods: {
        async handleLogin() {
            this.error = null;
            try {
                // 1. Gửi dữ liệu đăng nhập
                const user = await NhanVienService.login(this.loginData);

                // 2. Lưu thông tin người dùng (ví dụ: token, user info) vào Local Storage
                localStorage.setItem('user', JSON.stringify(user));

                // 3. Chuyển hướng đến trang quản lý (ví dụ: Danh sách Độc Giả)
                this.$router.push({ name: 'docgia' });

            } catch (err) {
                // Lỗi 401/403 từ server (sai thông tin)
                console.error("Lỗi đăng nhập:", err);
                this.error = "Tên đăng nhập hoặc mật khẩu không đúng. Vui lòng thử lại.";
            }
        },
    },
};
</script>