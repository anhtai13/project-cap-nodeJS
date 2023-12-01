import nodemailer from 'nodemailer';

export const sendSimpleEmail = async (emailUser) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: "viettranquocdo311@gmail.com", // generated ethereal user
            pass: "Ben2001@", // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"TranViet.com" <viettranquocdo311@gmail.com>', // sender address
        to: "viettranquocdo311@gmail.com", // list of receivers
        subject: "Cửa hàng Laptop Shop kính chào quý khách ", // Subject line
        html: 'Cảm ơn Bạn đã ghé thăm cửa hàng chúng tôi',
    });
}