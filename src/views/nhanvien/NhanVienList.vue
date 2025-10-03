<!-- <template>
    <div class="container mt-4">
        <div class="row">
            <div class="col-md-12">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h3 class="fw-bold text-primary">Danh sách Nhân Viên</h3>
                    <RouterLink :to="{ name: 'nhanvien.add' }" class="btn btn-success">
                        <i class="fas fa-plus"></i> Thêm mới
                    </RouterLink>
                </div>
                <table class="table table-hover table-striped">
                    <thead>
                        <tr>
                            <th>MSNV</th>
                            <th>Họ Tên</th>
                            <th>Chức Vụ</th>
                            <th>Địa Chỉ</th>
                            <th>Số Điện Thoại</th>
                            <th>Thao Tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="nv in nhanVienList" :key="nv._id">
                            <td>{{ nv.MSNV }}</td>
                            <td>{{ nv.HoTenNV }}</td>
                            <td>{{ nv.ChucVu }}</td>
                            <td>{{ nv.DiaChi }}</td>
                            <td>{{ nv.SoDienThoai }}</td>
                            <td>
                                <RouterLink :to="{ name: 'nhanvien.edit', params: { id: nv._id } }"
                                    class="btn btn-warning btn-sm me-2">
                                    <i class="fas fa-edit"></i>
                                </RouterLink>
                                <button @click="deleteNhanVien(nv._id)" class="btn btn-danger btn-sm">
                                    <i class="fas fa-trash-alt"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import NhanVienService from "@/services/nhanvien.service";
import Swal from "sweetalert2";

export default {
    data() {
        return {
            nhanVienList: [],
        };
    },
    methods: {
        async loadNhanVien() {
            try {
                this.nhanVienList = await NhanVienService.getAll();
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi!',
                    text: 'Không thể tải danh sách nhân viên.',
                });
                console.error(error);
            }
        },
        async deleteNhanVien(id) {
            const result = await Swal.fire({
                title: 'Xác nhận xóa?',
                text: "Bạn có chắc muốn xóa nhân viên này? Hành động này không thể hoàn tác!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Có, xóa!',
                cancelButtonText: 'Hủy'
            });

            if (result.isConfirmed) {
                try {
                    await NhanVienService.delete(id);
                    this.nhanVienList = this.nhanVienList.filter((nv) => nv._id !== id);
                    Swal.fire('Đã xóa!', 'Nhân viên đã được xóa thành công.', 'success');
                } catch (error) {
                    Swal.fire('Lỗi!', 'Xóa thất bại. Vui lòng thử lại!', 'error');
                    console.error(error);
                }
            }
        },
    },
    created() {
        this.loadNhanVien();
    },
};
</script> -->
<template>
    <div class="container mt-4">
        <div class="card shadow-lg rounded border-0">
            <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                <h2 class="mb-0 fs-4 fw-bold">Danh sách Nhân Viên</h2>
                <RouterLink :to="{ name: 'nhanvien.add' }" class="btn btn-light btn-sm">
                    <i class="fas fa-plus me-1"></i> Thêm mới
                </RouterLink>
            </div>
            <div class="card-body">
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="Tìm kiếm theo Họ Tên hoặc MSNV..."
                        v-model="searchQuery">
                    <button class="btn btn-outline-secondary" type="button"><i class="fas fa-search"></i></button>
                </div>
                <div v-if="loading" class="text-center my-4">
                    <div class="spinner-border text-primary" role="status"></div>
                    <p class="text-muted">Đang tải dữ liệu...</p>
                </div>
                <div class="table-responsive" v-else>
                    <table class="table table-striped table-hover table-bordered">
                        <thead class="table-dark">
                            <tr>
                                <th class="text-center">MSNV</th>
                                <th class="text-center">Họ Tên</th>
                                <th class="text-center">Chức Vụ</th>
                                <th class="text-center">Địa Chỉ</th>
                                <th class="text-center">Số Điện Thoại</th>
                                <th class="text-center">Thao Tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="nv in filteredNhanVienList" :key="nv._id">
                                <td class="text-center">{{ nv.MSNV }}</td>
                                <td>{{ nv.HoTenNV }}</td>
                                <td class="text-center">{{ nv.ChucVu }}</td>
                                <td>{{ nv.DiaChi }}</td>
                                <td class="text-center">{{ nv.SoDienThoai }}</td>
                                <td class="text-center">
                                    <RouterLink :to="{ name: 'nhanvien.edit', params: { id: nv._id } }"
                                        class="btn btn-warning btn-sm me-2">
                                        <i class="fas fa-edit"></i>
                                    </RouterLink>
                                    <button @click="deleteNhanVien(nv._id)" class="btn btn-danger btn-sm">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                            <tr v-if="filteredNhanVienList.length === 0">
                                <td colspan="6" class="text-center text-muted">Không có dữ liệu.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <nav aria-label="Page navigation" class="mt-3" v-if="!loading && nhanVienList.length > 0">
                    <ul class="pagination justify-content-center">
                        <li class="page-item disabled"><a class="page-link">Trước</a></li>
                        <li class="page-item active"><a class="page-link">1</a></li>
                        <li class="page-item"><a class="page-link">2</a></li>
                        <li class="page-item"><a class="page-link">Sau</a></li>
                    </ul>
                </nav>
            </div>
        </div>
    </div>
</template>

<script>
import NhanVienService from "@/services/nhanvien.service";
import Swal from "sweetalert2";

export default {
    data() {
        return {
            nhanVienList: [],
            loading: true,
            searchQuery: "",
        };
    },
    computed: {
        filteredNhanVienList() {
            if (!this.searchQuery) return this.nhanVienList;
            const query = this.searchQuery.toLowerCase();
            return this.nhanVienList.filter(nv =>
                nv.HoTenNV.toLowerCase().includes(query) ||
                nv.MSNV.toLowerCase().includes(query)
            );
        },
    },
    methods: {
        async loadNhanVien() {
            this.loading = true;
            try {
                this.nhanVienList = await NhanVienService.getAll();
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi!',
                    text: 'Không thể tải danh sách nhân viên.',
                    confirmButtonColor: '#dc3545',
                });
                console.error(error);
            } finally {
                this.loading = false;
            }
        },
        async deleteNhanVien(id) {
            const result = await Swal.fire({
                title: 'Xác nhận xóa?',
                text: "Bạn có chắc muốn xóa nhân viên này? Hành động này không thể hoàn tác!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#dc3545',
                cancelButtonColor: '#6c757d',
                confirmButtonText: 'Có, xóa!',
                cancelButtonText: 'Hủy',
            });
            if (result.isConfirmed) {
                try {
                    await NhanVienService.delete(id);
                    this.nhanVienList = this.nhanVienList.filter((nv) => nv._id !== id);
                    Swal.fire('Đã xóa!', 'Nhân viên đã được xóa thành công.', 'success');
                } catch (error) {
                    Swal.fire('Lỗi!', 'Xóa thất bại. Vui lòng thử lại!', 'error');
                    console.error(error);
                }
            }
        },
    },
    created() {
        this.loadNhanVien();
    },
};
</script>

<style scoped>
.table th,
.table td {
    vertical-align: middle;
}

.card-header {
    background-color: #e7f1ff;
}
</style>
