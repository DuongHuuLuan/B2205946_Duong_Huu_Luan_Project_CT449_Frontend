<template>
    <div class="container mt-4">
        <h2 class="mb-3">Cập Nhật Sách</h2>

        <SachForm v-if="sach" :sach="sach" :nxbList="nxbList" @submit:sach="updateSach" />
        <p v-else>Đang tải dữ liệu...</p>
    </div>
</template>

<script>
import SachForm from "@/components/sach/SachForm.vue";
import SachService from "@/services/sach.service";
import NxbService from "@/services/nhaxuatban.service";
import Swal from "sweetalert2";

export default {
    name: "SachEdit",
    components: { SachForm },
    data() {
        return {
            sach: null,
            nxbList: [],
        };
    },
    methods: {
        async loadData() {
            try {
                // 1. Tải danh sách Nhà Xuất Bản trước
                const resNxb = await NxbService.getAll();
                this.nxbList = resNxb.data || resNxb;

                // 2. Tải dữ liệu Sách
                const resSach = await SachService.get(this.$route.params.id);
                const dataSach = resSach.data || resSach;

                // 3. Chuẩn hóa MaNXB: Thay thế _id bằng MaNXB hiển thị
                const maNxbHienThi = this.nxbList.find(nxb => nxb._id === dataSach.MaNXB)?.MaNXB || dataSach.MaNXB;

                // 4. Cập nhật đối tượng sach với MaNXB đã chuẩn hóa
                this.sach = {
                    ...dataSach, // Giữ nguyên các trường khác
                    MaNXB: maNxbHienThi, // Gán Mã hiển thị cho form
                };
            } catch (error) {
                Swal.fire("Lỗi", "Không thể tải dữ liệu.", "error");
                console.error(error);
            }
        },
        async updateSach(updatedSach) {
            try {
                const res = await SachService.update(this.$route.params.id, updatedSach);
                Swal.fire("Thành công", res.message, "success");
                setTimeout(() => this.$router.push({ name: "sach.list" }), 1500);
            } catch (error) {
                Swal.fire("Lỗi", "Cập nhật thất bại.", "error");
                console.error(error);
            }
        },
    },
    mounted() {
        this.loadData();
    },
};
</script>