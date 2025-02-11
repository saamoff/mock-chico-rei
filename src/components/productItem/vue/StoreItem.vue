<script lang="ts">
export default {
  data() {
    return {
      img1: this.getImageUrl('89e966a0-7a3a-11ed-b298-055022bd8c87'),
      img2: this.getImageUrl('89e966a2-7a3a-11ed-b298-055022bd8c87'),
      imgSrc: this.getImageUrl('89e966a0-7a3a-11ed-b298-055022bd8c87'),
    };
  },
  computed: {
    imageSource(): string {
      return this.imgSrc;
    }
  },
  methods: {
    getImageUrl(id: string): string {
      return `https://chicorei.imgix.net/5854/${id}.jpg?auto=compress,format&q=65&w=550&h=824&fit=crop&crop=top`;
    },
    changeImage(newImg: string): void {
      this.imgSrc = newImg;
    }
  },
};
</script>

<template>
  <div class="store-item">
    <div 
      class="store_item__box" 
      @mouseover="changeImage(img2)" 
      @mouseleave="changeImage(img1)"
    >
      <img :src="imageSource" alt="Produto" draggable="false" />
    </div>
    <div class="store-item__text-area">
      <h2>Produto Lorem</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur obcaecati iusto temporibus aliquid similique vitae totam dolore dignissimos? Laudantium laboriosam quos nam ab quis, porro dolorem repudiandae laborum cumque odit.
      </p>
      <h2 class="store-item__text-area-price">R$19,90</h2>
    </div>
  </div>
</template>

<style lang="less">
@import "../less/storeitem.less";
</style>
