import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskStateService } from '../../services/task-state.service';
import { DataTask } from '../../services/data-task.service';

@Component({
    imports: [FormsModule],
    selector: 'app-head-bar',
    styleUrl: './head-bar.css',
    templateUrl: './head-bar.html',
})
export class HeadBar {
    name = '';
    errorMessage = '';

    taskState = inject(TaskStateService);

    get complete_num(): number {
        return this.taskState.tasks().filter((task: any) => !task.completed).length;
    }

    get total_num(): number {
        return this.taskState.tasks().length;
    }

    addTask() {
        const taskName = this.name.trim();
        if (!taskName) {
            this.errorMessage = 'Tên công việc không được để trống';
            return;
        }

        const taskTime = new Date();
        this.taskState.addTask({ id: Date.now(), name: taskName, timeCreated: taskTime, completed: false });
        this.name = '';
        this.errorMessage = '';
    }

    clearError() {
        if (this.errorMessage) {
            this.errorMessage = '';
        }
    }
}
