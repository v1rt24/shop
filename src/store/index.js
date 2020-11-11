import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const serverUrl = 'http://localhost:3000';

export default new Vuex.Store({
  state: {
    products: [],
    cart: [],
    searchValue: '',
  },
  getters: {
    products: state => state.products,
    cart: state => state.cart,
    searchValue: state => state.searchValue,
  },
  mutations: {
    setProducts (state, products) {
      state.products = products;
    },
    setCart (state, product) {
      const el = state.cart.find(item => item.article === product.article);
      if (el) {
        el.quantity++;
      }
      else {
        state.cart.push({...product, quantity: 1});
      }
    },
    removeFromCart (state, index) {
      state.cart.splice(index, 1);
    },
    decrement (state, index) {
      const el = state.cart[index].quantity;
      if (el > 1) {
        state.cart[index].quantity--;
      }
    },
    increment (state, index) {
      state.cart[index].quantity++;
    },
    setSearchValue (state, val) {
      state.searchValue = val;
    },
  },
  actions: {
    async getProductsFromApi ({commit}) {
      try {
        const res = await fetch(`${serverUrl}/products`);

        if (!res.ok) {
          await Promise.reject({
            status: res.status,
            statusText: `${res.statusText}: ${res.url}`,
          });
        }

        commit('setProducts', await res.json());
      }
      catch (error) {
        throw error;
      }
    },
    async addToCartProduct ({commit}, product) {
      commit('setCart', product);
      await Promise.resolve(product);
    },
    deleteFromToCart ({commit}, index) {
      commit('removeFromCart', index);
    },
    decrementEl ({commit}, index) {
      commit('decrement', index);
    },
    incrementEl ({commit}, index) {
      commit('increment', index);
    },
    setSearchValue ({commit}, val) {
      commit('setSearchValue', val);
    },
  },
  modules: {},
});
