const nodemailer = require("nodemailer");

const sendFormEmail = async (req, res) => {
  const { firstName, lastName, email, phoneNumber, city, state, details } =
    req.body;

  // Create a transporter object using SMTP transport
  const transporter = nodemailer.createTransport({
    service: "gmail", // Use your email service
    auth: {
      user: "moorek11c@gmail.com", // Your email address
      pass: "vrxv hbgr mjlo vemg", // Your email password
    },
  });

  // Set up email data
  const mailOptions = {
    from: "moorek11c@gmail.com",
    to: "moorek11c@gmail.com", // Recipient email address
    subject: "New Quote Request",
    text: `
      First Name: ${firstName}
      Last Name: ${lastName}
      Email: ${email}
      Phone Number: ${phoneNumber}
      City: ${city}
      State: ${state}
      Details: ${details}
    `,
  };

  try {
    // Send email
    await transporter.sendMail(mailOptions);
    res.status(200).send({ message: "Email sent successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error sending email" });
  }
};

module.exports = { sendFormEmail };
