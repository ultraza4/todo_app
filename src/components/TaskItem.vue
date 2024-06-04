<script setup lang="ts">

import { type PropType } from 'vue'
import type { Task } from '@/models/tasks'
import { useTasksStore } from '@/stores/tasks'

const props = defineProps({
  task: { type: Object as PropType<Task> },
  setSelectedTask: {
    type: Function as PropType<(task: Task) => void>,
    default: () => {},
  },
});

const tasksStore = useTasksStore();

const updateTask = async (event: Event) => {
  if(props.task){
    await tasksStore.updateTask({
      ...props.task,
      completed: (event.target as HTMLInputElement).checked,
    })
  }
}

const deleteTask = async () => {
  if (window.confirm("Вы уверены, что хотите удалить задачу?")) {
    if(props.task){
      await tasksStore.deleteTask(props.task.id);
      tasksStore.filterTasksById(props.task.id)
    }
  }
}
</script>

<template>
  <div class="task__item">
    <div class="task__item_status">
      <input type="checkbox" :value="task?.completed" @change="updateTask($event)">
    </div>
    <div class="task__item_info">
      <span class="task__item_info-name">{{task?.title}}</span>
      <span class="task__item_info-date">{{task?.dueDate}}</span>
    </div>
    <div class="task__item_actions">
      <button  class="task__item_actions_delete todo__btn" @click="deleteTask">Удалить</button>
      <button  class="task__item_actions_edit todo__btn" @click="task && setSelectedTask(task)">Редактировать</button>
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