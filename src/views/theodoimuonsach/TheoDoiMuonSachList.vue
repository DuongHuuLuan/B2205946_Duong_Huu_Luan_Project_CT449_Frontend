<!-- <template>
    <div class="container mt-4">
        <h2 class="mb-3">Danh sách Theo Dõi Mượn Sách</h2>

        <router-link to="/theodoimuonsach/add" class="btn btn-primary mb-3">
            Thêm Theo Dõi
        </router-link>

        <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>

        <table class="table table-striped table-hover">
            <thead>
                <tr>
                    <th>Mã Độc Giả</th>
                    <th>Mã Sách</th>
                    <th>Ngày Mượn</th>
                    <th>Ngày Trả</th>
                    <th>Trạng Thái</th>
                    <th>Hành động</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="td in tdList" :key="td._id">
                    <td>{{ td.MaDocGia }}</td>
                    <td>{{ td.MaSach }}</td>
                    <td>{{ formatDate(td.NgayMuon) }}</td>
                    <td>{{ td.NgayTra ? formatDate(td.NgayTra) : "Chưa trả" }}</td>
                    <td>
                        <span :class="statusClass(td.TrangThai)">
                            {{ td.TrangThai }}
                        </span>
                    </td>

                    <td>
                        <button v-if="td.TrangThai === 'Chờ duyệt'" class="btn btn-sm btn-success me-2"
                            @click="updateStatus(td._id, 'Đang mượn')">
                            Duyệt
                        </button>

                        <button v-if="td.TrangThai === 'Đang mượn' || td.TrangThai === 'Trễ hạn'"
                            class="btn btn-sm btn-info me-2" @click="updateStatus(td._id, 'Đã trả')">
                            Trả sách
                        </button>

                        <router-link :to="{ name: 'theodoimuonsach.edit', params: { id: td._id } }"
                            class="btn btn-warning btn-sm me-2">
                            Sửa
                        </router-link>
                        <button class="btn btn-danger btn-sm" @click="deleteTheoDoi(td._id)">Xóa</button>
                    </td>
                </tr>
                <tr v-if="tdList.length === 0">
                    <td colspan="6" class="text-center">Không có dữ liệu.</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import TheoDoiMuonSachService from "@/services/theodoimuonsach.service";
import { useAuthStore } from "@/stores/authStore";
import Swal from "sweetalert2";

