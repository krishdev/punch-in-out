import { Component, OnInit } from '@angular/core';
import { Log, Action } from '../models/log.models';
import { LogService } from '../services/log.services';
import { AuthService } from '../services/auth.services'
import { Observable, from } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  todaysDate: string;
  currentTime: string;

  hrsPerDay: number = 8;
  hrsPerWeek: number = 40;
  additionalHrsThisWeek: number;
  additionalHrsToday: number;
  remainingHrsToday: number = 8;
  remainingHrsThisWeek: number;

  hrsPunchedToday: number = 0;
  hrsPunchedThisWeek: number;

  logs: any = {action:[]};

  log: Log = {
    date: '',
    action: [],
    userId: ''
  }

  action: Action = {
    timeStamp: '',
    action: null
  };

  dateUTC: string;

  isTodayPresent: boolean = false;

  constructor(
    private logService: LogService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    let todaysDate: Date = new Date();
    this.dateUTC = todaysDate.toISOString();
    this.todaysDate = todaysDate.toLocaleDateString();

    let log;
    this.getLogsForToday();
    setInterval(() => {
      todaysDate = new Date();
      this.currentTime = todaysDate.toLocaleTimeString();
    }, 1000);
  }

  getLogsForToday() {
    let idLatetDate;
    this.logService.getLogByDate(this.todaysDate).then(res=> {
      res.forEach(r => {
        idLatetDate = r.id;
        this.logService.getLog(idLatetDate).subscribe(resp=>{
          this.isTodayPresent = true;          
          this.logs = resp;
        })        
      });
    })
  }

  punchItEvent(evt) {
    let log;
    let todaysDate: Date = new Date();
    this.todaysDate = todaysDate.toLocaleDateString();
    let idLatetDate;
    this.logService.getLogByDate(this.todaysDate).then(resp=> {
      resp.forEach(r => {
        idLatetDate = r.id;
        this.isTodayPresent = log ? true : false;
        this.logService.getLog(idLatetDate).subscribe(res=>{
          this.isTodayPresent = true;
          log = res ? true : false;
          this.log = res;
          let thisTime = new Date().getTime();
          this.action.timeStamp = thisTime.toString();
          this.action.action = evt == 'in' ? 1 : 0;
          if(this.isTodayPresent) {
            this.log.action.push(this.action);
            this.logService.updateLog(this.log);
            setTimeout(()=>{
              this.getLogsForToday();
            },1000);
          }
        });
      });
      if(!resp.size) {
        this.log.id = this.logService.generateId();
        this.log.date = this.todaysDate;
        let thisTime = new Date().getTime();
        this.action.timeStamp = thisTime.toString();
        this.action.action = evt == 'in' ? 1 : 0;
        this.log.action.push(this.action);
        this.log.userId = this.authService.getUserId();
        this.logService.addLog(this.log).then(res => {
          console.log(res);
        });
      }
    });
  }

}
