//alcm opsv ayxh qsaw

const nodemailer=require('nodemailer')

// create tranpoter configuration 

const tranpoter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'gauravchotu58@gmail.com',
        pass:'tguqraayvkghvgbk'


    }
})

//create mailoption..

const sentmail=async(to,subject,text)=>{

    const mailoptions={
        from:'gauravchotu58@gmail.com',
        to:to,
        subject:subject,
        text:text,
    }
    try {
        const info=await tranpoter.sendMail(mailoptions);
        return info;
        
    } catch (error) {
        console.error(error);
        return null;
        
    }

}


module.exports=sentmail;