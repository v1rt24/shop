<template>
  <div class="mainWrapper">
    <Header/>
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
import Header from '@/components/Header';

export default {
  name: 'App',
  components: {Header},
};
</script>

<style lang="scss">
@import "assets/scss/style";
</style>