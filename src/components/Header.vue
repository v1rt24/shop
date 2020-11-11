<template>
  <div class="header">
    <router-link :to="{name: 'Home'}">
      <img src="../assets/logo.png" alt="logo">
    </router-link>
    <input
        type="search"
        class="search"
        v-model="searchValue"
        @keyup.enter="sendSearch"
    >
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Header',
  data: () => ({
    searchValue: '',
  }),
  methods: {
    ...mapActions(['setSearchValue']),
    sendSearch () {
      this.setSearchValue(this.searchValue);
      this.$router.push(
          {name: 'Catalog'},
      );
      this.searchValue = '';
    },
  },
};
</script>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #00a438;
  padding: 16px;
  margin-bottom: 50px;

  img {
    width: 50px;
  }

  .search {
    padding: 16px;
    border: none;
  }
}
</style>