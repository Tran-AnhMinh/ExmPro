import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeadBar } from './components/head-bar/head-bar';
import { TaskTable } from './components/task-table/task-table';
import { FormsModule } from '@angular/forms';


@Component({
  imports: [RouterOutlet, HeadBar, TaskTable, FormsModule],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',

  
})
export class App {
  title = 'Dự án Todo App';
  
}

