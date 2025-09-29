<template>
    <div class="container mt-4">
        <h2 class="mb-3">Cập Nhật Nhà Xuất Bản</h2>

        <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
        <div v-if="successMessage" class="alert alert-success">{{ successMessage }}</div>

        <NhaXuatBanForm v-if="nxb" :nxb="nxb" @submit:nxb="updateNXB" />
        <p v-else>Đang tải dữ liệu...</p>
    </div>
</template>

<script>
import NhaXuatBanForm from '@/components/nhaxuatban/NhaXuatBanForm.vue';
import NhaXuatBanService from '@/services/nhaxuatban.service';

export default {
    name: "NhaXuatBanEdit",
    components: { NhaXuatBanForm },
    data() {
        return {
            nxb: null,
            errorMessage: "",
            successMessage: "",
        };
    },
    methods: {
        async loadNXB() {
            try {
                const id = this.$route.params.id;
                this.nxb = await NhaXuatBanService.get(id);
            } catch (error) {
                this.errorMessage = "Không thể tải dữ liệu Nhà Xuất Bản.";
                console.error(error);
            }
        },
        async updateNXB(updatedNXB) {
            try {
                await NhaXuatBanService.update(this.$route.params.id, updatedNXB);
                this.successMessage = "Cập nhật thành công!";
                setTimeout(() => this.$router.push({ name: "nxb.list" }), 1500);
            } catch (error) {
                this.errorMessage = "Cập nhật thất bại. Vui lòng thử lại!";
                console.error(error);
            }
        },
    },
    mounted() {
        this.loadNXB();
    }
};
</script>