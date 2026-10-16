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
  errorMessage = '';

  onToggle(): void {
    this.toggleComplete.emit(this.taskDescription);
    this.isEditing = false;
    this.errorMessage = '';
  }

  onEdit(): void {
    this.isEditing = true;
    this.editingName = this.taskDescription.name;
    this.errorMessage = '';
  }

  onSave(): void {
    const trimmedName = this.editingName.trim();
    if (!trimmedName) {
      this.errorMessage = 'Tiêu đề không được để trống';
      return;
    }
    this.taskDescription.name = trimmedName;
    this.editTask.emit(this.taskDescription);
    this.isEditing = false;
    this.errorMessage = '';
  }

  onCancel(): void {
    this.isEditing = false;
    this.errorMessage = '';
  }

  clearError(): void {
    if (this.errorMessage) {
      this.errorMessage = '';
    }
  }

  onDelete(): void {
    if (window.confirm(`xoa task "${this.taskDescription.name}"?`)) {
      this.deleteTask.emit(this.taskDescription);
      
    }
  }
}
