const nodemailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');

const auth = {
    auth: {
        api_key: 'API_KEY',
        domain: 'MY_DOMAIN'
    }
};

const transporter = nodemailer.createTransport(mailGun(auth));


//function 
const sendMail = (email, name, tel, type, message, subject) => {

    const mailOptions = {
        from: email,
        to: 'dimiturivanov92@gmail.com',
        subject,
        html: `<p>Име: ${name}</p><br>
        <p>Телефон: ${tel}</p><br>
        <p>Имейл: ${email}</p><br>
        <p>Тип: ${type}</p><br>
        <p>Съобщение: ${message}</p><br>`
    }

    transporter.sendMail(mailOptions, function(err, data){
        if(err){
            console.log(err);
        } else {
            console.log("Message sent!");
        }
    })

}

module.exports = sendMail;

