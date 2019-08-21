cd ~/voprosnik
git checkout master
git pull origin master

cd ~/voprosnik/client/admin
npm install
bower install
npm run production


cd ~/voprosnik/client/widget
npm install
npm run production


cd ~/voprosnik/client/auth
npm install
npm run production


cd ~/voprosnik/client/landing
npm install
npm run production
