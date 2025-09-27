import { createWebHistory, createRouter } from "vue-router";
import Login from "@/views/Login.vue";
import DocGiaList from "@/views/docgia/DocGiaList.vue";
import DocGiaAdd from "@/views/docgia/DocGiaAdd.vue";
import DocGiaEdit from "@/views/docgia/DocGiaEdit.vue";
import NhaXuatBanList from "@/views/nhaxuatban/NhaXuatBanList.vue";
import NhaXuatBanAdd from "@/views/nhaxuatban/NhaXuatBanAdd.vue";
import NhaXuatBanEdit from "@/views/nhaxuatban/NhaXuatBanEdit.vue";
const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  // Các routes độc giả
  {
    path: "/docgia",
    name: "docgia",
    component: DocGiaList,
    meta: { requireAuth: true },
  },
  {
    path: "/docgia/add",
    name: "docgia.add",
    component: DocGiaAdd,
    meta: { requiresAuth: true },
  },
  {
    path: "/docgia/:id",
    name: "docgia.edit",
    component: DocGiaEdit,
    props: true,
    meta: { requiresAuth: true },
  },
  // CÁC ROUTES NXB (Đã có)
  {
    path: "/nhaxuatban",
    name: "nxb.list",
    component: NhaXuatBanList,
    meta: { requiresAuth: true },
  },
  {
    path: "/nhaxuatban/add",
    name: "nxb.add",
    component: NhaXuatBanAdd,
    meta: { requiresAuth: true },
  },
  {
    path: "/nhaxuatban/:id",
    name: "nxb.edit",
    component: NhaXuatBanEdit,
    props: true,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
