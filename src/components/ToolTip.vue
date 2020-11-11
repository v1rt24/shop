<template>
  <transition-group
      tag="div"
      name="my-animation"
      class="toolTip"
  >
    <div
        class="toolTip__content"
        v-for="message of messages" :key="message.id"
        :class="message.nameClass"
    >
      <div class="content__text">
        <span>{{ message.text }}</span>
        <span class="checkSim">{{
            message.nameClass === 'error' ? '!'
                : message.nameClass === 'warning' ? '?'
                : message.nameClass === 'success' ? '✔'
                    : ''
          }}</span>
      </div>
      <div class="content__buttons" v-if="leftButton || rightButton">
        <button v-if="leftButton">{{ leftButton }}</button>
        <button v-if="rightButton">{{ rightButton }}</button>
      </div>
    </div>
  </transition-group>
</template>

<script>
export default {
  name: 'ToolTip',
  props: {
    messages: {
      type: Array,
      default: () => ([]),
    },
    leftButton: {
      type: String,
      default: '',
    },
    rightButton: {
      type: String,
      default: '',
    },
    timeout: {
      type: Number,
      default: 3000,
    },
  },
  methods: {
    hideToolTip () {
      if (this.messages.length) {
        setTimeout(() => {
          this.messages.splice(this.messages.length - 1, 1);
        }, this.timeout);
      }
    },
  },
  watch: {
    messages () {
      this.hideToolTip();
    },
  },
  mounted () {
    this.hideToolTip();
  },
};
</script>

<style lang="scss">
.toolTip {
  position: fixed;
  top: 50px;
  right: 16px;
  z-index: 10;

  &__content {
    color: white;
    height: 50px;
    background-color: #00a438;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    border-radius: 4px;
    margin-bottom: 16px;

    &.error {
      background-color: #ea4550;
    }

    &.warning {
      background-color: orange;
    }

    &.success {
      background-color: #00a438;
    }

    .checkSim {
      margin-left: 10px;
    }
  }
}

.my-animation {
  &-enter {
    transform: translateX(120px);
    opacity: 0;
  }

  &-enter-active {
    transition: .6s ease;
  }

  &-enter-to {
    opacity: 1;
  }

  &-leave {
    height: 50px;
    opacity: 1;
  }

  &-leave-active {
    transition: transform .6s ease, opacity .6s, height .6s .2s;
  }

  &-leave-to {
    height: 0;
    transform: translateX(120px);
    opacity: 0;
  }

  &-move {
    transition: transform .6s ease;
  }
}
</style>