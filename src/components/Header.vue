<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <RouterLink class="navbar-brand" to="/">Quản lý Mượn Sách</RouterLink>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav me-auto" v-if="authStore.isAuthenticated">
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/docgia">Độc giả</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/sach">Sách</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/theodoimuonsach">Theo dõi mượn</RouterLink>
                    </li>
                    <!-- <li class="nav-item">
                        <RouterLink class="nav-link" to="/nhanvien">Nhân viên</RouterLink>
                    </li> -->
                </ul>

                <ul class="navbar-nav ms-auto">
                    <template v-if="authStore.isAuthenticated">
                        <li class="nav-item">
                            <span class="nav-link text-info">
                                Xin chào, {{ authStore.user.HoTenNV || authStore.user.MSNV }}
                            </span>
                        </li>
                        <li class="nav-item">
                            <button @click="handleLogout" class="btn btn-outline-light btn-sm mt-1">
                                Đăng Xuất
                            </button>
                        </li>
                    </template>

                    <template v-else>
                        <li class="nav-item">
                            <RouterLink class="nav-link btn btn-outline-success text-white" to="/login">
                                Đăng Nhập
                            </RouterLink>
                        </li>
                    </template>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { RouterLink, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore"; // Đường dẫn đến file Pinia Store của bạn

// Khởi tạo router và store
const router = useRouter();
const authStore = useAuthStore();

/**
 * Xử lý hành động Đăng xuất.
 */
function handleLogout() {
    // 1. Gọi action logout từ Pinia Store
    authStore.logout();

    // 2. Điều hướng người dùng về trang Đăng nhập
    router.push({ name: 'login' });
}
</script>

<style scoped>
/* Tùy chỉnh nhỏ để nút đăng xuất trông đẹp hơn */
.btn-outline-light.btn-sm {
    line-height: 1.5;
    padding: .25rem .5rem;
}

.text-info {
    font-weight: 600;
}
</style>