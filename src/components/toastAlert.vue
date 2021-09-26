<template>
  <div class="toast-wrapper" v-if="alert.message">
    <div
      class="toast-message"
      :class="alert.type === 'success' ? 'success-toast' : 'error-toast'"
    >
      <img
        v-if="alert.type === 'error'"
        src="https://s2.svgbox.net/hero-solid.svg?ic=exclamation-circle&color=faa017"
        width="20"
        height="20"
      />

      <img
        v-if="alert.type === 'success'"
        src="https://s2.svgbox.net/hero-outline.svg?ic=check-circle&color=2cb67d"
        width="20"
        height="20"
      />

      <p>{{ alert.message }}</p>

      <img
        src="https://s2.svgbox.net/hero-outline.svg?ic=x&color=000"
        width="18"
        height="18"
        class="pointer"
        @click="$emit('close')"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "ToastAlert",

  props: {
    alert: {
      type: Object,
      default() {
        return {
          message: "Welcome",
          type: "success",
        };
      },
    },
  },
};
</script>

<style scoped>
.toast-wrapper {
  position: absolute;
  padding: 7px;
  border-radius: 5px;
  background: #fff;
  top: 20%;
  left: 100%;
  transform: translateX(-115%);
  z-index: 10;
  animation: slide-in 0.7s ease-in-out;
}

.toast-message {
  padding: 10px;
  color: #113255;
  display: flex;
  align-items: center;
  white-space: nowrap;
}

.toast-message p {
  font-size: 0.9rem;
  margin: 0 15px;
}

.success-toast {
  border-left: 3.5px solid #2cb67d;
}

.error-toast {
  border-left: 3.5px solid #faa017;
}

.pointer {
  cursor: pointer;
}

@keyframes slide-in {
  from {
    transform: translateX(-15%);
  }
  to {
    transform: translateX(-115%);
  }
}
</style>
