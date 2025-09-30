<template>
    <div class="container mt-4">
        <h2 class="mb-3">Thêm Sách</h2>

        <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
        <div v-if="successMessage" class="alert alert-success">{{ successMessage }}</div>

        <SachForm :sach="{}" :nxbList="dsNXB" @submit:sach="addSach" />
    </div>
</template>

<script>
import SachForm from "@/components/sach/SachForm.vue";
import SachService from "@/services/sach.service";
import NxbService from "@/services/nhaxuatban.service";

export default {
    name: "SachAdd",
    components: { SachForm },
    data() {
        return {
            errorMessage: "",
            successMessage: "",
            dsNXB: []
        };
    },
    async mounted() {
        try {
            this.dsNXB = await NxbService.getAll();
        } catch (error) {
            console.error("Không load được NXB:", error);
        }
    },
    methods: {
        async addSach(newSach) {
            try {
                await SachService.create(newSach);
                this.successMessage = "Thêm mới thành công!";
                setTimeout(() => this.$router.push({ name: "sach.list" }), 1500);
            } catch (error) {
                this.errorMessage = "Thêm mới thất bại.";
                console.error(error);
            }
        }
    }
};
</script>
