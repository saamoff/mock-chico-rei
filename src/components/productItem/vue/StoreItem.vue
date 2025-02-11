<script lang="ts">
export default {
  name: 'StoreItem',
  props: {
    showTextArea: {
      type: Boolean,
      required: true,
    },
    imgCategory: {
      type: String as () => 'Mugs' | 'Shirts' | 'Jumpers',
      required: true,
    }
  },
  data() {
    return {
      categories: {
        Mugs: {
          img1: this.getImageUrl('5854/89e966a0-7a3a-11ed-b298-055022bd8c87'),
          img2: this.getImageUrl('5854/89e966a2-7a3a-11ed-b298-055022bd8c87')
        },
        Shirts: {
          img1: this.getImageUrl('4204/76fb3a10-dca2-11ea-9694-0310712fe198'),
          img2: this.getImageUrl('4204/76fb1300-dca2-11ea-9694-0310712fe198')
        },
        Jumpers: {
          img1: this.getImageUrl('161843/5b9faa33-3ec3-11ef-8fd6-efcf2cdb2e22'),
          img2: this.getImageUrl('161843/4d329fb0-2fc9-11ef-bd4d-35a6c3259e2d')
        },
      } as Record<string, { img1: string; img2: string }>,
      imgSrc: '',
    }
  },
  computed: {
    currentImages() {
      return this.categories[this.imgCategory] || { img1: '', img2: '' };
    },
    imageSource(): string {
      return this.imgSrc || this.currentImages.img1;
    },
  },
  methods: {
    getImageUrl(id: string): string {
      return `https://chicorei.imgix.net/${id}.jpg?auto=compress,format&q=65&w=550&h=824&fit=crop&crop=top`
    },
    changeImage(newImg: string): void {
      this.imgSrc = newImg
    },
  },
  watch: {
    category: {
      immediate: true,
      handler(newCategory) {
        if (this.categories[newCategory]) {
          this.imgSrc = this.categories[newCategory].img1;
        }
      },
    },
  },
}
</script>

<template>
  <div class="store-item">
    <div class="store_item__box" @mouseover="changeImage(currentImages.img2)" @mouseleave="changeImage(currentImages.img1)">
      <img :src="imageSource" alt="Produto" draggable="false" />
    </div>
    <div v-if="showTextArea" class="store-item__text-area">
      <h2>Produto Lorem</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur obcaecati iusto
        temporibus aliquid similique vitae totam dolore dignissimos? Laudantium laboriosam quos nam
        ab quis, porro dolorem repudiandae laborum cumque odit.
      </p>
      <h2 class="store-item__text-area-price">R$19,90</h2>
    </div>
  </div>
</template>

<style lang="less">
@import '../less/store-item.less';
</style>
