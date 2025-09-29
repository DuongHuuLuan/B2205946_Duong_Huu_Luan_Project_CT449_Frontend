<template>
    <div class="container mt-4">
        <h2 class="mb-3">Thêm Độc Giả</h2>

        <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
        <div v-if="successMessage" class="alert alert-success">{{ successMessage }}</div>

        <DocGiaForm :docGia="{}" @submit:docgia="addDocGia" />
    </div>
</template>

<script>
import DocGiaForm from "@/components/docgia/DocGiaForm.vue";
import DocGiaService from "@/services/docgia.service";

export default {
    name: "DocGiaAdd",
    components: { DocGiaForm },
    data() {
        return {
            errorMessage: "",
            successMessage: "",
        };
    },
    methods: {
        async addDocGia(newDocGia) {
            try {
                await DocGiaService.create(newDocGia);
                this.successMessage = "Thêm mới thành công!";
                setTimeout(() => this.$router.push({ name: "docgia.list" }), 1500);
            } catch (error) {
                this.errorMessage = "Thêm mới thất bại.";
                console.error(error);
            }
        },
    },
};
</script>
