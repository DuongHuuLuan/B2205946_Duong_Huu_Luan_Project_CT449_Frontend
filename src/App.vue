<script setup>
import Header from "@/components/Header.vue";
</script>

<template>
  <div id="app">
    <!-- Thanh header điều hướng -->
    <Header />

    <!-- Nội dung trang -->
    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>

<style>
.page {
  max-width: 400px;
  margin: auto;
}
</style>
