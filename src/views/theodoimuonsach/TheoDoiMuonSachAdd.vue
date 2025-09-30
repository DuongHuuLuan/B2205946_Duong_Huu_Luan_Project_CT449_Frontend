<template>
    <div class="container mt-4">
        <h2>Thêm Theo Dõi Mượn Sách</h2>

        <TheoDoiMuonSachForm :td="{}" :docGiaList="docGiaList" :sachList="sachList" @submit:td="createTheoDoi" />

        <div v-if="errorMessage" class="alert alert-danger mt-3">
            {{ errorMessage }}
        </div>
    </div>
</template>

<script>
import TheoDoiMuonSachForm from "@/components/theodoimuonsach/TheoDoiMuonSachForm.vue";
import TheoDoiMuonSachService from "@/services/theodoimuonsach.service";

// import service lấy dữ liệu độc giả và sách
import DocGiaService from "@/services/docgia.service";
import SachService from "@/services/sach.service";

export default {
    name: "TheoDoiMuonSachAdd",
    components: { TheoDoiMuonSachForm },
    data() {
        return {
            errorMessage: "",
            docGiaList: [],
            sachList: [],
        };
    },
    async created() {
        try {
            this.docGiaList = await DocGiaService.getAll();
            this.sachList = await SachService.getAll();
        } catch (error) {
            console.error("Lỗi khi tải dữ liệu:", error);
            this.errorMessage = "Không thể tải danh sách độc giả hoặc sách.";
        }
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
