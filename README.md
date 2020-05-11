# QuestionnairesApp

This project is powered by:
 - Angular 9.1.4
 - NestJs 7.0.9
 - MongoDB 4.0.10
 
 Welcome to my questionnaires app. With this app you can create custom questionnaires and share the with other users.
 The app features full overlook of results of every questionnaire.

## Setup

To start the project:
 1. Create a local mongo instance
 2. Navigate to questionnaires-app/backend folder and run `npm install` and `npm run start`
 3. Navigate to questionnaires-app and run `npm install` and `npm start`
 4. Go to `http://localhost:4200`

## Testing the app

To fully test all of the app features follow these instructions.
###Admin:
 1. Got to signup and create a new admin user. Make sure you have selected the admin role on the top right of the screen.
 2. Login with the admin account.
 3. Create a new questionnaire and click on it. This will transfer you to the questions tab where you can edit the questionnaire.
 4. Navigate to share tab and specify users you want to share with
 5. Once done editing the questionnaire click on publish. Now the the users will be able to see the questionnaires
    (NOTE: If you edit the questionnaire after publishing it, you will have to publish it again otherwise it will not be visible to the users)
 6. Create a new admin account.
 7. login with both admins and open the sam questionnaire. The first admin to open it will be the on editing it.
    Other admins will be blocked from editing the same questionnaire. If you close the questionnaire with the editing admin,
    It will automatically transfer the edit privilege to the next admin who has the questionnaire opened.
 
###User:
 1. Create a new user account. Make sure you have selected the user role on the top right of the screen.
 2. Make sure you have shared the questionnaire with this user.
 3. If so you will see the questionnaire, open it and answer the questions.
 4. Once done Submit your answers. (NOTE: Once submitted you will not be able to submit your answers again with this user, unless the admin edits the questionnaire).
 5. navigate to the results tab where you will be able to see the results of the questionnaire. 
    The average time is calculated from the moment you open the questionnaire as the user and click the submit button.
