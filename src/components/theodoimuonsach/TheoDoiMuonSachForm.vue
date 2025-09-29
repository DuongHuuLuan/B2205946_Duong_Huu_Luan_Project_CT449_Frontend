<template>
    <form @submit.prevent="submitTheoDoi">
        <div class="mb-3">
            <label for="MaDocGia" class="form-label">Mã Độc Giả:</label>
            <input type="text" id="MaDocGia" class="form-control" v-model="tdLocal.MaDocGia" required />
        </div>

        <div class="mb-3">
            <label for="MaSach" class="form-label">Mã Sách:</label>
            <input type="text" id="MaSach" class="form-control" v-model="tdLocal.MaSach" required />
        </div>

        <div class="mb-3">
            <label for="NgayMuon" class="form-label">Ngày Mượn:</label>
            <input type="date" id="NgayMuon" class="form-control" v-model="tdLocal.NgayMuon" required />
        </div>

        <div class="mb-3">
            <label for="NgayTra" class="form-label">Ngày Trả:</label>
            <input type="date" id="NgayTra" class="form-control" v-model="tdLocal.NgayTra" />
        </div>

        <button type="submit" class="btn btn-success">
            <i class="fas fa-save"></i> {{ tdLocal._id ? "Cập Nhật" : "Lưu" }}
        </button>
    </form>
</template>

<script>
export default {
    name: "TheoDoiMuonSachForm",
    props: { td: { type: Object, required: true } },
    emits: ["submit:td"],
    data() {
        return {
            tdLocal: {},
        };
    },
    watch: {
        td: {
            handler(newVal) {
                this.tdLocal = newVal ? JSON.parse(JSON.stringify(newVal)) : {};
            },
            immediate: true,
            deep: true,
        },
    },
    methods: {
        submitTheoDoi() {
            if (!this.tdLocal.MaDocGia || !this.tdLocal.MaSach) {
                alert("Vui lòng nhập đầy đủ Mã Độc Giả và Mã Sách.");
                return;
            }
            const payload = { ...this.tdLocal };
            this.$emit("submit:td", payload);
        },
    },
};
</script>
