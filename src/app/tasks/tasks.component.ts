// tasks.component.ts
import { Component, OnInit } from '@angular/core';
import { TaskService } from '../service.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})

export class TasksComponent implements OnInit {
  tasks: { id: number; name: string; completed: boolean }[] = [];
  newTask: string = "";
  editingTaskId: number | null = null;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void {
    this.taskService.getTasks()
      .subscribe(tasks => this.tasks = tasks);
  }

  addTask(): void {
    if (this.newTask.trim() !== "") {
      this.taskService.addTask({ name: this.newTask.trim(), completed: false })
        .subscribe(task => {
          this.tasks.push(task);
          this.newTask = "";
        });
    }
  }

  deleteTask(task: any): void {
    this.taskService.deleteTask(task.id)
      .subscribe(() => {
        this.tasks = this.tasks.filter(t => t !== task);
      });
  }

  editTask(task: any): void {
    this.editingTaskId = task.id;
    this.newTask = task.name;
  }

  updateTask(task: any): void {
    if (this.newTask.trim() !== "") {
      this.taskService.updateTask(task.id, { name: this.newTask.trim(), completed: task.completed })
        .subscribe(() => {
          task.name = this.newTask.trim();
          this.newTask = "";
          this.editingTaskId = null;
        });
    }
  }

  cancelEdit(): void {
    this.newTask = "";
    this.editingTaskId = null;
  }

  toggleComplete(task: any): void {
    task.completed = !task.completed;
    this.updateTask(task);
  }
}
