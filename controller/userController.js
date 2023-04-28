const User = require("../model/user");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendEmail = require("../utils/nodemailer");

module.exports.register = catchAsyncErrors(async (req, res) => {

  const { name, email, note } = req.body;

  try {

    const notefind = await User.findOne({
      note: note
    })

    if (notefind) {
      return res.status(400).json({
        status: "Success",
        message: "Already This Note Added"
      })
    }

    if (!name || !note || !email) {
      return res.status(400).json({
        status: "failed",
        message: "Please Complete This Mandatory Field."
      })
    }

    const user = await User.create({
      name: name,
      email: email,
      note: note,
    })

    await sendEmail(email, note)

    return res.status(200).json({
      status: "Success",
      message: "Success"
    })

  } catch (err) {
    console.log(err, 'err');
    res.send({
      status: false,
      message: "unable to registration",
    });
  }
}
);


