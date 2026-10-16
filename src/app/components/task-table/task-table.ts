import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { TaskTableRow } from '../task-table-row/task-table-row';
import { TaskDescription } from '../../shares/task-description';
import { TaskStateService } from '../../services/task-state.service';
import {MatRadioModule} from '@angular/material/radio';


export interface Task {
  completed: boolean;
  name: string;
  timeCreated: Date;
}


@Component({
  selector: 'app-task-table',
  styleUrl: './task-table.css',
  templateUrl: './task-table.html',
  imports: [MatTableModule, TaskTableRow, MatRadioModule],
})
export class TaskTable {
  selectedOption = 'all';
  taskState = inject(TaskStateService);
  get dataSource() { return this.taskState.tasks(); }
  onToggleComplete(task: TaskDescription): void {
    this.taskState.toggleComplete(task.id);
  }
  onEditTask(task: TaskDescription): void {
    this.taskState.editTask(task.id, task.name);
  }
  onDeleteTask(task: TaskDescription): void {
    this.taskState.deleteTask(task.id);
  }
  onSortByName(): void {
    this.taskState.sortByName();
  }
  onSortByTime(): void {
    this.taskState.sortByTime();
  }
  onShowAll(): void {
    this.taskState.showAll();
  }
  onShowIncomplete(): void {
    this.taskState.showIncomplete();
  }
  onShowComplete(): void {
    this.taskState.showComplete();
  }
}
