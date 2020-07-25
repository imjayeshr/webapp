const aws = require("aws-sdk");
const logger = require("../../config/winston-logger");
const User = require("../models/user");

var sns = new aws.SNS({
  region: "us-east-1",
});

exports.emailSNS = (req, res) => {
  let email = req.body.email;
  let paramsTopic = {
    Name: "password_reset",
  };


  User.count({ where: { email: email } }).then((count) => {
    // If the user exists in the database
    if (count > 0) {
      sns.createTopic(paramsTopic, (err, data) => {
        if (err) {
          logger.error(`Error with the SNS topic. Error: ${err}`);
          res.send(err);
        } else {
          logger.info("SNS Topic is", data.TopicArn);
    
          let params = {
            Message: email,
            TopicArn: data.TopicArn,
          };
    
          sns.publish(params, (err, data) => {
            if (err) {
              logger.error(
                "Couldn't publish the message to the topic - ," +
                  data.TopicArn +
                  "Error: " +
                  err
              );
              res.send(err);
            } else {
              logger.info(
                "Message published to SNS topic successfully. Email is ",
                email
              );
              res.send(data);
            }
          });
        }
      });
    }
    else {
      res.send("User not in the database");
    }
  });




};