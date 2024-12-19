const nodemailer = require("nodemailer");
const { CustomError, ERROR_MESSAGES, ERROR_CODES } = require("../utils/errors");

const sendQuoteEmail = async (req, res, next) => {
  const { firstName, lastName, email, phoneNumber, city, state, details } =
    req.body;

  // Create a transporter object using SMTP transport
  const transporter = nodemailer.createTransport({
    service: process.env.ADMIN_EMAIL_SERVICE, // Use your email service
    auth: {
      user: process.env.ADMIN_EMAIL, // Your email address
      pass: process.env.ADMIN_EMAIL_PASSWORD, // Your email password
    },
  });

  // Set up email data
  const mailOptions = {
    from: "diabloexcavation.com",
    to: "info@diabloexcavation.com", // to Company email
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
    console.error("error sending email");

    if (error instanceof CustomError) {
      return next(error);
    }
    return next(
      new CustomError(ERROR_MESSAGES.INVALID_DATA, ERROR_CODES.UNAUTHORIZED)
    );
  }
};

module.exports = { sendQuoteEmail };
