<template>
    <div class="login-container">
        <div class="card login-card shadow-lg p-4">
            <div class="card-body">
                <h3 class="card-title text-center mb-4 fw-bold text-primary">
                    Đăng nhập
                </h3>

                <div v-if="error" class="alert alert-danger text-center">
                    {{ error }}
                </div>

                <form @submit.prevent="handleLogin">
                    <div class="mb-3 input-group">
                        <span class="input-group-text">
                            <i class="fas fa-user"></i>
                        </span>
                        <input type="text" id="username" class="form-control" placeholder="Mã Nhân Viên"
                            v-model="loginData.MSNV" required />
                    </div>

                    <div class="mb-3 input-group">
                        <span class="input-group-text">
                            <i class="fas fa-lock"></i>
                        </span>
                        <input type="password" id="password" class="form-control" placeholder="Mật khẩu"
                            v-model="loginData.Password" required />
                    </div>

                    <button type="submit" class="btn btn-primary w-100 fw-semibold">
                        <i class="fas fa-sign-in-alt me-2"></i> Đăng Nhập
                    </button>
                </form>
                <p class="mt-3 text-center">
                    Chưa có tài khoản? <Router-link to="/register">Đăng ký ngay</Router-link>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import AuthService from "@/services/auth.service";
import { useAuthStore } from "@/stores/authStore";
import "@/assets/LoginForm.css";

export default {
    name: "LoginForm",
    data() {
        return {
            loginData: {
                MSNV: "",
                Password: "",
            },
            error: null,
        };
    },
    methods: {
        async handleLogin() {
            this.error = null;
            try {
                // Gọi API đăng nhập
                const response = await AuthService.login(this.loginData);

                // Lưu token
                AuthService.saveToken(response.token);

                // Lưu thông tin user vào Pinia Store
                const authStore = useAuthStore();
                authStore.setUser(response.user);

                // Chuyển hướng
                this.$router.push({ name: "home" });
            } catch (err) {
                console.error("Lỗi đăng nhập:", err);
                this.error =
                    err.response?.data?.message ||
                    "Tên đăng nhập hoặc mật khẩu không đúng. Vui lòng thử lại.";
            }
        },
    },
};
</script>
