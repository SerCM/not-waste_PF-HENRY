// const nodemailer = require("nodemailer")

const nodemailer = require("nodemailer");

const enviarMail = async (req, res) => {
  try {
    const config = {
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: "gabrielkpo774@gmail.com",
        pass: "wmdlkwiwxyfelinf",
      },
      tls: {
        rejectUnauthorized: false,
      },
    };
    const mensajedejavi = {
      from: "gabrielkpo774@gmail.com",
      to: req.body.email,
      subjet: "Correo de prueba",
      text: `${req.body.mensaje}`,
    };
    const transport = nodemailer.createTransport(config);
    const info = await transport.sendMail(mensajedejavi);
    res.send(info);
  } catch (error) {
    console.log(error);
  }
};


module.exports  = {
  enviarMail,
}
