// File: src/views/nhaxuatban/NhaXuatBanList.vue (ĐÃ SỬA)

<template>
    <div class="container mt-4">
        <h2 class="mb-3">Danh sách Nhà Xuất Bản</h2>

        <router-link to="/nhaxuatban/add" class="btn btn-primary mb-3">
            Thêm Nhà Xuất Bản
        </router-link>

        <div v-if="errorMessage" class="alert alert-danger" role="alert">{{ errorMessage }}</div>

        <NhaXuatBanTable :nxbList="nxbList" @delete="deleteNXB" />

        <p v-if="nxbList.length === 0 && !errorMessage">Không có Nhà Xuất Bản nào.</p>
    </div>
</template>

<script>
import NhaXuatBanService from "@/services/nhaxuatban.service";
import NhaXuatBanTable from "@/components/nhaxuatban/NhaXuatBanTable.vue";
export default {
    name: "NhaXuatBanList",
    components: { NhaXuatBanTable /*, NhaXuatBanForm */ },
    data() {
        return {
            nxbList: [],
            errorMessage: "",
        };
    },
    methods: {
        async loadNXB() {
            try {
                const data = await NhaXuatBanService.getAll();
                this.nxbList = data;
                this.errorMessage = "";
            } catch (error) {
                this.errorMessage = "Không thể tải danh sách Nhà Xuất Bản. Vui lòng kiểm tra Server!";
                console.error(error);
            }
        },
        async deleteNXB(id) {
            if (confirm("Bạn có chắc muốn xóa Nhà Xuất Bản này?")) {
                try {
                    await NhaXuatBanService.delete(id);
                    // LỖI ĐÃ SỬA: Lọc bằng nxb._id
                    this.nxbList = this.nxbList.filter((nxb) => nxb._id !== id);
                    this.errorMessage = "Xóa thành công!";
                    setTimeout(() => (this.errorMessage = ""), 3000);
                } catch (error) {
                    this.errorMessage = "Xóa thất bại. Vui lòng thử lại!";
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