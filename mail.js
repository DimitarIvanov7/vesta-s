const nodemailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');

const auth = {
    auth: {
        api_key: '0032fe0cc2762c88b58397edb12631f4-ef80054a-40225d40',
        domain: 'sandbox0b805705e54940ac818e2bd7be6b8de8.mailgun.org'
    }
};

const transporter = nodemailer.createTransport(mailGun(auth));

const mailOptions = {
    from: 'dimiturivanov92@gmail.com',
    to: 'dimiturivanov92@gmail.com',
    subject: 'Teting',
    text: 'Test',
}

transporter.sendMail(mailOptions, function(err, data){
if(err){
    console.log(err);
} else {
    console.log("Message sent!");
}
})