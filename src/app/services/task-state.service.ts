import { Injectable, signal, computed } from '@angular/core';
import { DataTask } from './data-task.service';
import { TaskDescription } from '../shares/task-description';

@Injectable({ providedIn: 'root' })
export class TaskStateService {

    tasks = signal<TaskDescription[]>(
        (DataTask.getItem('tasks') || []).map((t: any, index: number) => ({
            id: t.id ?? (Date.now() + index),
            name: t.name ?? '',
            timeCreated: t.timeCreated ? new Date(t.timeCreated) : new Date(),
            completed: Boolean(t.completed)
        }))
    );

    totalCount = computed(() => this.tasks().length);
    incompleteCount = computed(() => this.tasks().filter(t => !t.completed).length);

    addTask(task: TaskDescription): void {
        this.tasks.update(list => [...list, task]);
        DataTask.setItem('tasks', this.tasks());
    }

    toggleComplete(id: number): void {
        this.tasks.update(list =>
            list.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
        );
        DataTask.setItem('tasks', this.tasks());
    }

    editTask(id: number, newName: string): void {
        this.tasks.update(list =>
            list.map(t => t.id === id ? { ...t, name: newName } : t)
        );
        DataTask.setItem('tasks', this.tasks());
    }

    deleteTask(id: number): void {
        this.tasks.update(list => list.filter(t => t.id !== id));
        DataTask.setItem('tasks', this.tasks());
    }

    private sortDirection: 'Nasc' | 'Ndesc' = 'Nasc';

    sortByName(): void {
        const multiplier = this.sortDirection === 'Nasc' ? 1 : -1;
        this.tasks.update(list => [...list].sort((a, b) => {
            return a.name.localeCompare(b.name) * multiplier;
        }));
        this.sortDirection = this.sortDirection === 'Nasc' ? 'Ndesc' : 'Nasc';
    }

    private sortTimeDirection: 'Tasc' | 'Tdesc' = 'Tasc';

    sortByTime(): void {
        const multiplier = this.sortTimeDirection === 'Tasc' ? 1 : -1;
        this.tasks.update(list => [...list].sort((a, b) => {
            return (a.timeCreated.getTime() - b.timeCreated.getTime()) * multiplier;
        }));
        this.sortTimeDirection = this.sortTimeDirection === 'Tasc' ? 'Tdesc' : 'Tasc';
        DataTask.setItem('tasks', this.tasks());
    }

    showAll(): void {
        this.tasks.update(list => [...list]);
    }
    showIncomplete(): void {
        this.tasks.update(list => list.filter(t => !t.completed));
    }
    showComplete(): void {
        this.tasks.update(list => list.filter(t => t.completed));
    }

}
