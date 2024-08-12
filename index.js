const functions = require('@google-cloud/functions-framework');

const sendGridMail = require('@sendgrid/mail');
sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendEmail(message) {
  const emailTo = process.env.EMAIL_TO;
  const emailFrom = process.env.EMAIL_FROM;
  // Prepare the email data
  const emailData = {
    to: emailTo, // Replace with your email address
    from: emailFrom,
    subject: 'GCP Cloud Build Notification',
    text: `Cloud Build ${message}.`,
    html: `<strong>Cloud Build ${message}.</strong>`,
  };

  try {
    await sendGridMail.send(emailData);
    console.log('Test email sent successfully');
  } catch (error) {
    console.error('Error sending test email');
    console.error(error);
    if (error.response) {
      console.error(error.response.body)
    }
  }
}

// Register a CloudEvent callback with the Functions Framework that will
// be executed when the Pub/Sub trigger topic receives a message.
functions.cloudEvent('sendEmail', cloudEvent => {
  // The Pub/Sub message is passed as the CloudEvent's data payload.
  const data = cloudEvent.data.message.data;

  const message = data
    ? Buffer.from(data, 'base64').toString()
    : '';

  sendEmail(message);
  console.log(`send email ${message}`);
});
