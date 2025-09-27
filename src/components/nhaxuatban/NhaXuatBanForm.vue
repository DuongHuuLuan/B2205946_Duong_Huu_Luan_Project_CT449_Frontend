<template>
    <form @submit.prevent="submitNXB">
        <div class="mb-3">
            <label for="TenNXB" class="form-label">Tên Nhà Xuất Bản:</label>
            <input type="text" id="TenNXB" class="form-control" v-model="nxbLocal.TenNXB" required />
        </div>

        <div class="mb-3">
            <label for="DiaChi" class="form-label">Địa Chỉ:</label>
            <input type="text" id="DiaChi" class="form-control" v-model="nxbLocal.DiaChi" />
        </div>

        <button type="submit" class="btn btn-success">
            <i class="fas fa-save"></i> {{ nxbLocal._id ? 'Cập Nhật' : 'Lưu' }}
        </button>
    </form>
</template>

<script>
export default {
    name: "NhaXuatBanForm",
    props: { nxb: { type: Object, required: true } },
    emits: ["submit:nxb"],
    data() { /* ... (Logic nxbLocal và watch đã được xây dựng trước đó) ... */ },
    methods: {
        submitNXB() {
            this.$emit("submit:nxb", this.nxbLocal);
        },
    },
};
</script>