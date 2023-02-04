/* eslint-disable no-unused-vars */
const sgMail = require('@sendgrid/mail');
require('dotenv').config({ path: '../.env' });

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// const sendEmail = ({ user, template, templateData }) => {
const sendEmail = ({ user, template, templateData }) => {
  const msg = {
    to: user.email,
    // from: 'projectagora2021@gmail.com',
    from: 'juansmuar@gmail.com',
    // template_id: template,
    // dynamic_templateData: templateData,
    subject: 'Sending confirmation with SendGrid',
    text: 'This is a registry confirmation email with Node.js',
    html: '<strong>Easy to do anywhere, even with Node.js</strong>',
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent to', user.email);
    })
    .catch((error) => {
      console.error(error);
    });
};

// const user = {
//   name: "Esteban",
//   email: "leramirezca@gmail.com"
// }
// sendEmail({
//   user: user,
//   template: 'd-0bc86a7e18464b9191cb127be79f094c',
//   templateData: {"name": user.name}
// })

module.exports = sendEmail;
