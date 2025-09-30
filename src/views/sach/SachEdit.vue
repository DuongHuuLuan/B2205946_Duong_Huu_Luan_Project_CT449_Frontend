<template>
    <div class="container mt-4">
        <h2 class="mb-3">Cập Nhật Sách</h2>

        <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
        <div v-if="successMessage" class="alert alert-success">{{ successMessage }}</div>

        <!-- Truyền cả sach + nxbList xuống form -->
        <SachForm v-if="sach" :sach="sach" :nxbList="nxbList" @submit:sach="updateSach" />
        <p v-else>Đang tải dữ liệu...</p>
    </div>
</template>

<script>
import SachForm from "@/components/sach/SachForm.vue";
import SachService from "@/services/sach.service";
import NxbService from "@/services/nhaxuatban.service";

export default {
    name: "SachEdit",
    components: { SachForm },
    data() {
        return {
            sach: null,       // dữ liệu sách cũ
            nxbList: [],      // danh sách nhà xuất bản
            errorMessage: "",
            successMessage: "",
        };
    },
    methods: {
        async loadData() {
            try {
                // lấy dữ liệu sách cũ
                this.sach = await SachService.get(this.$route.params.id);

                // load danh sách NXB
                this.nxbList = await NxbService.getAll();
            } catch (error) {
                this.errorMessage = "Không thể tải dữ liệu.";
                console.error(error);
            }
        },
        async updateSach(updatedSach) {
            try {
                await SachService.update(this.$route.params.id, updatedSach);
                this.successMessage = "Cập nhật thành công!";
                setTimeout(() => this.$router.push({ name: "sach.list" }), 1500);
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
