# How to run it:
    npm i -g pm2
    pm2 start index.js

#How to see logs:
pm2 log 0



#References:
https://www.freecodecamp.org/news/you-should-never-ever-run-directly-against-node-js-in-production-maybe-7fdfaed51ec6/
https://nodesource.com/blog/running-your-node-js-app-with-systemd-part-1/


kill -9 $(sudo lsof -t -i:9001)