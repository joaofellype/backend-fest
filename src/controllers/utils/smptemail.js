import nodemailer from 'nodemailer'


async function main(params={}){
    console.log(params)
    let  transporter = await nodemailer.createTransport({
        
        service:'gmail',
        auth:{
            user:process.env.USERNAME_MAIL,
            pass:process.env.PASSWORD_MAIL
        }

    });

    let info = await transporter.sendMail({

        from:params.from,
        to:params.to,
        subject:params.subject,
        text:params.text
    });


  

}

export default  main