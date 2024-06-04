import { defineStore, type StoreDefinition } from 'pinia'
import type { Task, TasksStoreState, TaskStoreActions } from '@/models/tasks'
import axios from 'axios'
import type { AxiosResponse } from 'axios';

export const useTasksStore: StoreDefinition<'tasks', TasksStoreState, {}, TaskStoreActions> = defineStore('tasks', {
  state(): TasksStoreState {
      return {
        tasks: []
      }
  },
  actions: {
    async getTasks() {
      try {
        const response: AxiosResponse<Task[]> = await axios.get(`http://localhost:3000/tasks`);
        console.log(response.data)
        this.tasks = response.data;
      } catch (e) {
        console.log(e);
      }
    },

    async getTasksByName(taskName: string) {
      try {
        const response: AxiosResponse<Task[]> = await axios.get(`http://localhost:3000/tasks?_title=${taskName}`);
        this.tasks = response.data;
      } catch (e) {
        console.log(e);
      }
    },

    async getTaskById(id: string){
      try {
        const response: AxiosResponse<Task> = await axios.get(`http://localhost:3000/tasks/${id}`);
        return response.data;
      } catch (e) {
        console.log(e);
        return null;
      }
    },

    async createTask(task: Task) {
      try {
        const { id, ...taskWithoutId } = task;
        await axios.post(`http://localhost:3000/tasks`, {...taskWithoutId});
      } catch (e) {
        console.log(e);
      }
    },

    async updateTask(updatedTask: Task){
      try {
        await axios.put(`http://localhost:3000/tasks/${updatedTask.id}`, {...updatedTask});
      } catch (e) {
        console.log(e);
      }
    },

    async deleteTask(id: string){
      try {
        await axios.delete(`http://localhost:3000/tasks/${id}`);
      } catch (e) {
        console.log(e);
      }
    },

    filterTasksById(id: string){
      this.tasks = this.tasks.filter(task => {
        return task.id !== id
      })
    }
  }
});
