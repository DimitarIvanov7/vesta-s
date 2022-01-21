const nodemailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');

const auth = {
    auth: {
        api_key: '0032fe0cc2762c88b58397edb12631f4-ef80054a-40225d40',
        domain: 'sandbox0b805705e54940ac818e2bd7be6b8de8.mailgun.org'
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

