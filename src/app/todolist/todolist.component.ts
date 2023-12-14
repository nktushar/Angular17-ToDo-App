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
  originalTaskList: Task[] = [];
  tagsList: string[] = ['Work', 'Personal', 'Shopping', 'Others'];
  filterType: string = '';
  selectedTag: string = '';

  constructor() {
    this.taskObj = new Task();
    const localData = localStorage.getItem('todoApp');
    if (localData != null) {
      this.taskList = JSON.parse(localData);
      this.originalTaskList = this.taskList;
    }
  }
  createNewTask(): void {
    const task = JSON.stringify(this.taskObj);
    const parseTask = JSON.parse(task);
    this.taskList.push(parseTask);
    this.originalTaskList = this.taskList;
    localStorage.setItem('todoApp', JSON.stringify(this.taskList))
  }

  onComplete(): void {
    this.originalTaskList = this.taskList;
    localStorage.setItem('todoApp', JSON.stringify(this.taskList))
  }

  onRemove(index:number) {
    this.taskList.splice(index, 1);
    this.originalTaskList = this.taskList;
    localStorage.setItem('todoApp', JSON.stringify(this.taskList))
  } 

  getArrayFromCommaSeparatedString(str: string): string[] {
    const arr = str.split(',');
    return arr;
  }

  setFilter(filterType: string): void {
    this.filterType = filterType;
    this.selectedTag = '';
    if(filterType === 'completed') {
      this.taskList = this.originalTaskList.filter((task) => {
        return task.isCompleted;
      });
    }
    else if(filterType === 'incomplete') {
      this.taskList = this.originalTaskList.filter((task) => {
        return !task.isCompleted;
      });
    } 
    else {
      this.taskList = this.originalTaskList;
    }

  }

  filterByTag() {
    const filteredList = this.originalTaskList.filter((task) => {
      return task.tags.includes(this.selectedTag);
    });
    this.taskList = filteredList;
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