This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### Techs
Database using firebase firestore, realtime database using firebase realtime database. Not using any API, access directly to database instead. Using ReactJs and Redux as the state management. I also created a converter using javascript to convert the csv into JSON structure that i desired and create it on firestore.

### What You Can Do
* Login / Signup
The landing page is login screen, you can basically type whatever you want, not restricted to email. Then when you hit 'login', the system will check the firestore, if you already have a user registered under that word, then you will login as that user, on the other hand, if no user was found under that word, the system will create a new user with that word.
* Restaurant List
Here will display you the restaurant list, you can filter the list by picking any date or time, then the list will re filter. In this screen you also able to add the selected restaurant to your collection under certain name that you input your self.
* Collection List
Here will display you all the collection you got. whether it is your own, or someone invite you as collaborator. In this screen you can edit collection name, add or remove collaborator, and remove restaurant from collection. Note that every action that you do here is realtime. So you can just open two tabs of this app, then on first web you do any changes, will automatically apply the changes on the other tab as well.

## Time cost
I've been doing this in between my dayjob sometimes, and sometimes after working hour. I can't get my hand on this on weekeend since i got a quite time demanding girlfriend lol. maybe 8 days times 3 hours a day so it'll be around 24 hours i guess.

## Notes
Dig in. Please feel free to email me if you found any issue.
