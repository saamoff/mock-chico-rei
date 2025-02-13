<template>
  <section class="checkout-item">
    <div class="checkout-item__title">
      <h1>Sua sacola</h1>
    </div>
    <div class="checkout-item__content">
      <span class="checkout-item__content-picture">
        <img src="../../../assets/landscape-placeholder.svg" alt="placeholder" />
      </span>
      <span class="checkout-item__content-info">
        <span class="checkout-item__content-text">
          <h2>Produto Lorem</h2>
          <p>R$19,90</p>
        </span>
        <span class="checkout-item__content-buttons">
          <button @click="removeItem">
            <img src="../../../assets/minus.svg" alt="remove" />
          </button>
          <span class="checkout-item__content-buttons-count">
            <p>{{ itemCount }}</p>
          </span>
          <button @click="addItem">
            <img src="../../../assets/plus.svg" alt="add" />
          </button>
        </span>
      </span>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      itemCount: 1,
    }
  },
  methods: {
    addItem() {
      this.itemCount += 1
    },
    removeItem() {
      if (this.itemCount > 1) {
        this.itemCount -= 1
      }
    },
  },
})
</script>

<style lang="less" scoped>
@import '../less/checkout-item.less';
</style>
