<template>
  <div class="catalog">
    <ToolTip
        :messages="messages"
        :timeout="10000"
    />

    <router-link :to="{name: 'Cart', params: {cartData: cart}}" class="catalog__linkToCart">
      Корзина: {{ cart.length }}
    </router-link>
    <h1 class="h1">Каталог</h1>
    <Select
        :select-data="categories"
        :select-title="selectTitle"
        @selectedOption="selectedOption"
    />
    <div class="filters">
      <div class="rangeSlider">
        <input type="range" min="0" max="1000" step="10" class="slider" v-model.number="minPrice"
               @change="setRangeSlider">
        <input type="range" min="0" max="1000" step="10" class="slider" v-model.number="maxPrice"
               @change="setRangeSlider">
      </div>
      <div class="rangeValues">
        <p>Минимальная цена: {{ minPrice }}</p>
        <p>Максимальная цена: {{ maxPrice }}</p>
      </div>
    </div>
    <div class="catalog__list">
      <CatalogItem
          v-for="product of filteredProducts" :key="product.article"
          :product="product"
          @addToCart="addToCart"
      />
    </div>
  </div>
</template>

<script>
import CatalogItem from '@/components/CatalogItem';
import Select from '@/components/Select';
import ToolTip from '@/components/ToolTip';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Catalog',
  data: () => ({
    categories: [
      {name: 'Все', value: 'all'},
      {name: 'Мужские', value: 'м'},
      {name: 'Женские', value: 'ж'},
    ],
    selectTitle: 'Все',
    sortedProducts: [],
    minPrice: 0,
    maxPrice: 1000,

    messages: [],
  }),
  methods: {
    ...mapActions(['getProductsFromApi', 'addToCartProduct']),
    async addToCart (product) {
      await this.addToCartProduct(product);

      this.messages.unshift({
        id: Date.now(),
        text: `Товар ${product.name} добавлен в корзину`,
        nameClass: 'success',
      });
    },
    setRangeSlider () {
      if (this.minPrice > this.maxPrice) {
        let tep = this.maxPrice;
        this.maxPrice = this.minPrice;
        this.minPrice = tep;
      }

      this.selectedOption();
    },
    selectedOption (option) {
      this.sortedProducts = [...this.products];

      this.sortedProducts = this.sortedProducts.filter(el => el.price >= this.minPrice && el.price <= this.maxPrice);
      this.selectTitle = 'Все';

      if (option) {
        this.selectTitle = option.name;
        this.sortedProducts = this.products.filter(el => el.category === option.name);
      }
    },
    sortProductsBySearchValue (val) {
      this.sortedProducts = [...this.products];

      if (val) {
        this.sortedProducts = this.sortedProducts.filter(el => el.name.toLowerCase().includes(val.toLowerCase()));
      }
      else {
        this.sortedProducts = this.products;
      }
    },
  },
  computed: {
    ...mapGetters(['products', 'cart', 'searchValue']),
    filteredProducts () {
      if (this.sortedProducts.length) {
        return this.sortedProducts;
      }
      else {
        return this.products;
      }
    },
  },
  components: {
    CatalogItem,
    Select,
    ToolTip,
  },
  watch: {
    searchValue () {
      this.sortProductsBySearchValue(this.searchValue);
    },
  },
  async mounted () {
    try {
      await this.getProductsFromApi();
    }
    catch (error) {
      console.log(error);
    }

    this.selectedOption();

    this.sortProductsBySearchValue();
  },
};
</script>

<style scoped>

</style>