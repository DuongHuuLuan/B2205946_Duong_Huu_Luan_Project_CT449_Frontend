<template>
    <div class="container mt-4">
        <h2 class="mb-3">Danh sách Độc Giả</h2>

        <router-link to="/docgia/add" class="btn btn-primary mb-3">
            Thêm Độc Giả
        </router-link>

        <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>

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

export default {
    name: "DocGiaList",
    data() {
        return {
            docGiaList: [],
            errorMessage: "",
        };
    },
    methods: {
        async loadDocGia() {
            try {
                this.docGiaList = await DocGiaService.getAll();
            } catch (error) {
                this.errorMessage = "Không thể tải danh sách Độc Giả.";
                console.error(error);
            }
        },
        async deleteDocGia(id) {
            if (confirm("Bạn có chắc muốn xóa Độc Giả này?")) {
                try {
                    await DocGiaService.delete(id);
                    this.docGiaList = this.docGiaList.filter((dg) => dg._id !== id);
                } catch (error) {
                    this.errorMessage = "Xóa thất bại.";
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
