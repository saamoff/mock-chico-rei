<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <body class="main-body">
    <header>
      <h1 class="main-title">
        Xicaras
      </h1>
    </header>
    <RouterView />
  </body>
</template>

<style scoped>
.main-body {
  text-align: center;
  padding: 3.125rem;
}
.main-title {
  color: white;
  margin-bottom: 2.5rem
};
</style>
