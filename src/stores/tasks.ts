import { defineStore } from 'pinia'
import type { Task, TasksStoreState } from '@/models/tasks'
import axios from 'axios'
import type { AxiosResponse } from 'axios';

export const useTasksStore = defineStore('tasks', {
  state(): TasksStoreState {
      return {
        tasks: []
      }
  },

  actions: {
    async getTasks() {
      try {
        const response: AxiosResponse<Task[]> = await axios.get(`http://localhost:3000/tasks`);
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

    async getTaskById(id: number){
      try {
        const response: AxiosResponse<Task[]> = await axios.get(`http://localhost:3000/tasks/${id}`);
        this.tasks = response.data;
      } catch (e) {
        console.log(e);
      }
    },

    async createTask(){
      try {
        const response: AxiosResponse<Task[]> = await axios.post(`http://localhost:3000/tasks`);
        this.tasks = response.data;
      } catch (e) {
        console.log(e);
      }
    },

    async updateTask(id: number, updatedTask: Task){
      try {
        const response: AxiosResponse<Task[]> = await axios.put(`http://localhost:3000/tasks/${id}`, {...updatedTask});
        console.log(response.data);
      } catch (e) {
        console.log(e);
      }
    },

    async deleteTask(id: number){
      try {
        const response: AxiosResponse<Task[]> = await axios.delete(`http://localhost:3000/tasks/${id}`);
        this.tasks = response.data;
      } catch (e) {
        console.log(e);
      }
    }
  }
});
