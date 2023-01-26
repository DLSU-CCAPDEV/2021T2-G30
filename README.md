![Safe Space](https://i.imgur.com/IUWnDqn.jpeg)
* Safe Space is a journaling/diary web application that aims to bring people together through transparent entry creations and letter sending.
* A Wi-Fi connection and enabling Javascript in the browser is required to get the best experience from the web application. 
* The application is currently deployed and can be found through this link: https://safespace-ph.herokuapp.com/
* Instructions to run the web application locally can be found below. 

## Contributors
- [Buensalida, Matthew C.](https://github.com/matthews-code)
- [Dimaculangan, William Mitchell C.](https://github.com/dot-william)
- [Rosima, Rayvhen Mico M.](https://github.com/dslbis)

## Dependencies
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [body-parser](https://www.npmjs.com/package/body-parser)    
- [connect-mongo](https://www.npmjs.com/package/connect-mongo)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [express](https://www.npmjs.com/package/express)
- [express-handlebars](https://www.npmjs.com/package/express-handlebars)
- [express-session](https://www.npmjs.com/package/express-session)
- [express-validator](https://www.npmjs.com/package/express-validator)
- [gridfs-stream](https://www.npmjs.com/package/gridfs-stream)
- [method-override](https://www.npmjs.com/package/method-override)
- [mongoose](https://www.npmjs.com/package/mongoose)
- [multer](https://www.npmjs.com/package/multer)
- [multer-gridfs-storage](https://www.npmjs.com/package/multer-gridfs-storage)

## Dev Dependencies
- [nodemon](https://www.npmjs.com/package/nodemon)

## Third Party Libraries Used

- [JQuery](https://jquery.com/) 
- [FullCalendar](https://fullcalendar.io/)
- [Bootstrap](https://getbootstrap.com/)
- [Font Awesome](https://fontawesome.com/)

## Instructions when Running Web Application Locally
1. Clone the repository by using the command below (note: git should be installed in your system for this to work).

```
git clone https://github.com/DLSU-CCAPDEV/2021T2-G30.git 
```

2. Open Command Prompt

3. Navigate to the project folder - the folder containing the contents of the cloned or downloaded repository.

4. Run the command ```npm install``` to initialize and install all necessary modules used in the project.

5. Run the server by typing running the command ```npm run start```. Upon running the command, your Command Prompt should display the following statement:

```
Server running at:
http://localhost:3000/login
```

6. Go to the link below to access the web applcation:
```
http://localhost:3000/login
``` 

7. **Note:** A Wi-Fi connection is required to run the application since it uses libraries sourced from the internet. You must also create a .env file with the following format to run the application successfully:
```
HOSTNAME=localhost
PORT=3000
DB_URL=<database link>
```

## Safe Space Features
- [Features](https://drive.google.com/file/d/1Z3nS5hH5BAZBP3QdYXk5sbwz7DsO2rDD/view?usp=sharing) - Safe Space's list of features can be viewed through this link.

## Images used for creating Dummy Data
* https://unsplash.com/photos/3ckWUnaCxzc 
* https://unsplash.com/photos/FgSyP02I0gw
* https://unsplash.com/photos/toQNPpuDuwI
* https://unsplash.com/photos/_wkd7XBRfU4
* https://unsplash.com/photos/m_HRfLhgABo
* https://www.walpaperlist.com/2020/01/4k-wallpaper-vertical.html
* https://pbs.twimg.com/media/ErNNDilVcAEJC9Z?format=jpg&name=large
* https://pbs.twimg.com/media/Et1RWuBVkAIiCqa?format=jpg&name=large
* https://pbs.twimg.com/media/Ex-5OfaXMAYu8V1?format=jpg&name=large
* https://i.pinimg.com/originals/0b/04/4c/0b044c5ecf1c0dbc78ba558cdb49ed55.jpg
* https://d2skuhm0vrry40.cloudfront.net/2018/articles/2018-12-20-16-07/-1545322040490.jpg/EG11/resize/1200x-1/-1545322040490.jpg
* https://pbs.twimg.com/media/EQat-vHU4AAU1bs?format=jpg&name=360x360
* https://pbs.twimg.com/media/ExdbncfUUAId4lJ?format=jpg&name=900x900
* https://pbs.twimg.com/media/EgHfeBbWoAAZkrG?format=jpg&name=900x900
* https://pbs.twimg.com/media/EVQYyC5U0AA5cY_?format=jpg&name=medium
* https://pbs.twimg.com/media/EVfprcgUMAAqENB?format=jpg&name=large
* https://pbs.twimg.com/media/EUi8tH2UcAAT1hu?format=jpg&name=small
* https://pbs.twimg.com/media/ERem2FiVUAAQgdv?format=jpg&name=medium
* https://pbs.twimg.com/media/EmkgkDUVMAA7mu4?format=jpg&name=large
* https://pbs.twimg.com/media/Exdmu4mUcAI35l4?format=jpg&name=small
* https://pbs.twimg.com/media/ExG2948VoAIAuJS?format=png&name=small
* https://pbs.twimg.com/media/EvrrtzaXMAMVxgZ?format=jpg&name=large
* https://pbs.twimg.com/media/Evq5_anWQAAyi02?format=jpg&name=medium
* https://www.pinterest.ph/pin/472244710907739481/ - Scenery
* https://www.pinterest.ph/pin/586312445235684854/ - Attack on Titan Scenery
* https://www.pinterest.ph/pin/27584616451442054/ - Kimi no Nawa Scenery
* https://br.pinterest.com/pin/832884524819810214/ - Weathering with you scenery 
* https://en.wikipedia.org/wiki/File:Sample_User_Icon.png 
* https://icons8.com/icon/51975/time-capsule
* https://icons-for-free.com/delete+remove+trash+trash+bin+trash+can+icon-1320073117929397588/
<!-- * https://www.facebook.com/DpcRosima/ Respective Pictures from Rayvhen Mico Rosima
* https://www.facebook.com/matthew.buensalida.1 Repsective Pictures from Matthew Buensalida
* https://www.facebook.com/william.cruz.dimaculangan Respective Picture from William Dimaculangan -->

*Copyright Disclaimer under section 107 of the Copyright Act 1976, allowance is made for “fair use” for purposes such as criticism, comment, news reporting, teaching, scholarship, education and research.*
*Fair use is a use permitted by copyright statute that might otherwise be infringing.*
*Non-profit, educational or personal use tips the balance in favor of fair use.*
