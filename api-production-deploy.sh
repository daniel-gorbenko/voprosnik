cd ~/voprosnik
git checkout master
git pull origin master

cd ~/voprosnik/server
npm install
./node_modules/forever/bin/forever stopall
npm run production