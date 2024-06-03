<script setup lang="ts">
import { useTasksStore } from '@/stores/tasks'
import { onMounted } from 'vue'
import TaskItem from '@/components/TaskItem.vue'

const tasksStore = useTasksStore();

onMounted(async ()=>{
  await tasksStore.getTasks();
})
</script>

<template>
  <div class="tasks">
    <div class="tasks__header">
      <input type="text" class="tasks__header_search_input">
      <button  class="tasks__header_add_btn todo__btn">Добавить задачу</button>
    </div>
    <div class="tasks__list ">
      <template v-for="task in tasksStore.tasks" :key="task.id">
        <TaskItem :task="task"/>
      </template>
    </div>
  </div>
</template>

<style scoped lang="sass">
.tasks
  width: 100%
  max-width: 800px
  margin: 0 auto

  .tasks__header
    display: flex
    justify-content: space-between
    margin-bottom: 10px

    .tasks__header_search_input
      width: 280px


</style>