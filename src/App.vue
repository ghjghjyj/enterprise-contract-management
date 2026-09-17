<template>
  <div class="app-shell">
    <el-menu router mode="horizontal" class="top-nav" :default-active="route.path">
      <el-menu-item index="/enterprise">企业管理</el-menu-item>
    </el-menu>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<style scoped>
.app-shell {
  min-height: 100vh;
  background: linear-gradient(180deg, #f7f9fc 0%, #eef3ff 100%);
}

.top-nav {
  padding: 0 24px;
  border-bottom: 1px solid #ebeef5;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
}
</style>
