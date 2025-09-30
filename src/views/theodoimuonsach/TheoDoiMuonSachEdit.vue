<template>
    <div class="container mt-4">
        <h2>Cập Nhật Theo Dõi Mượn Sách</h2>

        <!-- Truyền đủ td + danh sách xuống form -->
        <TheoDoiMuonSachForm v-if="td" :td="td" :docGiaList="docGiaList" :sachList="sachList"
            @submit:td="updateTheoDoi" />
        <p v-else>Đang tải dữ liệu...</p>

        <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
        <div v-if="successMessage" class="alert alert-success">{{ successMessage }}</div>
    </div>
</template>

<script>
import TheoDoiMuonSachForm from "@/components/theodoimuonsach/TheoDoiMuonSachForm.vue";
import TheoDoiMuonSachService from "@/services/theodoimuonsach.service";
import DocGiaService from "@/services/docgia.service";
import SachService from "@/services/sach.service";

export default {
    name: "TheoDoiMuonSachEdit",
    components: { TheoDoiMuonSachForm },
    data() {
        return {
            td: null,              // dữ liệu cũ của bản ghi
            docGiaList: [],        // danh sách độc giả để select
            sachList: [],          // danh sách sách để select
            errorMessage: "",
            successMessage: "",
        };
    },
    methods: {
        async loadData() {
            try {
                const id = this.$route.params.id;
                const data = await TheoDoiMuonSachService.get(id);

                // Đồng bộ field đúng với form
                this.td = {
                    _id: data._id,
                    MaSach: data.MaSach || "",
                    MaDocGia: data.MaDocGia || "",
                    NgayMuon: data.NgayMuon ? data.NgayMuon.slice(0, 10) : "",
                    NgayTra: data.NgayTra ? data.NgayTra.slice(0, 10) : "",
                };

                // Load thêm danh sách độc giả và sách
                this.docGiaList = await DocGiaService.getAll();
                this.sachList = await SachService.getAll();
            } catch (error) {
                this.errorMessage = "Không thể tải dữ liệu.";
                console.error(error);
            }
        },
        async updateTheoDoi(updatedTD) {
            try {
                await TheoDoiMuonSachService.update(this.$route.params.id, updatedTD);
                this.successMessage = "Cập nhật thành công!";
                setTimeout(() => this.$router.push({ name: "theodoimuonsach.list" }), 1500);
            } catch (error) {
                this.errorMessage = "Cập nhật thất bại.";
                console.error(error);
            }
        },
    },
    mounted() {
        this.loadData();
    },
};
</script>
