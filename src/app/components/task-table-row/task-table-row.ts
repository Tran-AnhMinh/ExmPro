import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskDescription } from '../../shares/task-description';
import { Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  imports: [CommonModule, FormsModule],
  selector: '[app-task-table-row]',
  styleUrl: './task-table-row.css',
  templateUrl: './task-table-row.html',
})
export class TaskTableRow {

  @Input() taskDescription!: TaskDescription;
  @Output() toggleComplete = new EventEmitter<TaskDescription>();
  @Output() deleteTask = new EventEmitter<TaskDescription>();
  @Output() editTask = new EventEmitter<TaskDescription>();

  isEditing = false;
  editingName = '';

  onToggle(): void {
    this.toggleComplete.emit(this.taskDescription);
    this.isEditing = false;
  }

  onEdit(): void {
    this.isEditing = true;
    this.editingName = this.taskDescription.name;
  }

  onSave(): void {
    this.taskDescription.name = this.editingName;
    this.editTask.emit(this.taskDescription);
    this.isEditing = false;
  }

  onCancel(): void {
    this.isEditing = false;
  }

  onDelete(): void {
    if (window.confirm(`xoa task "${this.taskDescription.name}"?`)) {
      this.deleteTask.emit(this.taskDescription);
      
    }
  }
}
