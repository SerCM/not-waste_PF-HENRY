// const nodemailer = require("nodemailer")

const nodemailer = require("nodemailer")

const enviarMail = async (req, res) => {
    try {
          const config = {
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: "richardjavierojeda2021@gmail.com",
        pass: "mvvmrowmzzaaqfvk",
      },
      tls: {
        rejectUnauthorized: false
    }
    };
    const mensajedejavi = {
      from: "richardjavierojeda2021@gmail.com",
      to: req.body.email,
      subjet: "Correo de prueba",
      text: `${req.body.mensaje}`,
    };
    const transport = nodemailer.createTransport(config);
    const info = await transport.sendMail(mensajedejavi);
    res.send(info)
    } catch (error) {
       console.log(error)
    }
  
  };
  // enviarMail(req.body.email)

module.exports = enviarMail