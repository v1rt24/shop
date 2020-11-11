<template>
  <div class="selectWrapper">
    <p class="title" @click="showSelect = !showSelect">{{ selectTitle }}</p>
    <ul class="options" :class="{active: showSelect}">
      <li
          v-for="option of selectData" :key="option.value"
          @click="selectedActive(option)"
      >
        {{ option.name }}
      </li>
    </ul>
    <div class="closeBack" v-if="showSelect" @click="showSelect = !showSelect"></div>
  </div>
</template>

<script>
export default {
  name: 'Select',
  props: {
    selectData: {
      type: Array,
      default: () => ([]),
    },
    selectTitle: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    showSelect: false,
  }),
  methods: {
    selectedActive (option) {
      this.$emit('selectedOption', option);
      this.closeSelect();
    },
    closeSelect () {
      this.showSelect = false;
    },
  },
};
</script>

<style scoped>
.selectWrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 120px;
  cursor: pointer;
}

.title {
  position: relative;
  background-color: white;
  border: 1px solid #aeaeae;
  padding: 10px 20px;
  z-index: 2;
}

.options {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
  background-color: white;
  border: 1px solid #aeaeae;
  opacity: 0;
  visibility: hidden;
  overflow: auto;
  transition: .3s;
  z-index: 1;
}

.options.active {
  top: 45px;
  visibility: visible;
  opacity: 1;
}

.options li {
  list-style: none;
  padding: 10px 20px;
  transition: .3s;
}

.options li:hover {
  background-color: #ccc;
}

.options li:not(:last-child) {
  border-bottom: 1px solid #aeaeae;
}

.closeBack {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: transparent;
}
</style>