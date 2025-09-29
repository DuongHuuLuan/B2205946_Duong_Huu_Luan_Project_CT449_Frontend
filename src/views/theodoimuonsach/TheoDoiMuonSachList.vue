<template>
    <div class="container mt-4">
        <h2 class="mb-3">Danh sách Theo Dõi Mượn Sách</h2>

        <router-link to="/theodoimuonsach/add" class="btn btn-primary mb-3">
            Thêm Theo Dõi
        </router-link>

        <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>

        <table class="table table-striped table-hover">
            <thead>
                <tr>
                    <th>Mã Độc Giả</th>
                    <th>Mã Sách</th>
                    <th>Ngày Mượn</th>
                    <th>Ngày Trả</th>
                    <th>Hành động</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="td in tdList" :key="td._id">
                    <td>{{ td.MaDocGia }}</td>
                    <td>{{ td.MaSach }}</td>
                    <td>{{ td.NgayMuon }}</td>
                    <td>{{ td.NgayTra || "Chưa trả" }}</td>
                    <td>
                        <router-link :to="{ name: 'theodoimuonsach.edit', params: { id: td._id } }"
                            class="btn btn-warning btn-sm me-2">
                            Sửa
                        </router-link>
                        <button class="btn btn-danger btn-sm" @click="deleteTheoDoi(td._id)">Xóa</button>
                    </td>
                </tr>
                <tr v-if="tdList.length === 0">
                    <td colspan="5" class="text-center">Không có dữ liệu.</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import TheoDoiMuonSachService from "@/services/theodoimuonsach.service";

export default {
    name: "TheoDoiMuonSachList",
    data() {
        return {
            tdList: [],
            errorMessage: "",
        };
    },
    methods: {
        async loadData() {
            try {
                this.tdList = await TheoDoiMuonSachService.getAll();
            } catch (error) {
                this.errorMessage = "Không thể tải dữ liệu.";
                console.error(error);
            }
        },
        async deleteTheoDoi(id) {
            if (confirm("Bạn có chắc muốn xóa bản ghi này?")) {
                try {
                    await TheoDoiMuonSachService.delete(id);
                    this.tdList = this.tdList.filter((td) => td._id !== id);
                } catch (error) {
                    this.errorMessage = "Xóa thất bại.";
                    console.error(error);
                }
            }
        },
    },
    mounted() {
        this.loadData();
    },
};
</script>
