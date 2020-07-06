import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  enteredName;
  completedLists = [];
  uncompletedLists = [];
  finalNameList: any = [];
  finalHtmlNameList = [];
  myDropDown = '';

  constructor() { }

  ngOnInit() {
    const localstorageValue = JSON.parse(localStorage.getItem('finalListArray'));
    this.finalNameList = localstorageValue ? localstorageValue : [];
    this.finalHtmlNameList = localstorageValue ? localstorageValue : [];
    this.uncompletedLists = this.finalNameList;
  }

  updateList() {
    this.finalNameList.push(this.enteredName);
    this.saveTodo(this.finalNameList);
    this.enteredName = '';
  }

  deleteList(event) {
    debugger
    const list = event.currentTarget.childNodes[0].parentNode.parentElement.attributes[0].ownerElement.childNodes[0].innerText;
    const nameListIndex = this.finalNameList.indexOf(list);
    if (nameListIndex !== -1) {
      this.finalNameList.splice(nameListIndex, 1);
    }
    const completedListIndex = this.completedLists.indexOf(list);
    if (completedListIndex !== -1) {
      this.completedLists.splice(completedListIndex, 1);
    }
    const uncompletedListIndex = this.uncompletedLists.indexOf(list);
    if (uncompletedListIndex !== -1) {
      this.uncompletedLists.splice(uncompletedListIndex, 1);
    }
    localStorage.setItem('finalListArray', JSON.stringify(this.finalNameList));
  }

  editList(event) {
    const list = event.currentTarget.childNodes[0].parentNode.parentElement.attributes[0].ownerElement.childNodes[0].innerText;
    this.completedLists.push(list);
    this.uncompletedLists = this.finalNameList.filter(item => !this.completedLists.includes(item));
  }

  getCompletedList(list) {
    if (this.completedLists.includes(list)) {
      return true;
    } else {
      return false;
    }
  }

  onChangeofOptions(value) {
    switch (value) {
      case 'all':
        this.finalHtmlNameList = this.finalNameList;
        break;
      case 'completed':
        this.finalHtmlNameList = this.completedLists;
        break;
      case 'uncompleted':
        this.finalHtmlNameList = this.uncompletedLists;
        break;
    }
  }

  saveTodo(finalList) {
    let finalListArray = [];
    if (localStorage.getItem('fianlList') === null) {
      finalListArray = [];
    } else {
      finalListArray = JSON.parse(localStorage.getItem('finalList'));
    }
    finalListArray = finalList;
    this.finalHtmlNameList = finalListArray;
    localStorage.setItem('finalListArray', JSON.stringify(finalListArray));
  }
}
