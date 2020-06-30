#Start the pm2 server again
cat /home/ubuntu/webapp/rds.txt >> /etc/environment
source /etc/environment
sleep 5
sudo pm2 start /home/ubuntu/webapp/server.js
echo "App start is getting executed"