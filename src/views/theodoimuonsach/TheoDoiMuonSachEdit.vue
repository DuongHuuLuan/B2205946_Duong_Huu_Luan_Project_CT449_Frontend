<template>
    <div class="container mt-4">
        <h2>Cập Nhật Theo Dõi Mượn Sách</h2>

        <TheoDoiMuonSachForm v-if="td" :td="td" @submit:td="updateTheoDoi" />
        <p v-else>Đang tải dữ liệu...</p>

        <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
        <div v-if="successMessage" class="alert alert-success">{{ successMessage }}</div>
    </div>
</template>

<script>
import TheoDoiMuonSachForm from "@/components/theodoimuonsach/TheoDoiMuonSachForm.vue";
import TheoDoiMuonSachService from "@/services/theodoimuonsach.service";

export default {
    name: "TheoDoiMuonSachEdit",
    components: { TheoDoiMuonSachForm },
    data() {
        return {
            td: null,
            errorMessage: "",
            successMessage: "",
        };
    },
    methods: {
        async loadData() {
            try {
                const id = this.$route.params.id;
                this.td = await TheoDoiMuonSachService.get(id);
            } catch (error) {
                this.errorMessage = "Không thể tải dữ liệu.";
            }
        },
        async updateTheoDoi(updatedTD) {
            try {
                await TheoDoiMuonSachService.update(this.$route.params.id, updatedTD);
                this.successMessage = "Cập nhật thành công!";
                setTimeout(() => this.$router.push({ name: "theodoimuonsach.list" }), 1500);
            } catch (error) {
                this.errorMessage = "Cập nhật thất bại.";
            }
        },
    },
    mounted() {
        this.loadData();
    },
};
</script>
