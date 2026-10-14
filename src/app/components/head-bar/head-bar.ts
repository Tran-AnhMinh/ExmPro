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

    taskState = inject(TaskStateService);


    get complete_num(): number {
        return this.taskState.tasks().filter((task: any) => !task.completed).length;
    }

    get total_num(): number {
        return this.taskState.tasks().length;
    }

    addTask() {
        const taskName = this.name.trim();
        const taskTime = new Date();
        if (taskName) {
            this.taskState.addTask({ id: Date.now(), name: taskName, timeCreated: taskTime, completed: false });
            console.log('Thêm công việc:', taskName, 'vào lúc', taskTime);
            this.name = '';

        } else {
            console.log('Vui lòng nhập tên công việc.');
        }
    }

}
