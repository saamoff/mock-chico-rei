<template>
  <div class="success-page">
    <h1>Seu pedido foi processado com sucesso!</h1>
    <p>Para ver os dados do seu pedido, acesse o console do navegador.</p>
    <FormButton class="success-page__button" @click="goBack"> Voltar </FormButton>
  </div>
</template>

<script lang="ts">
import FormButton from '../components/form/formButton/vue/FormButton.vue'
export default {
  components: {
    FormButton,
  },
  methods: {
    goBack() {
      this.$router.push('/form').then(() => {
        window.location.reload()
      })
    },
  },
}
</script>

<style lang="less" scoped>
.success-page {
  background: #0d0d0d;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    color: green;
  }

  p {
    color: white;
  }

  &__button {
    margin-top: 1.25rem;
    width: 12.5rem;
    height: 2.5rem;
    font-size: large;
    font-weight: bold;
    background: white;
    transition: all 0.3s ease;

    &:hover {
      background: gray;
    }
  }
}
</style>
