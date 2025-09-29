<template>
    <div class="container mt-4">
        <h2 class="mb-3">Cập Nhật Sách</h2>

        <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
        <div v-if="successMessage" class="alert alert-success">{{ successMessage }}</div>

        <SachForm v-if="sach" :sach="sach" @submit:sach="updateSach" />
        <p v-else>Đang tải dữ liệu...</p>
    </div>
</template>

<script>
import SachForm from "@/components/sach/SachForm.vue";
import SachService from "@/services/sach.service";

export default {
    name: "SachEdit",
    components: { SachForm },
    data() {
        return {
            sach: null,
            errorMessage: "",
            successMessage: "",
        };
    },
    methods: {
        async loadSach() {
            try {
                this.sach = await SachService.get(this.$route.params.id);
            } catch (error) {
                this.errorMessage = "Không thể tải dữ liệu Sách.";
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
        this.loadSach();
    },
};
</script>
