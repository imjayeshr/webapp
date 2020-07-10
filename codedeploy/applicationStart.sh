#Start the pm2 server again
cat /home/ubuntu/webapp/rds.txt >> /etc/environment
source /etc/environment
sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl -a fetch-config -m ec2 -c file:/home/ubuntu/webapp/cloudwatch-config.json -s
sleep 5
sudo chmod 777 /home/ubuntu/webapp
echo "Path is $PATH"
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u ubuntu --hp /home/ubuntu
#cd /home/ubuntu/webapp/
#pwd
#export HOME='/home/ubuntu'
sudo pm2 start /home/ubuntu/webapp/server.js
crontab /home/ubuntu/webapp/codedeploy/crontab.txt

#sudo PM2_HOME='/home/ubuntu/.pm2' pm2 start /home/ubuntu/webapp/server.js
#pm2 start server.js
sleep 5
#sudo pm2 save
#PM2_HOME='/home/ubuntu/.pm2' pm2 list
#PM2_HOME='/home/ubuntu/.pm2' pm2 save
#echo "App start is getting executed"