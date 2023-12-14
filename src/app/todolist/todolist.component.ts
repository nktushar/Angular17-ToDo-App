import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todolist',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './todolist.component.html',
  styleUrl: './todolist.component.css'
})

export class TodolistComponent  {
  taskObj: Task;
  taskList: Task[] = [];

  constructor() {
    this.taskObj = new Task();
    const localData = localStorage.getItem('todoApp');
    if (localData != null) {
      this.taskList = JSON.parse(localData);
    }
  }
  createNewTask(): void {
    const task = JSON.stringify(this.taskObj);
    const parseTask = JSON.parse(task);
    this.taskList.push(parseTask);
    localStorage.setItem('todoApp', JSON.stringify(this.taskList))
  }

  onComplete(): void {
    localStorage.setItem('todoApp', JSON.stringify(this.taskList))
  }

}
export class Task {
  taskName: string;
  dueDate: string;
  tags: string;
  isCompleted: boolean;
  constructor() {
    this.taskName = "";
    this.dueDate = "";
    this.tags = "";
    this.isCompleted = false;
  }
}

















  

  // filterItems(): void {
  //   const totitems = [
  //     { item: "Market", tags: ["general", "market"] },
  //     { item: "Scrum Meeting", tags: ["meeting", "calls"] },
  //     { item: "Interview", tags: ["calls"] },
  //     { item: "Scrum Ticket", tags: ["work", "defect"] },
  //     { item: "Work On defect", tags: ["defect"] },
  //   ];
  //   const arrr = ["defect", "calls"];

  //   const myArrayFiltered = totitems.filter((el) => {
  //     return arrr.some((f) => {
  //       return el.tags.includes(f);
  //     });
  //   });

  //   console.log(myArrayFiltered);
  //   debugger; // You can remove 'debugger' if it's not necessary
  // }