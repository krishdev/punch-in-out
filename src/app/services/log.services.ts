import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Log } from '../models/log.models';
import { AuthService } from '../services/auth.services';
import { resolve } from 'url';

@Injectable({
    providedIn: 'root'
})

export class LogService {
    private logs: Observable<Log[]>;
    private logCollection: AngularFirestoreCollection<Log>;

    constructor(
      private afs: AngularFirestore, 
      private authService: AuthService,
      private db: AngularFireDatabase
    ) {
        this.logCollection = this.afs.collection<Log>('clockTime');
        this.logs = this.logCollection.snapshotChanges().pipe(
          map(actions => {
            return actions.map(a => {
              const data = a.payload.doc.data();
              const id = a.payload.doc.id;
              return { id, ...data };
            });
          })
        );
      }

      getLogs(): Observable<Log[]> {
        return this.logs;
      }
     
      getLog(id: string): Observable<Log> {
        return this.logCollection.doc<Log>(id).valueChanges().pipe(
          take(1),
          map(log => {
            log.id = id;
            return log
          })
        );
      }

      getLogByDate(date: string): Promise<any> {    
        let dateRef = this.afs.firestore.collection('clockTime').where( 'date', '==', date);
        return dateRef.get();
      }
     
      addLog(log: Log): Promise<DocumentReference> {
        // const id = this.afs.createId();
        // const ref = this.afs.collection('clockTime').doc(id);
        // log.id = id;
        return this.logCollection.add(log);
      }

      generateId () {
        const id = this.afs.createId();
        return id;
      }
     
      updateLog(log: Log): Promise<void> {
        return this.logCollection.doc(log.id).update({ date: log.date, action: log.action });
      }
     
      deleteLog(id: string): Promise<void> {
        return this.logCollection.doc(id).delete();
      }
}