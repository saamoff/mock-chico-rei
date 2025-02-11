<template>
  <div class="items-container">
    <StoreItem :imgCategory="'Mugs'" :showTextArea="false" v-for="item in items" :key="item.id" :item="item" />
  </div>
</template>

<script lang="ts">
import StoreItem from '../../productItem/vue/StoreItem.vue'
export default {
  components: { StoreItem },
  data() {
    return {
      items: Array.from({ length: 21 }, (_, i) => ({ id: i + 1, name: `Item ${i + 1}` })),
    }
  },
}
</script>

<style scoped>
@import "../less/product-content.less"
</style>