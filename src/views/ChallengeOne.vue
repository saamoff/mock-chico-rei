<script lang="ts">
import StoreItem from '../components/productItem/vue/StoreItem.vue'
export default {
  components: { StoreItem },
  data() {
    return {
      items: Array.from({ length: 21 }, (_, i) => ({ id: i + 1, name: `Item ${i + 1}` })),
    }
  },
}
</script>

<template>
  <h1 style="color: white; padding-bottom: 3.125rem; text-align: center">Xicaras</h1>
  <div class="items-container">
    <StoreItem
      :imgCategory="'Mugs'"
      :showTextArea="true"
      v-for="item in items"
      :key="item.id"
      :item="item"
    />
  </div>
</template>

<style scoped>
@import '../components/productContent/less/product-content.less';
</style>
