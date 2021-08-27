
<h1 align="center">
  Plants Manager
</h1>

<h4 align="center">Mobile application developed for watering control and plant monitoring</h4>

---

## Installation of the project locally

After each of the steps, there will be an example of the command to be typed to do what is being asked, if you have difficulties and the example is not enough, do not hesitate to contact me at _igorln96@gmail.com_.

1. Open the terminal and create a directory in the location of your choice with the command **mkdir**:
``` javascript
   mkdir projects-igorln
```

2. Enter the directory you just created and then clone the project:
``` javascript
   cd projects-igorln
   git clone git@github.com:igorln/plants-manager.git
```

3. Access the project directory and then use the command **yarn add** to install all necessary dependencies:
``` javascript
   cd plants-manager
   yarn add
```

4. Go to src/services/api.ts and replace the baseURL value with your IP address + :3333 (ex: http://192.168.1.1:3333).

5. Finally, open two terminals, run the command **json-server ./src/services/server.json --host YOUR IP HERE (ex: 192.168.1.1) --port 3333** in a terminal, in another terminal run the command **npm start** and access the project via emulators.

If you don't have any emulator on your computer, you can download and use the app Expo Go on your phone.

---

## 💬 Functionalities
<ul>
  <li>Plants list</li>
  <li>Add and remove plants to be monitored</li>
  <li>Setting alarms for watering reminders</li>
  <li>Receiving alerts</li>
</ul>
