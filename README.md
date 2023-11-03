# noteapp

Frontend --> Angular
Backend --> Springboot

* Multiple users can add their notes by logging in the web application
* After logging in, top recent 10 notes are fetched automatically from the db
* A cron job keeps on running in the backgroud to delete all the notes except the last 10 recent notes periodically.

* Used JWT authentication
* Used interceptors and authguards
