<template>
  <div class="cartItem">
    <img :src="require(`@/assets/images/${cart.image}`)" class="catalogItem__img" :alt="cart.name">
    <div class="cartItem__info">
      <p>Наименование: {{ cart.name }}</p>
      <p>Цена: {{ cart.price }}</p>
      <p>Артикул: {{ cart.article }}</p>
    </div>
    <div class="cartItem__quantity">
      <p>Количество:</p>
      <span>
        <span @click="decrement" class="cartItem__decrement">-</span>
        {{ cart.quantity }}
        <span @click="increment" class="cartItem__increment">+</span>
      </span>
    </div>
    <button class="btn" @click="deleteFromCart">Удалить</button>
  </div>
</template>

<script>
export default {
  name: 'CartItem',
  props: {
    cart: {
      type: Object,
      required: true,
    },
  },
  methods: {
    deleteFromCart () {
      this.$emit('deleteFromCart');
    },
    decrement () {
      this.$emit('decrement');
    },
    increment () {
      this.$emit('increment');
    },
  },
};
</script>

<style scoped>

</style>