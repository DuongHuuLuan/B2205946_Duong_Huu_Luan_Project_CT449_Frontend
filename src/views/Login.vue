<template>
    <div class="container">
        <div class="row justify-content-center pt-5">
            <div class="col-md-5 col-lg-4">
                <LoginForm />
            </div>
        </div>
    </div>
</template>

<script>
import LoginForm from "@/components/LoginForm.vue";

export default {
    name: "LoginView",
    components: { LoginForm },
    // Nếu đã đăng nhập, chuyển hướng người dùng khỏi trang Login
    created() {
        if (localStorage.getItem('user')) {
            this.$router.push({ name: 'docgia' });
        }
    }
};
</script>