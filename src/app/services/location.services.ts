import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Log } from '../models/log.models';

@Injectable({
    providedIn: 'root'
})

export class LogService {

    constructor(private geolocation: Geolocation) {}

    getLocation() {
        this.geolocation.getCurrentPosition().then((resp) => {
            // resp.coords.latitude
            // resp.coords.longitude
           }).catch((error) => {
             console.log('Error getting location', error);
           });
           
           let watch = this.geolocation.watchPosition();
           watch.subscribe((data) => {
            // data can be a set of coordinates, or an error (if an error occurred).
            // data.coords.latitude
            // data.coords.longitude
           });
    }
}