<template>
    <div class="container mt-4">
        <h2>Thêm Theo Dõi Mượn Sách</h2>
        <TheoDoiMuonSachForm :td="{}" @submit:td="createTheoDoi" />
        <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
    </div>
</template>

<script>
import TheoDoiMuonSachForm from "@/components/theodoimuonsach/TheoDoiMuonSachForm.vue";
import TheoDoiMuonSachService from "@/services/theodoimuonsach.service";

export default {
    name: "TheoDoiMuonSachAdd",
    components: { TheoDoiMuonSachForm },
    data() {
        return { errorMessage: "" };
    },
    methods: {
        async createTheoDoi(newTD) {
            try {
                await TheoDoiMuonSachService.create(newTD);
                this.$router.push({ name: "theodoimuonsach.list" });
            } catch (error) {
                this.errorMessage = "Thêm thất bại.";
                console.error(error);
            }
        },
    },
};
</script>
