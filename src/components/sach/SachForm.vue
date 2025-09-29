<template>
    <form @submit.prevent="submitSach">
        <div class="mb-3">
            <label for="MaSach" class="form-label">Mã Sách:</label>
            <input type="text" id="MaSach" class="form-control" v-model="sachLocal.MaSach" required />
        </div>

        <div class="mb-3">
            <label for="TenSach" class="form-label">Tên Sách:</label>
            <input type="text" id="TenSach" class="form-control" v-model="sachLocal.TenSach" required />
        </div>

        <div class="mb-3">
            <label for="DonGia" class="form-label">Đơn Giá:</label>
            <input type="number" id="DonGia" class="form-control" v-model.number="sachLocal.DonGia" required />
        </div>

        <div class="mb-3">
            <label for="SoQuyen" class="form-label">Số Quyển:</label>
            <input type="number" id="SoQuyen" class="form-control" v-model.number="sachLocal.SoQuyen" required />
        </div>

        <div class="mb-3">
            <label for="NamXuatBan" class="form-label">Năm Xuất Bản:</label>
            <input type="number" id="NamXuatBan" class="form-control" v-model.number="sachLocal.NamXuatBan" required />
        </div>

        <div class="mb-3">
            <label for="MaNXB" class="form-label">Mã NXB:</label>
            <input type="text" id="MaNXB" class="form-control" v-model="sachLocal.MaNXB" required />
        </div>

        <div class="mb-3">
            <label for="TacGia" class="form-label">Tác Giả / Nguồn Gốc:</label>
            <input type="text" id="TacGia" class="form-control" v-model="sachLocal.TacGia" />
        </div>

        <button type="submit" class="btn btn-success">
            <i class="fas fa-save"></i> {{ sachLocal._id ? "Cập Nhật" : "Lưu" }}
        </button>
    </form>
</template>

<script>
export default {
    name: "SachForm",
    props: { sach: { type: Object, required: true } },
    emits: ["submit:sach"],
    data() {
        return {
            sachLocal: {},
        };
    },
    watch: {
        sach: {
            handler(newVal) {
                this.sachLocal = newVal ? JSON.parse(JSON.stringify(newVal)) : {};
            },
            immediate: true,
            deep: true,
        },
    },
    methods: {
        submitSach() {
            if (!this.sachLocal.TenSach || !String(this.sachLocal.TenSach).trim()) {
                alert("Vui lòng nhập Tên Sách.");
                return;
            }
            const payload = { ...this.sachLocal };
            this.$emit("submit:sach", payload);
        },
    },
};
</script>
