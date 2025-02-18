<template>
  <div class="home-container">
    <div class="content">
      <h1 class="title">Home Page</h1>
      <p class="welcome-text">Welcome to the home page!</p>
    </div>
    <div class="nav-list">
      <a href="#" class="nav-item" v-for="item in navItems" :key="item">{{ item }}</a>
    </div>
  </div>
</template>

<script setup lang="ts">
const navItems = ['js', 'TS', 'css', 'html', 'vue', 'react', 'nestjs', 'JAVA']
</script>

<style scoped>
.home-container {
  min-height: 100vh;
  background-color: #1a1a1a;
  color: #ffffff;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.content {
  text-align: center;
  margin-bottom: 2rem;
}

.title {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.welcome-text {
  font-size: 1.2rem;
  color: #cccccc;
}

.nav-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.nav-item {
  color: #ffffff;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.nav-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
</style>
