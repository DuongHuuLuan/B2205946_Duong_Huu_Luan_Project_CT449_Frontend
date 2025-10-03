<!-- // File: src/views/nhaxuatban/NhaXuatBanList.vue
<template>
    <div class="container mt-4">
        <h2 class="mb-3">Danh sách Nhà Xuất Bản</h2>

        <router-link to="/nhaxuatban/add" class="btn btn-primary mb-3">
            Thêm Nhà Xuất Bản
        </router-link>

        <NhaXuatBanTable :nxbList="nxbList" @delete="deleteNXB" />

        <p v-if="nxbList.length === 0">Không có Nhà Xuất Bản nào.</p>
    </div>
</template>

<script>
import NhaXuatBanService from "@/services/nhaxuatban.service";
import NhaXuatBanTable from "@/components/nhaxuatban/NhaXuatBanTable.vue";
import Swal from "sweetalert2";

export default {
    name: "NhaXuatBanList",
    components: { NhaXuatBanTable },
    data() {
        return {
            nxbList: [],
        };
    },
    methods: {
        async loadNXB() {
            try {
                const data = await NhaXuatBanService.getAll();
                this.nxbList = data;
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi tải dữ liệu!',
                    text: 'Không thể tải danh sách Nhà Xuất Bản. Vui lòng kiểm tra Server!',
                });
                console.error(error);
            }
        },
        async deleteNXB(id) {
            const result = await Swal.fire({
                title: 'Xác nhận xóa?',
                text: "Bạn có chắc muốn xóa Nhà Xuất Bản này? Hành động này không thể hoàn tác!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Có, xóa!',
                cancelButtonText: 'Hủy'
            });

            if (result.isConfirmed) {
                try {
                    await NhaXuatBanService.delete(id);
                    this.nxbList = this.nxbList.filter((nxb) => nxb._id !== id);
                    Swal.fire(
                        'Đã xóa!',
                        'Nhà Xuất Bản đã được xóa thành công.',
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
        this.loadNXB();
    },
};
</script> -->

<template>
    <div class="container mt-4">
        <div class="card shadow-lg rounded border-0">
            <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                <h2 class="mb-0 fs-4 fw-bold">Danh sách Nhà Xuất Bản</h2>
                <router-link to="/nhaxuatban/add" class="btn btn-light btn-sm">
                    <i class="fas fa-plus me-1"></i> Thêm Nhà Xuất Bản
                </router-link>
            </div>
            <div class="card-body">
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="Tìm kiếm theo Tên Nhà Xuất Bản..."
                        v-model="searchQuery">
                    <button class="btn btn-outline-secondary" type="button"><i class="fas fa-search"></i></button>
                </div>
                <div v-if="loading" class="text-center my-4">
                    <div class="spinner-border text-primary" role="status"></div>
                    <p class="text-muted">Đang tải dữ liệu...</p>
                </div>
                <div v-else>
                    <NhaXuatBanTable :nxbList="filteredNxbList" @delete="deleteNXB" />
                    <p v-if="filteredNxbList.length === 0" class="text-center text-muted mt-3">Không có Nhà Xuất Bản
                        nào.</p>
                </div>
                <nav aria-label="Page navigation" class="mt-3" v-if="!loading && nxbList.length > 0">
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
import NhaXuatBanService from "@/services/nhaxuatban.service";
import NhaXuatBanTable from "@/components/nhaxuatban/NhaXuatBanTable.vue";
import Swal from "sweetalert2";

export default {
    name: "NhaXuatBanList",
    components: { NhaXuatBanTable },
    data() {
        return {
            nxbList: [],
            loading: true,
            searchQuery: "",
        };
    },
    computed: {
        filteredNxbList() {
            if (!this.searchQuery) return this.nxbList;
            const query = this.searchQuery.toLowerCase();
            return this.nxbList.filter(nxb =>
                nxb.TenNXB?.toLowerCase().includes(query) // Giả sử nxb có trường TenNXB
            );
        },
    },
    methods: {
        async loadNXB() {
            this.loading = true;
            try {
                this.nxbList = await NhaXuatBanService.getAll();
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi tải dữ liệu!',
                    text: 'Không thể tải danh sách Nhà Xuất Bản.',
                    confirmButtonColor: '#dc3545',
                });
                console.error(error);
            } finally {
                this.loading = false;
            }
        },
        async deleteNXB(id) {
            const result = await Swal.fire({
                title: 'Xác nhận xóa?',
                text: "Bạn có chắc muốn xóa Nhà Xuất Bản này? Hành động này không thể hoàn tác!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#dc3545',
                cancelButtonColor: '#6c757d',
                confirmButtonText: 'Có, xóa!',
                cancelButtonText: 'Hủy',
            });
            if (result.isConfirmed) {
                try {
                    await NhaXuatBanService.delete(id);
                    this.nxbList = this.nxbList.filter((nxb) => nxb._id !== id);
                    Swal.fire('Đã xóa!', 'Nhà Xuất Bản đã được xóa thành công.', 'success');
                } catch (error) {
                    Swal.fire('Lỗi!', 'Xóa thất bại. Vui lòng thử lại!', 'error');
                    console.error(error);
                }
            }
        },
    },
    mounted() {
        this.loadNXB();
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