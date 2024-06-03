<script setup lang="ts">

import { type PropType, reactive } from 'vue'
import type { Task } from '@/models/tasks'
import { useTasksStore } from '@/stores/tasks'

const props = defineProps({
  task: { type: Object as PropType<Task> },
});

const tasksStore = useTasksStore();

const localTask = reactive<Task>({ completed: false, description: '', dueDate: '', id: 0, title: '', ...props.task });

const updateTask = async () => {
  await tasksStore.updateTask(localTask.id, localTask)
}
</script>

<template>
  <div class="task__item">
    <div class="task__item_status">
      <input type="checkbox" v-model="localTask.completed" @change="updateTask">
    </div>
    <div class="task__item_info">
      <span class="task__item_info-name">{{localTask.title}}</span>
      <span class="task__item_info-date">{{localTask.dueDate}}</span>
    </div>
    <div class="task__item_actions">
      <button  class="task__item_actions_delete todo__btn">Удалить</button>
      <button  class="task__item_actions_edit todo__btn">Редактировать</button>
    </div>
  </div>
</template>

<style scoped lang="sass">
.task__item
  display: flex
  align-items: center
  gap: 10px
  background-color: var(--todo-red)
  border-radius: 4px
  padding: 8px
  margin-bottom: 10px

  .task__item_info
    display: flex
    flex-direction: column

    .task__item_info-name
      font-size: 20px

  .task__item_actions
    display: flex
    margin-left: auto
    gap: 10px
</style>