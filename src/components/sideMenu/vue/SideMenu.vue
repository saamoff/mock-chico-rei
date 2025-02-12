<template>
  <header>
    <button @click="toggleMenu" class="menu-btn">
      <img src="../../../assets/burger-menu.svg" alt="open menu" />
    </button>
    <div v-if="isOpen" class="side-menu">
      <div class="side-menu__content">
        <h1>Menu</h1>
        <button @click="toggleMenu">
          <img src="../../../assets/close.svg" alt="close menu" />
        </button>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
export default {
  data() {
    return {
      isOpen: false,
    }
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen
    },
  },
}
</script>

<style lang="less" scoped>
@import '../less/side-menu.less';
</style>
