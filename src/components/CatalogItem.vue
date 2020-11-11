<template>
  <div class="catalogItem">
    <Popup
        v-if="isInfo"
        :name="product.name"
        left-button-title="Добавить в корзину"
        @closePopur="isInfo = false"
        @leftButtonAction="addToCart"
    >
      <img :src="require(`@/assets/images/${product.image}`)" class="catalogItem__img" :alt="product.name">
      <div>
        <p class="catalogItem__name">{{ product.name }}</p>
        <p class="catalogItem__price">Цена: {{ product.price }} ₽</p>
        <p class="catalogItem__price">{{ product.category }}</p>
      </div>
    </Popup>
    <img :src="require(`@/assets/images/${product.image}`)" class="catalogItem__img" :alt="product.name">
    <p class="catalogItem__name">{{ product.name }}</p>
    <p class="catalogItem__price">Цена: {{ product.price }} ₽</p>
    <button class="btn" @click="showPopupInfo">Посмотреть</button>
    <button
        class="catalogItem__addToCardBtn btn"
        @click="addToCart"
    >
      Добавить в корзину
    </button>
  </div>
</template>

<script>
import Popup from '@/components/Popup';

export default {
  name: 'CatalogItem',
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    isInfo: false,
  }),
  methods: {
    addToCart () {
      this.$emit('addToCart', this.product);
    },
    showPopupInfo () {
      this.isInfo = true;
    },
  },
  components: {Popup},
};
</script>

<style scoped>

</style>