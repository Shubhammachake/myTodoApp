import { Component } from '@angular/core';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})

export class TasksComponent {
  tasks: { name: string; completed: boolean }[] = [];
  newTask: string = "";
  editingTask: string | null = null; // Variable to store the task being edited

  addTask() {
    if (this.newTask.trim() !== "") {
      this.tasks.push({ name: this.newTask.trim(), completed: false });
      this.newTask = "";
    }
  }

  deleteTask(task: { name: string; completed: boolean }) {
    this.tasks = this.tasks.filter(ele => ele != task);
  }

  editTask(task: { name: string; completed: boolean }) {
    this.editingTask = task.name;
    this.newTask = task.name; // Pre-fill the input field with the task being edited
  }

  updateTask() {
    if (this.newTask.trim() !== "") {
      const index = this.tasks.findIndex(task => task.name === this.editingTask);
      if (index !== -1) {
        this.tasks[index].name = this.newTask.trim();
        this.newTask = "";
        this.editingTask = null;
      }
    }
  }

  cancelEdit() {
    this.newTask = ""; // Clear input field
    this.editingTask = null;
  }

  toggleComplete(task: { name: string; completed: boolean }) {
    task.completed = !task.completed;
  }
}
