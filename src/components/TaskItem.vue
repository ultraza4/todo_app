<script setup lang="ts">

import { computed, type PropType } from 'vue'
import type { Task } from '@/models/tasks'
import { useTasksStore } from '@/stores/tasks'
import { getDate } from '@/utils/date'

const props = defineProps({
  task: { type: Object as PropType<Task> },
  setSelectedTask: {
    type: Function as PropType<(task: Task) => void>,
    default: () => {},
  },
});

const tasksStore = useTasksStore();

//проверка даты и завершенности задачи
const isTaskExpired = computed(() =>{
  return !props.task?.completed && props.task && props.task.dueDate < getDate()
})

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
  <div class="task__item" :class="{'task__item_incomplete': isTaskExpired}">
    <div class="task__item_status">
      <input type="checkbox" :checked="task?.completed" @change="updateTask($event)">
    </div>
    <div class="task__item_info">
      <span class="task__item_info-name" :class="{'task_completed': task?.completed}">{{task?.title}}</span>
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
  background-color: var(--todo-gray)
  border-radius: 4px
  padding: 8px
  margin-bottom: 10px

  .task__item_info
    display: flex
    flex-direction: column

    .task__item_info-name
      font-size: 20px

    .task_completed
      text-decoration: line-through

  .task__item_actions
    display: flex
    margin-left: auto
    gap: 10px
.task__item_incomplete
  background-color: var(--todo-red)
</style>