export default {
    name: "TheoDoiMuonSachList",
    data() {
        return {
            tdList: [],
            errorMessage: "",
        };
    },

    setup() {
        const authStore = useAuthStore();
        return { authStore };
    },
    methods: {
        formatDate(date) {
            return new Date(date).toLocaleDateString("vi-VN");
        },
        statusClass(status) {
            switch (status) {
                case "Chờ duyệt":
                    return "badge bg-warning text-dark";
                case "Đang mượn":
                    return "badge bg-primary";
                case "Đã trả":
                    return "badge bg-success";
                case "Trễ hạn":
                    return "badge bg-danger";
                default:
                    return "badge bg-secondary";
            }
        },
        async loadData() {
            try {
                this.tdList = await TheoDoiMuonSachService.getAll();
            } catch (error) {
                this.errorMessage = "Không thể tải dữ liệu.";
                Swal.fire("Lỗi", "Không thể tải dữ liệu.", "error");
                console.error(error);
            }
        },
        async deleteTheoDoi(id) {
            const result = await Swal.fire({
                title: "Xác nhận",
                text: "Bạn có chắc muốn xóa bản ghi này?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Có, xóa",
                cancelButtonText: "Hủy",
            });

            if (result.isConfirmed) {
                try {
                    await TheoDoiMuonSachService.delete(id);
                    this.tdList = this.tdList.filter((td) => td._id !== id);
                    Swal.fire("Đã xóa!", "Bản ghi đã được xóa.", "success");
                } catch (error) {
                    this.errorMessage = "Xóa thất bại.";
                    Swal.fire("Lỗi", "Không thể xóa bản ghi.", "error");
                    console.error(error);
                }
            }
        },
        async updateStatus(id, newStatus) {
            try {

                const payload = {
                    TrangThai: newStatus,
                    MSNV: this.authStore.getMSNV
                };

                if (!payload.MSNV) {
                    throw new Error("Không thể xác định Mã Số Nhân Viên (MSNV).");
                }

                await TheoDoiMuonSachService.update(id, payload);
                this.loadData();
                Swal.fire("Thành công", `Cập nhật trạng thái thành "${newStatus}"`, "success");
            } catch (error) {
                Swal.fire("Lỗi", "Không thể cập nhật trạng thái.", "error");
                console.error(error);
            }
        }
    },
    mounted() {
        this.loadData();
    },
};
</script> -->
```vue
<template>
    <div class="container mt-4">
        <div class="card shadow-lg rounded border-0">
            <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                <h2 class="mb-0 fs-4 fw-bold">Danh sách Theo Dõi Mượn Sách</h2>
                <router-link to="/theodoimuonsach/add" class="btn btn-light btn-sm">
                    <i class="fas fa-plus me-1"></i> Thêm Theo Dõi
                </router-link>
            </div>
            <div class="card-body">
                <div v-if="errorMessage" class="alert alert-danger mb-3">{{ errorMessage }}</div>
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="Tìm kiếm theo Mã Độc Giả hoặc Mã Sách..."
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
                                <th class="text-center">Mã Sách</th>
                                <th class="text-center">Ngày Mượn</th>
                                <th class="text-center">Ngày Trả</th>
                                <th class="text-center">Trạng Thái</th>
                                <th class="text-center">Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="td in filteredTdList" :key="td._id">
                                <td class="text-center">{{ td.MaDocGia }}</td>
                                <td class="text-center">{{ td.MaSach }}</td>
                                <td class="text-center">{{ formatDate(td.NgayMuon) }}</td>
                                <td class="text-center">{{ td.NgayTra ? formatDate(td.NgayTra) : "Chưa trả" }}</td>
                                <td class="text-center">
                                    <span :class="statusClass(td.TrangThai)" class="badge rounded-pill px-3 py-2">
                                        {{ td.TrangThai }}
                                    </span>
                                </td>
                                <td class="text-center">
                                    <button v-if="td.TrangThai === 'Chờ duyệt'" class="btn btn-success btn-sm me-2"
                                        @click="updateStatus(td._id, 'Đang mượn')">
                                        <i class="fas fa-check me-1"></i> Duyệt
                                    </button>
                                    <button v-if="td.TrangThai === 'Đang mượn' || td.TrangThai === 'Trễ hạn'"
                                        class="btn btn-info btn-sm me-2" @click="updateStatus(td._id, 'Đã trả')">
                                        <i class="fas fa-undo me-1"></i> Trả sách
                                    </button>
                                    <router-link :to="{ name: 'theodoimuonsach.edit', params: { id: td._id } }"
                                        class="btn btn-warning btn-sm me-2">
                                        <i class="fas fa-edit"></i>
                                    </router-link>
                                    <button class="btn btn-danger btn-sm" @click="deleteTheoDoi(td._id)">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                            <tr v-if="filteredTdList.length === 0">
                                <td colspan="6" class="text-center text-muted">Không có dữ liệu.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <nav aria-label="Page navigation" class="mt-3" v-if="!loading && tdList.length > 0">
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
import TheoDoiMuonSachService from "@/services/theodoimuonsach.service";
import { useAuthStore } from "@/stores/authStore";
import Swal from "sweetalert2";

export default {
    name: "TheoDoiMuonSachList",
    data() {
        return {
            tdList: [],
            errorMessage: "",
            loading: true,
            searchQuery: "",
        };
    },
    setup() {
        const authStore = useAuthStore();
        return { authStore };
    },
    computed: {
        filteredTdList() {
            if (!this.searchQuery) return this.tdList;
            const query = this.searchQuery.toLowerCase();
            return this.tdList.filter(td =>
                td.MaDocGia.toLowerCase().includes(query) ||
                td.MaSach.toLowerCase().includes(query)
            );
        },
    },
    methods: {
        formatDate(date) {
            return new Date(date).toLocaleDateString("vi-VN");
        },
        statusClass(status) {
            switch (status) {
                case "Chờ duyệt": return "bg-warning text-dark";
                case "Đang mượn": return "bg-primary text-white";
                case "Đã trả": return "bg-success text-white";
                case "Trễ hạn": return "bg-danger text-white";
                default: return "bg-secondary text-white";
            }
        },
        async loadData() {
            this.loading = true;
            try {
                this.tdList = await TheoDoiMuonSachService.getAll();
            } catch (error) {
                this.errorMessage = "Không thể tải dữ liệu.";
                Swal.fire("Lỗi", "Không thể tải dữ liệu.", "error");
                console.error(error);
            } finally {
                this.loading = false;
            }
        },
        async deleteTheoDoi(id) {
            const result = await Swal.fire({
                title: "Xác nhận",
                text: "Bạn có chắc muốn xóa bản ghi này?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#dc3545",
                cancelButtonColor: "#6c757d",
                confirmButtonText: "Có, xóa",
                cancelButtonText: "Hủy",
            });
            if (result.isConfirmed) {
                try {
                    await TheoDoiMuonSachService.delete(id);
                    this.tdList = this.tdList.filter((td) => td._id !== id);
                    Swal.fire("Đã xóa!", "Bản ghi đã được xóa.", "success");
                } catch (error) {
                    this.errorMessage = "Xóa thất bại.";
                    Swal.fire("Lỗi", "Không thể xóa bản ghi.", "error");
                    console.error(error);
                }
            }
        },
        async updateStatus(id, newStatus) {
            try {
                const payload = {
                    TrangThai: newStatus,
                    MSNV: this.authStore.getMSNV,
                };
                if (!payload.MSNV) {
                    throw new Error("Không thể xác định Mã Số Nhân Viên (MSNV).");
                }
                await TheoDoiMuonSachService.update(id, payload);
                this.loadData();
                Swal.fire("Thành công", `Cập nhật trạng thái thành "${newStatus}"`, "success");
            } catch (error) {
                Swal.fire("Lỗi", "Không thể cập nhật trạng thái.", "error");
                console.error(error);
            }
        },
    },
    mounted() {
        this.loadData();
    },
};
</script>

<style scoped>
.badge {
    font-size: 0.9rem;
}

.table th,
.table td {
    vertical-align: middle;
}

.card-header {
    background-color: #e7f1ff;
}
</style>
```