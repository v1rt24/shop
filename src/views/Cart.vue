<template>
  <div class="cart">
    <router-link :to="{name: 'Catalog'}" class="catalog__linkToCart">
      Вернуться в каталог
    </router-link>
    <h1 class="h1">Корзина</h1>
    <p v-if="!cartData.length">В корзине ничего пока нет</p>
    <CartItem
        v-for="(cart, i) of cartData" :key="cart.article + counter"
        :cart="cart"
        @deleteFromCart="deleteFromCart(i)"
        @decrement="decrement(i)"
        @increment="increment(i)"
    />
    <div class="cart__total">
      <p class="cart__allSum">Всего:</p>
      <p>{{ allSum }} ₽</p>
    </div>
  </div>
</template>

<script>
import CartItem from '@/components/CartItem';
import { mapActions } from 'vuex';

export default {
  name: 'Cart',
  props: {
    cartData: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    counter: 0,
  }),
  methods: {
    ...mapActions(['deleteFromToCart', 'decrementEl', 'incrementEl']),
    deleteFromCart (index) {
      this.deleteFromToCart(index);
    },
    decrement (index) {
      this.decrementEl(index);
    },
    increment (index) {
      this.incrementEl(index);
    },
  },
  computed: {
    allSum () {
      return this.cartData.reduce((sum, item) => sum += item.price * item.quantity, 0);
    },
  },
  components: {
    CartItem,
  },
  activated () {
    this.counter++;
  },
};
</script>

<style scoped>

</style>