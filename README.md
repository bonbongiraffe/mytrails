![MyTrials Logo](./client/src/myTrails.png "MT-logo")
# MyTrails
### About:
Share your hiking adventures with your friends on MyTrails, a social media website designed for the outdoors. Search trails from a database of over fifty trails and national parks here in the US (trails and parks from abroad to be added soon!). After your hiking excursions, post your trail review with difficulty rating to your profile, favorite your best hikes, and view other users' posts and hikes in the social page. Join a growing network of outdoor enthusiasts at MyTrails today!

Cloen the `mytrails` repository onto your local machine and simply run `bash launch.sh` from the project directory in your Ubuntu terminal to get started! *Detailed steps outlined at the end*

1. ### User Experience:
    - create an account and login
        - with option for uploading profile picture
    - search from custom database of national parks and other trails
        - with functional auto-complete
    - post trail reviews and hike details
    - view other users' reviews and hike posts
2. ### Models:
    - User --> Hike <-- Trail
    - User: username, _password_hash, profile_image
        - validates: username, 
    - Hike: Difficulty, Rating, Review, Favorite
        - validates: Difficulty
    - Trail: name, location, park, image
3. ### Back-end (Flask):
    - RESTful routes for CRUD:
        - `/users`
            - create, read
        - `/trails`
            - read
        - `/hikes`
            - create, read
        - `/hikes/<id>`
            - update, delete
    - user authentication (non-restful): `/login`, `/signup`, `/authorized`, and `/logout`
4. ### Front-end (React.js):
    - `/home`
        - login/signup form in navbar, trail search
    - `/hikes`
        - user's hikes cards with favorite button, hike search, hike form
    - `/social`
        - other users' profile cards and hikes
5. ### Libraries: 
    - bcrypt (`python`) for password hashing
    - semantic ui (`js`) for styling
6. ### Next Steps:
    - socials page features:
        - thumbs-up button 
        - commenting functionality

## Quick-Start Guide
1. Clone repository onto your local machine: `git clone git@github.com:bonbongiraffe/mytrails.git`
2. Navigate in your terminal to the parent directory, `/mytrails`
3. Install the backend virtual environment: `pipenv install`
4. Install the frontend dependencies: `npm install --prefix client`
5. Start the backend server from `/mytrails/server` with `python app.py`
6. Start the frontend server from `/mytrails/client` with `npm start` *in a separate terminal window*
7. Open `http://localhost:3000` in your browser to view the project

### Thank you for viewing our project!
### —Alexis Boucovalas
### —Shanley Caswell
### —Francesco Wai
