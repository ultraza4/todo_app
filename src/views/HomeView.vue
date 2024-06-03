<script setup lang="ts">

import { onMounted } from 'vue'
import { useTasksStore } from '@/stores/tasks'
import Tasks from '@/components/TasksList.vue'

const tasksStore = useTasksStore();

onMounted(async ()=>{
  await tasksStore.getTasks();
  console.log(tasksStore.tasks)
})
</script>

<template>
  <Tasks/>
</template>
