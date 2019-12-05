import { Injectable } from '@angular/core';

@Injectable()
export class LocalstorageService {
  intervalCount: number = 1000 * 60;
  storageList = [];

  getLocalStorage(key) {
    if (key && localStorage.getItem(key)) {
      return JSON.parse(localStorage.getItem(key));
    }
    return null;
  }

  setLocalStorageWithInterval(key, value) {
    this.setLocalStorage(key, value);
    if (this.storageList.indexOf(key) === -1) {
      this.storageList.push(key);
      this.timeInterval([key]);
    } else {
      clearTimeout(this.storageList[key]);
      this.timeInterval([key]);
    }
  }

  setLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  removeStorage(keys: string[]) {
    keys.forEach(element => {
      localStorage.removeItem(element);
    });
  }

  clearAllStorage() {
    localStorage.clear();
  }

  timeInterval(key) {
    this.storageList[key] = setTimeout(() => {
      this.removeStorage(key);
      this.storageList.splice(this.storageList.indexOf(key), 1);
    }, this.intervalCount);
  }

}
