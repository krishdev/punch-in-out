// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyAbKcouX0raAfkCzCtr2i8aC07-Dh9s2RE",
    authDomain: "punchtime-a9c62.firebaseapp.com",
    databaseURL: "https://punchtime-a9c62.firebaseio.com",
    projectId: "punchtime-a9c62",
    storageBucket: "punchtime-a9c62.appspot.com",
    messagingSenderId: "608074513339",
    appId: "1:608074513339:web:0b51754dc65992ac12229e",
    measurementId: "G-RQL89GYVRE"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/**
 * 
 

 <!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/7.5.0/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->
<script src="https://www.gstatic.com/firebasejs/7.5.0/firebase-analytics.js"></script>

<script>
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAbKcouX0raAfkCzCtr2i8aC07-Dh9s2RE",
    authDomain: "punchtime-a9c62.firebaseapp.com",
    databaseURL: "https://punchtime-a9c62.firebaseio.com",
    projectId: "punchtime-a9c62",
    storageBucket: "punchtime-a9c62.appspot.com",
    messagingSenderId: "608074513339",
    appId: "1:608074513339:web:0b51754dc65992ac12229e",
    measurementId: "G-RQL89GYVRE"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
</script>


 */
