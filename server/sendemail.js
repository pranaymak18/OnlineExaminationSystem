
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing


  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
        user: '',
        pass: ''
    }
});

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'noreply@harshmahyavanshi-49a91.firebaseapp.com', // sender address
    to: "pranaymakwana00@gmail.com", // list of receivers
    subject: "Registration Email Testing", // Subject line
    text: "Received my email right? ", // plain text body
    html: "Received my email right?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);
