<script setup lang="ts">
import type { PropType } from 'vue'

defineProps({
  isShow: {
    type: Boolean,
    default: false,
  },
  close: {
    type: Function as PropType<(payload: MouseEvent) => void>,
    default: () => {},
  },
});
</script>

<template>
  <Teleport to="body">
    <div class="modal__container" :style="[isShow ? 'display: flex' : 'display: none']">
      <div class="modal__dialog">
        <div class="modal__content">
          <div class="modal__header">
            <div
              class="close__modal_btn"
              @click="close"
            ></div>
          </div>
          <div class="modal__content_body">
            <slot></slot>
          </div>
          <div class="modal__content_footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped lang="sass">
.modal__container
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 100%
  overflow-x: hidden
  overflow-y: auto
  background-color: rgba(128, 128, 128, 0.5)
  align-items: center

  .modal__dialog
    display: flex
    align-items: center
    position: relative
    width: auto
    height: auto
    margin-right: auto
    margin-left: auto

    .modal__content
      display: flex
      flex-direction: column
      align-items: center
      height: 100%
      min-width: 350px
      padding: 20px
      background-color: var(--todo-white)
      border-radius: 6px

      .modal__header
        display: flex
        justify-content: end
        width: 100%

        .close__modal_btn
          display: block
          position: relative
          width: 30px
          height: 30px
          background-color: var(--todo-blue)
          cursor: pointer
          border-radius: 2px
          padding: 4px

        .close__modal_btn::before,
        .close__modal_btn::after
          content: ''
          position: absolute
          top: 17px
          display: block
          width: 30px
          height: 3px
          background: var(--todo-white)

        .close__modal_btn::before
          transform: rotate(45deg)

        .close__modal_btn::after
          transform: rotate(-45deg)

      .modal__content_body
        width: 100%
        margin-bottom: 40px
</style>
