const sgMail = require('@sendgrid/mail');
require('dotenv').config({ path: '../.env' });

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = ({ user, template, templateData }) => {
  const msg = {
    to: user.email,
    from: 'projectagora2021@gmail.com',
    template_id: template,
    dynamic_templateData: templateData,
  };
  sgMail.send(msg);
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
