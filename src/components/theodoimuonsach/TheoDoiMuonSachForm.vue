<template>
    <form @submit.prevent="submitTheoDoi">
        <div class="mb-3">
            <label for="MaDocGia" class="form-label">Mã Độc Giả:</label>
            <select name="MaDocGia" id="MaDocGia" class="form-select" v-model="tdLocal.MaDocGia" required>
                <option value="" disabled>-- Chọn Mã Độc Giả --</option>
                <option v-for="dg in docGiaList" :key="dg._id" :value="dg.MaDocGia">
                    {{ dg.MaDocGia }} - {{ dg.HoLot }} {{ dg.Ten }}
                </option>
            </select>
        </div>

        <div class="mb-3">
            <label for="MaSach" class="form-label">Mã Sách:</label>
            <select id="MaSach" class="form-select" v-model="tdLocal.MaSach" required>
                <option value="" disabled>-- Chọn Mã Sách --</option>
                <option v-for="s in sachList" :key="s._id" :value="s.MaSach">
                    {{ s.MaSach }} - {{ s.TenSach }} (Còn: {{ s.SoQuyen }})
                </option>
            </select>
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
import Swal from "sweetalert2";

export default {
    name: "TheoDoiMuonSachForm",
    props: {
        td: { type: Object, required: true },
        docGiaList: { type: Array, default: () => [] },
        sachList: { type: Array, default: () => [] }
    },
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
                Swal.fire("Lỗi", "Vui lòng nhập đầy đủ Mã Độc Giả và Mã Sách.", "error");
                return;
            }

            if (
                this.tdLocal.NgayTra &&
                new Date(this.tdLocal.NgayTra) < new Date(this.tdLocal.NgayMuon)
            ) {
                Swal.fire("Lỗi", "Ngày trả không được nhỏ hơn ngày mượn.", "error");
                return;
            }

            const sach = this.sachList.find(s => s.MaSach === this.tdLocal.MaSach);
            if (sach && sach.SoQuyen <= 0) {
                Swal.fire("Thông báo", "Sách đã hết, không thể mượn.", "warning");
                return;
            }

            const payload = { ...this.tdLocal };
            this.$emit("submit:td", payload);

            Swal.fire("Thành công", "Lưu phiếu mượn thành công!", "success");
        },
    },
};
</script>
