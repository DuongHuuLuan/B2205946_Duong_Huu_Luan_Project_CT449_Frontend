<!-- // File: src/views/docgia/DocGiaList.vue
<template>
    <div class="container mt-4">
        <h2 class="mb-3">Danh sách Độc Giả</h2>

        <router-link to="/docgia/add" class="btn btn-primary mb-3">
            Thêm Độc Giả
        </router-link>

        <table class="table table-striped table-hover">
            <thead>
                <tr>
                    <th>Mã Độc Giả</th>
                    <th>Họ Lót</th>
                    <th>Tên</th>
                    <th>Ngày Sinh</th>
                    <th>Phái</th>
                    <th>Địa Chỉ</th>
                    <th>Điện Thoại</th>
                    <th>Hành động</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="dg in docGiaList" :key="dg._id">
                    <td>{{ dg.MaDocGia || dg._id }}</td>
                    <td>{{ dg.HoLot }}</td>
                    <td>{{ dg.Ten }}</td>
                    <td>{{ new Date(dg.NgaySinh).toLocaleDateString() }}</td>
                    <td>{{ dg.Phai }}</td>
                    <td>{{ dg.DiaChi }}</td>
                    <td>{{ dg.DienThoai }}</td>
                    <td>
                        <router-link :to="{ name: 'docgia.edit', params: { id: dg._id } }"
                            class="btn btn-warning btn-sm me-2">
                            Sửa
                        </router-link>
                        <button class="btn btn-danger btn-sm" @click="deleteDocGia(dg._id)">
                            Xóa
                        </button>
                    </td>
                </tr>
                <tr v-if="docGiaList.length === 0">
                    <td colspan="8" class="text-center">Không có dữ liệu.</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import DocGiaService from "@/services/docgia.service";
import Swal from "sweetalert2";

export default {
    name: "DocGiaList",
    data() {
        return {
            docGiaList: [],
        };
    },
    methods: {
        async loadDocGia() {
            try {
                this.docGiaList = await DocGiaService.getAll();
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi tải dữ liệu!',
                    text: 'Không thể tải danh sách Độc Giả. Vui lòng kiểm tra Server!',
                });
                console.error(error);
            }
        },
        async deleteDocGia(id) {
            const result = await Swal.fire({
                title: 'Xác nhận xóa?',
                text: "Bạn có chắc muốn xóa Độc Giả này? Hành động này không thể hoàn tác!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Có, xóa!',
                cancelButtonText: 'Hủy'
            });

            if (result.isConfirmed) {
                try {
                    await DocGiaService.delete(id);
                    this.docGiaList = this.docGiaList.filter((dg) => dg._id !== id);
                    Swal.fire(
                        'Đã xóa!',
                        'Độc Giả đã được xóa thành công.',
                        'success'
                    );
                } catch (error) {
                    Swal.fire(
                        'Lỗi!',
                        'Xóa thất bại. Vui lòng thử lại!',
                        'error'
                    );
                    console.error(error);
                }
            }
        },
    },
    mounted() {
        this.loadDocGia();
    },
};
</script> -->

<template>
    <div class="container mt-4">
        <div class="card shadow-lg rounded border-0">
            <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                <h2 class="mb-0 fs-4 fw-bold">Danh sách Độc Giả</h2>
                <router-link to="/docgia/add" class="btn btn-light btn-sm">
                    <i class="fas fa-plus me-1"></i> Thêm Độc Giả
                </router-link>
            </div>
            <div class="card-body">
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="Tìm kiếm theo Tên hoặc Mã Độc Giả..."
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
                                <th class="text-center">Mã Độc Giả</th>
                                <th class="text-center">Họ Lót</th>
                                <th class="text-center">Tên</th>
                                <th class="text-center">Ngày Sinh</th>
                                <th class="text-center">Phái</th>
                                <th class="text-center">Địa Chỉ</th>
                                <th class="text-center">Điện Thoại</th>
                                <th class="text-center">Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="dg in filteredDocGiaList" :key="dg._id">
                                <td class="text-center">{{ dg.MaDocGia || dg._id }}</td>
                                <td>{{ dg.HoLot }}</td>
                                <td>{{ dg.Ten }}</td>
                                <td class="text-center">{{ new Date(dg.NgaySinh).toLocaleDateString() }}</td>
                                <td class="text-center">{{ dg.Phai }}</td>
                                <td>{{ dg.DiaChi }}</td>
                                <td class="text-center">{{ dg.DienThoai }}</td>
                                <td class="text-center">
                                    <router-link :to="{ name: 'docgia.edit', params: { id: dg._id } }"
                                        class="btn btn-warning btn-sm me-2">
                                        <i class="fas fa-edit"></i>
                                    </router-link>
                                    <button class="btn btn-danger btn-sm" @click="deleteDocGia(dg._id)">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                            <tr v-if="filteredDocGiaList.length === 0">
                                <td colspan="8" class="text-center text-muted">Không có dữ liệu.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <nav aria-label="Page navigation" class="mt-3" v-if="!loading && docGiaList.length > 0">
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
import DocGiaService from "@/services/docgia.service";
import Swal from "sweetalert2";

export default {
    name: "DocGiaList",
    data() {
        return {
            docGiaList: [],
            loading: true,
            searchQuery: "",
        };
    },
    computed: {
        filteredDocGiaList() {
            if (!this.searchQuery) return this.docGiaList;
            const query = this.searchQuery.toLowerCase();
            return this.docGiaList.filter(dg =>
                dg.Ten.toLowerCase().includes(query) ||
                (dg.MaDocGia || dg._id).toLowerCase().includes(query)
            );
        },
    },
    methods: {
        async loadDocGia() {
            this.loading = true;
            try {
                this.docGiaList = await DocGiaService.getAll();
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi tải dữ liệu!',
                    text: 'Không thể tải danh sách Độc Giả.',
                    confirmButtonColor: '#dc3545',
                });
                console.error(error);
            } finally {
                this.loading = false;
            }
        },
        async deleteDocGia(id) {
            const result = await Swal.fire({
                title: 'Xác nhận xóa?',
                text: "Bạn có chắc muốn xóa Độc Giả này? Hành động này không thể hoàn tác!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#dc3545',
                cancelButtonColor: '#6c757d',
                confirmButtonText: 'Có, xóa!',
                cancelButtonText: 'Hủy',
            });
            if (result.isConfirmed) {
                try {
                    await DocGiaService.delete(id);
                    this.docGiaList = this.docGiaList.filter((dg) => dg._id !== id);
                    Swal.fire('Đã xóa!', 'Độc Giả đã được xóa thành công.', 'success');
                } catch (error) {
                    Swal.fire('Lỗi!', 'Xóa thất bại. Vui lòng thử lại!', 'error');
                    console.error(error);
                }
            }
        },
    },
    mounted() {
        this.loadDocGia();
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