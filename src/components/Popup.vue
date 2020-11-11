<template>
  <div class="popup">
    <div class="popup__header">
      <span>{{ name }}</span>
      <span class="popup__close" @click="closePopur">×</span>
    </div>
    <div class="popup__content">
      <slot></slot>
    </div>
    <div class="popup__footer">
      <button
          class="catalogItem__addToCardBtn btn"
          @click="$emit('leftButtonAction')"
      >
        {{ leftButtonTitle }}
      </button>
      <button class="btn" @click="closePopur">Закрыть</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'popup',
  props: {
    name: {
      type: String,
      default: 'Заголовок',
    },
    leftButtonTitle: {
      type: String,
      default: 'Кнопка',
    },
  },
  methods: {
    closePopur () {
      this.$emit('closePopur');
    },
  },
};
</script>

<style lang="scss">

.popup {
  position: fixed;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  width: 400px;
  background-color: white;
  box-shadow: 0 0 18px 0px rgba(0, 0, 0, .3);
  padding: 16px;
  z-index: 1000;

  &__header, &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__close {
    font-size: 50px;
    cursor: pointer;
  }

  &__content {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 15px;
  }
}

.btn {
  font-size: 12px;
  border: none;
  background-color: #efefef;
  padding: 10px 20px;
  border-radius: 4px;
  transition: 0.3s;
}

.btn:hover {
  background-color: #c3c3c3;
}

</style>