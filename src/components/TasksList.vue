<script setup lang="ts">
import { useTasksStore } from '@/stores/tasks'
import {  onMounted, type Ref, ref } from 'vue'
import TaskItem from '@/components/TaskItem.vue'
import BaseModal from '@/components/BaseModal.vue'
import useShow from '@/composables/useShow'
import type { Task } from '@/models/tasks'
import { debounce } from '@/utils/helper'

const tasksStore = useTasksStore();
//создал специальный composable для более удобного использования в будущем
const { isShow: isShowTaskModal, toggleShow: toggleTaskModal } = useShow();

const selectedTask: Ref<Task> = ref({id: '', title: '', dueDate:'', completed: false, description: ''})
const searchQuery: Ref<string> = ref('')

onMounted(async ()=> {
  await tasksStore.getTasks();
})

//нужно выставить поля в локальной задаче в соответствий с выбранной задачой
const setSelectedTask = (task: Task ) => {
  selectedTask.value = {...task}
  toggleTaskModal()
}

//при нажатий на добавление новой задачи нужно сбрасывать локальную задачу, если пользователь создает задачу после редактирования
const addNewTask = () => {
  resetSelectedTask()
  toggleTaskModal()
}

const createOrUpdateTask = async () => {
  //если есть id значит задачу нужно обновить, если она отсутсвтует то нужно создать задачу
  selectedTask.value.id  ?
    await tasksStore.updateTask(selectedTask.value) :
    await tasksStore.createTask(selectedTask.value)
  await tasksStore.getTasks()
  resetSelectedTask()
  toggleTaskModal()
}

const resetSelectedTask = () => {
  selectedTask.value = {id: '', title: '', dueDate:'', completed: false, description: ''}
}

const closeTaskModal = () => {
  resetSelectedTask()
  toggleTaskModal()
}

//нужно отправлять запрос на поиск только после того как пользователь закончил печатать
const getTasksWithDebounce = debounce(async () => await tasksStore.getTasksByName(searchQuery.value), 500);
</script>

<template>
  <div class="tasks">
    <div class="tasks__header">
      <input type="text" class="tasks__header_search_input" v-model="searchQuery" @input="getTasksWithDebounce">
      <button  class="tasks__header_add_btn todo__btn" @click="addNewTask">Добавить задачу</button>
    </div>
    <div class="tasks__list ">
      <TaskItem v-for="task in tasksStore.tasks" :task="task" :setSelectedTask="setSelectedTask" :key="task.id"/>
    </div>
    <BaseModal :isShow="isShowTaskModal" :close="closeTaskModal">
      <div class="task__modal_body">
        <div class="task__modal_body_item">
          <span class="body_item_title">Название</span>
          <input class="body_item_input" type="text" v-model="selectedTask.title">
        </div>
        <div class="task__modal_body_item">
          <span class="body_item_title">Описание</span>
          <input class="body_item_input"  type="text" v-model="selectedTask.description">
        </div>
        <div class="task__modal_body_item">
          <span class="body_item_title">Срок выполнения</span>
          <input class="body_item_input"  type="date" v-model="selectedTask.dueDate">
        </div>
      </div>
      <template #footer>
        <button class="todo__btn" @click="createOrUpdateTask">{{selectedTask.id ? 'Cохранить' : 'Создать'}}</button>
      </template>
    </BaseModal>
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

.task__modal_body
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  gap: 10px

  .task__modal_body_item
    display: flex
    flex-direction: column
    align-items: start
    width: 100%
    max-width: 255px
    gap: 2px

    .body_item_title
      font-size: 14px
      font-weight: 500
      line-height: 16px
      opacity: 0.5

    .body_item_input
      width: 100%
      height: 30px
      font-size: 16px
      line-height: 22px
      font-weight: 500
      border-radius: 4px
      border: 1px solid rgba(155, 155, 155, 1)
</style>