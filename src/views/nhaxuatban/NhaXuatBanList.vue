// File: src/views/nhaxuatban/NhaXuatBanList.vue
<template>
    <div class="container mt-4">
        <h2 class="mb-3">Danh sách Nhà Xuất Bản</h2>

        <router-link to="/nhaxuatban/add" class="btn btn-primary mb-3">
            Thêm Nhà Xuất Bản
        </router-link>

        <NhaXuatBanTable :nxbList="nxbList" @delete="deleteNXB" />

        <p v-if="nxbList.length === 0">Không có Nhà Xuất Bản nào.</p>
    </div>
</template>

<script>
import NhaXuatBanService from "@/services/nhaxuatban.service";
import NhaXuatBanTable from "@/components/nhaxuatban/NhaXuatBanTable.vue";
import Swal from "sweetalert2"; // 👈 Import SweetAlert2

export default {
    name: "NhaXuatBanList",
    components: { NhaXuatBanTable },
    data() {
        return {
            nxbList: [],
            // Xóa errorMessage
        };
    },
    methods: {
        async loadNXB() {
            try {
                const data = await NhaXuatBanService.getAll();
                this.nxbList = data;
                // Xóa this.errorMessage = "";
            } catch (error) {
                // Thay thế errorMessage bằng Swal.fire hoặc chỉ console.error cho lỗi tải
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi tải dữ liệu!',
                    text: 'Không thể tải danh sách Nhà Xuất Bản. Vui lòng kiểm tra Server!',
                });
                console.error(error);
            }
        },
        async deleteNXB(id) {
            // Thay thế confirm() bằng Swal.fire() với cấu hình xác nhận
            const result = await Swal.fire({
                title: 'Xác nhận xóa?',
                text: "Bạn có chắc muốn xóa Nhà Xuất Bản này? Hành động này không thể hoàn tác!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Có, xóa!',
                cancelButtonText: 'Hủy'
            });

            if (result.isConfirmed) {
                try {
                    await NhaXuatBanService.delete(id);
                    // Lọc bằng nxb._id
                    this.nxbList = this.nxbList.filter((nxb) => nxb._id !== id);

                    // Thông báo xóa thành công
                    Swal.fire(
                        'Đã xóa!',
                        'Nhà Xuất Bản đã được xóa thành công.',
                        'success'
                    );
                } catch (error) {
                    // Thông báo xóa thất bại
                    Swal.fire(
                        'Lỗi!',
                        'Xóa thất bại. Vui lòng thử lại!',
                        'error'
                    );
                    console.error(error);
                }
            }
        },
    },
    mounted() {
        this.loadNXB();
    },
};
</script>