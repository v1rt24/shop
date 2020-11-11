<template>
  <div class="mainPage">
    <router-link :to="{name: 'Catalog'}">Каталог</router-link>
  </div>
</template>

<script>
import Header from '@/components/Header';

export default {
  name: 'MainPage',
  components: {
    Header,
  },
};
</script>

<style scoped>

</style>