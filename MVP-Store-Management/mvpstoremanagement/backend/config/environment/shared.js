'use strict';
var fromMail = '"Wise Enroll" <info@cognitiveinnovations.in>';
var moment = require('moment');
var config = require('../../config/environment');
var appUrl = config.frontendUrl;
var year = moment(new Date()).format('YYYY');
var EmailHeader = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
  <head>
    <!-- NAME: SELL PRODUCTS -->
    <!--[if gte mso 15]>
    <xml>
      <o:OfficeDocumentSettings>
        <o:AllowPNG />
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->
    <meta charset="UTF-8">
    <meta http-equiv="x-ua-compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Email Template </title>
    
  <style type="text/css">
    body{
      margin:0;
      padding:0;
      font-size: 16px;
      
    }
    .main{
      background:#FFFFFF;
      border:1px solid #DADADA;
      max-width:600px;
    }
    .emailContainer{
      /*max-width:600px;
      margin:0 auto;
      border:1px solid #DADADA;*/
    }
    .img-responsive{
      width:100%;
    }
    .companylogo{
      width:174px;
      background:url(`+ appUrl + `/assets/email/shadow.png) no-repeat left top;
      padding:10px 25px;
      margin-left:10px;
      margin-top:10px;
    }
    .companylogo img{
      width:88px;
    }
    .footer-logo{
      margin-top:35px;
            margin-right:80px
    }
    .banner{
      background:url(`+ appUrl + `/assets/email/header-image-2.png) no-repeat left top;
      width:100%;
      height:286px;
    }
    .footer{
      background:url(`+ appUrl + `/assets/email/footer-image.png) no-repeat left top;
      width:100%;
      height:120px;
    }
        .content, .content-footer{
        padding:20px;
        }
         .link{
         padding:10px 25px; 
         margin:10px 0;
         background-color: #2680eb;
         color:#fff;
         border: none;
         border-radius: 5px;
         -moz-border-radius: 5px;
         -webkit-border-radius: 5px;
         font-size: 16px;
         font-weight: 600;
         cursor: pointer;
         }
         
  @media screen and (max-width: 768px){
    .companylogo{
      width:100px !important;
      background-size:contain !important;
    }
    .companylogo img{
      width:50px !important;
    }
  
    table{
      width:100%;
    }
        .banner{
          background-size: cover !important;
          height: 190px !important;
    }

    .footer-logo{
         text-align:left;
        }
}

</style></head>
  <body>
    <table class="main" width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
      <tr>
        <td align="left" valign="top" class="banner">
          <table style="width:100%;">
            <tr>
              <td align="left" valign="top" width="100%">
                <div class="companylogo">
                  <img src="`+ appUrl + `/assets/email/wiseenroll-logo.png" alt="wiseenroll-logo.png">
                </div>
              </td>
             
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td align="left" valign="top">
          <table style="width:100%;">
            <tbody>
              
              <tr>`;
var EmailFooter = `</tr> </tbody></table></td></tr><tr>
  <td align="left" valign="top" class="content-footer">
    <p style="color: #0A84C8;margin-top: 44px;line-height: 20px;">WISE ENROLL respects your privacy. To learn
      more, read our Privacy Statement. If you have any questions or comments, please DO NOT REPLY to this
      email.</p>
  <p style="color: #0A84C8;"> Copyrights @WISEENROLL `+ year + `. All rights reserved.</p>
  </td>
</tr>
<tr>
<td align="left" valign="top" class="footer">
<table width="100%" style="width:100%;">
<tr>
    <td valign="top" width="100%" align="right">
        <div class="footer-logo">
      <img src="`+ appUrl + `/assets/email/wiseenroll_logo_2.png" alt="wiseenroll_logo_2.png">
    </div>
  </td>
</tr>
</table>
</td>
</tr>
</table>
</body>
</html>`;
exports = module.exports = {

  mailOptions: {

    // Email After Registration
    newEndorecement: function (body) {
      //  body.email = ['danderaja@gmail.com','manidande@gmail.com', 'rajasekhardande16@gmail.com']
      return {
        from: fromMail,
        to: body.email,
        subject: 'You have a Request For Endorsement.Click on the click to endorse',
        html: EmailHeader + `<td align="left" valign="top" class="content">
                <div style="margin-left: 15px;">
         <h3 style="color:#353535;">Hi...!</h3>
         <p style="color:#353535;">`+ body.name + ` is asking endorcement forthe skill of ` + body.skillName + ` </p>
         <p style="color:#353535;">Please endorse my skill set by clicking on link below.</p>
         <div style="text-align: center;">
             <a class="link" href="`+ appUrl + `/home/Endorsement/` + body.id + `">CLICK HERE</a>
         </div>
     </div>
             </td>` + EmailFooter
      }
    },
    thanksEndorecement: function (body) {
      return {
        from: fromMail,
        to: body.email,
        subject: 'Thanks for giving the endorsement.',
        html: EmailHeader + 'Thanks for giving the endorsement' + EmailFooter,
      }
    },
    interview: function (body) {
      if (body.location) {
        return {
          from: fromMail,
          to: body.email,
          // subject: "interview with " + body.companyname + '-' + moment(new Date(body.time)).format('YYYY-MM-DD'),
          subject: "interview with " + body.companyname + '-' + moment(new Date(body.time)).format('YYYY-MM-DD'),
          // html: 'You have an interview at ' + body.location + ' on ' + moment(new Date(body.time)).format('YYYY-MM-DD') + ' ' + moment(new Date(body.time)).format('h:mm a'),
          html: EmailHeader + `<td align="left" valign="top" class="content">
          <div style="margin-left: 15px;">
          <h3 style="color:#353535;">Hi...!</h3>
         <p style="color:#353535;">With reference to your application for placement in our organization, we are pleased to inform you that your profile has been shortlisted. We would like to invite you for an interview to have a personal interaction.</p>
         <p> Please find the interview schedule details below.</p>
 
         <p>Date of interview	:   `+ moment(new Date(body.time)).format('YYYY-MM-DD') + `</p>
 
         <p>Time			:   `+ moment(new Date(body.time)).format('HH:mm') + `</p>
  
 
         <p>Venue:`+ body.location + `</p>

         <p>Mode Of Interview : Face to Face </p>

         <p>Job Title:`+ body.job_title + `</p>

 
 
         <p>Please carry a copy of your resume while coming. If you need any assistance, please feel free to contact me at the `+body.contact+`.</p>
 
         <p>Regards,</p>
 
         <p>HR  ` + body.companyname + ` </p> 

         </div>
       </td>` + EmailFooter
        }
      }
      if (body.interview_url) {
        return {
          from: fromMail,
          to: body.email,
          subject: "interview with " + body.companyname + '-' + moment(new Date(body.time)).format('YYYY-MM-DD'),
          // html: 'You have an interview at ' + body.interview_url + ' from  ' + moment(new Date(body.time)).format('YYYY-MM-DD') + ' ' + moment(new Date(body.time)).format('h:mm a') + '   to' + moment(new Date(body.interview_url_expire_time)).format('YYYY-MM-DD') + ' ' + moment(new Date(body.interview_url_expire_time)).format('h:mm a') + ' by ' + body.companyname + '.',
          html: EmailHeader + `<td align="left" valign="top" class="content">
          <div style="margin-left: 15px;">
          <h3 style="color:#353535;">Hi...!</h3>
         <p style="color:#353535;">With reference to your application for placement in our organization, we are pleased to inform you that your profile has been shortlisted. We would like to invite you for an interview to have a personal interaction.</p>
         <p> Please find the interview schedule details below.</p>


         <p>Job Title:`+ body.job_title + `</p>

         <p>Date of interview	:   `+ moment(new Date(body.time)).format('YYYY-MM-DD') + `</p>
 
         <p>Time			:   `+ moment(new Date(body.time)).format('HH:mm') + `</p>
  
         <p>Mode Of Interview  ` + body.mode + ` </p> 

         <p>Video call URL:`+ body.interview_url + `</p>

          
 
         <p> please feel free to contact me at the `+body.contact+`.</p>
 
         <p>Regards,</p>
 
         <p>HR  ` + body.companyname + ` </p> 
       
         </div>
       </td>` + EmailFooter
        }

      } else {
        return {
          from: fromMail,
          to: body.email,
          subject: "interview with " + body.companyname + '-' + moment(new Date(body.time)).format('YYYY-MM-DD'),
          // html: 'You have an interview  on ' + moment(new Date(body.time)).format('YYYY-MM-DD') + ' ' + moment(new Date(body.time)).format('h:mm a') + ' by ' + body.companyname + '.',
          html: EmailHeader + `<td align="left" valign="top" class="content">
          <div style="margin-left: 15px;">
          <h3 style="color:#353535;">Hi...!</h3>
         <p style="color:#353535;">With reference to your application for placement in our organization, we are pleased to inform you that your profile has been shortlisted. We would like to invite you for an interview to have a personal interaction.</p>
         <p> Please find the interview schedule details below.</p>
 
         <p>Date of interview	:   `+ moment(new Date(body.time)).format('YYYY-MM-DD') + `</p>
 
         <p>Time			:   `+ moment(new Date(body.time)).format('HH:mm') + `</p>
 
         <p>Mode Of Interview  ` + body.mode + ` </p> 

         <p>Job Title:`+ body.job_title + `</p>

 
         <p>Note: Please revert with the confirmation mail.</p>
 
         <p>Please carry a copy of your resume while coming. If you need any assistance, please feel free to contact me at the `+body.contact+`.</p>
 
         <p>Regards,</p>
 
         <p>HR  ` + body.companyname + ` </p> 
       
         </div>
       </td>` + EmailFooter
        }
      }
    },
    sendsubusermail: function (body) {
      if (body.location) {
        return {
          from: fromMail,
          to: body.email,
          subject: "you have assigned for an  interview  ",
          // html: 'You have an interview at ' + body.location + ' on ' + moment(new Date(body.time)).format('YYYY-MM-DD') + ' ' + moment(new Date(body.time)).format('h:mm a'),
          html: EmailHeader + `<td align="left" valign="top" class="content">
          <div style="margin-left: 15px;">
         <h3 style="color:#353535;">Hi...!</h3>
         <p style="color:#353535;">This email is to inform you about  interview  has been created to the candidate</p>
        <p>Here are the interview details:</p>
        <p>Please find the interview schedule details below.</p>
        <p>Date of interview	:   November 15, 2019 (Friday)</p>
 
        <p>Time			:  `+ body.time + `</p>
 
        <p>Thanks & Regards,</p>
         <p>HR `+ body.companyname + `</p>
         </div>
         </td>` + EmailFooter
        }
      }
      if (body.interview_url) {
        return {
          from: fromMail,
          to: body.email,
          subject: "you have assigned for an  interview  ",
          // html: 'You have an interview at ' + body.interview_url + ' from  ' + moment(new Date(body.time)).format('YYYY-MM-DD') + ' ' + moment(new Date(body.time)).format('h:mm a') + '   to' + moment(new Date(body.interview_url_expire_time)).format('YYYY-MM-DD') + ' ' + moment(new Date(body.interview_url_expire_time)).format('h:mm a'),
          html: EmailHeader + `<td align="left" valign="top" class="content">
          <div style="margin-left: 15px;">
         <h3 style="color:#353535;">Hi...!</h3>
         <p style="color:#353535;">This email is to remind you about your interview for `+ body.postion_name + ` position with `+ body.companyname + `. </p>
        <p>Here are the interview details:</p>
        <p>Please find the interview schedule details below.</p>
        <p>Date of interview	:   November 15, 2019 (Friday)</p>
 
        <p>Time			:   11:00 AM</p>
 
        <p>Point of Contact	:   Sathish </p>
 
        <p>Video call URL:`+body.interview_url+`</p>


 
        <p>In case you have any additional questions, please don't hesitate to ask.</p>
 
        <p>Please carry a copy of your resume while coming. If you need any assistance, please feel free to contact me at the `+body.contact+`.</p>
 
        <p>Thanks & Regards,</p>
         <p>HR `+ body.companyname + `</p>
         </div>
         </td>` + EmailFooter
        }

      } else {
        return {
          from: fromMail,
          to: body.email,
          subject: "you have assigned for an  interview  ",
          // html: 'You have an interview  on ' + moment(new Date(body.time)).format('YYYY-MM-DD') + ' ' + moment(new Date(body.time)).format('h:mm a'),
          html: EmailHeader + `<td align="left" valign="top" class="content">
          <div style="margin-left: 15px;">
         <h3 style="color:#353535;">Hi...!</h3>
         <p style="color:#353535;">This email is to remind you about your interview for`+ body.postion_name + ` position with `+ body.companyname + `. </p>
        <p>Here are the interview details:</p>
        <p>Please find the interview schedule details below.</p>
        <p>Date of interview	:   November 15, 2019 (Friday)</p>
 
        <p>Time			:   11:00 AM</p>
 
        <p>Point of Contact	:   Sathish </p>
 
        <p>Venue:</p>

 
        <p>In case you have any additional questions, please don't hesitate to ask.</p>
 
        <p>Please carry a copy of your resume while coming. If you need any assistance, please feel free to contact me at the `+body.contact+`.</p>
 
        <p>Thanks & Regards,</p>
         <p>HR `+ body.companyname + `</p>
         </div>
         </td>` + EmailFooter
        }
      }
    },
    remaindermail: function (body) {
      if (body.location) {
        return {
          from: fromMail,
          to: body.email,
          subject: "interview remainder for  " + body.company_name + '-' + moment(new Date(body.time)).format('YYYY-MM-DD'),
          // html: 'You have an interview at ' + body.location + ' on ' + moment(new Date(body.time)).format('YYYY-MM-DD') + ' ' + moment(new Date(body.time)).format('h:mm a'),
          html: EmailHeader + `<td align="left" valign="top" class="content">
          <div style="margin-left: 15px;">
         <h3 style="color:#353535;">Hi...!</h3>
         <p style="color:#353535;">This email is to remind you about your interview for `+ body.postion_name + ` position with ` + body.company_name + `. </p>
        <p>Here are the interview details:</p>
        <p>Please find the interview schedule details below.</p>

        <p>Date of interview	:  ` + moment(new Date(body.time)).format('YYYY-MM-DD') + `</p>
 
        <p>Time			: ` + moment(new Date(body.time)).format('h:mm a') + `</p>
 
      
        <p>Venue:`+ body.location + `</p>

        <p>Mode Of Interview  ` + body.mode + ` </p> 


 
        <p>In case you have any additional questions, please don't hesitate to ask.</p>
 
        <p>Please carry a copy of your resume while coming. If you need any assistance, please feel free to contact me at the `+body.contact+`.</p>
 
        <p>Thanks & Regards,</p>
         <p>HR `+ body.company_name + `</p>
         </div>
         </td>` + EmailFooter
        }
      }
      if (body.interview_url) {
        return {
          from: fromMail,
          to: body.email,
          subject: "interview remainder for  " + body.company_name + '-' + moment(new Date(body.time)).format('YYYY-MM-DD'),
          // html: 'You have an interview  at ' + body.interview_url + ' from  ' + moment(new Date(body.time)).format('YYYY-MM-DD') + ' ' + moment(new Date(body.time)).format('h:mm a') + '   to' + moment(new Date(body.interview_url_expire_time)).format('YYYY-MM-DD') + ' ' + moment(new Date(body.interview_url_expire_time)).format('h:mm a') + ' by ' + body.companyname + '.',
          html: EmailHeader + `<td align="left" valign="top" class="content">
          <div style="margin-left: 15px;">
         <h3 style="color:#353535;">Hi...!</h3>
         <p style="color:#353535;">This email is to remind you about your interview for `+body.postion_name +` position with `+ body.company_name+`. </p>
        <p>Here are the interview details:</p>
        <p>Please find the interview schedule details below.</p>
        <p>Date of interview	:  ` + moment(new Date(body.time)).format('YYYY-MM-DD') + `</p>
 
        <p>Time			: ` + moment(new Date(body.time)).format('h:mm a')+ `</p>
 
 
        <p>Video call URL:`+body.interview_url+`</p>

        <p>Mode Of Interview  ` + body.mode + ` </p> 

        
        <p>In case you have any additional questions, please don't hesitate to ask.</p>
 
        <p>Please carry a copy of your resume while coming. If you need any assistance, please feel free to contact me at the `+body.contact+`.</p>
 
        <p>Thanks & Regards,</p>
         <p>HR `+ body.company_name + `</p>
         </div>
         </td>` + EmailFooter
        }

      } else {
        return {
          from: fromMail,
          to: body.email,
          subject: "interview remainder " + body.company_name + '-' + moment(new Date(body.time)).format('YYYY-MM-DD'),
          // html: 'You have an interview  on ' + moment(new Date(body.time)).format('YYYY-MM-DD') + ' ' + moment(new Date(body.time)).format('h:mm a') + ' by ' + body.companyname + '.',
          html: EmailHeader + `<td align="left" valign="top" class="content">
          <div style="margin-left: 15px;">
         <h3 style="color:#353535;">Hi...!</h3>
         <p style="color:#353535;">This email is to remind you about your interview for`+ body.postion_name + ` position with `+ body.company_name + `. </p>
        <p>Here are the interview details:</p>
        <p>Please find the interview schedule details below.</p>


        <p>Date of interview	:  ` + moment(new Date(body.time)).format('YYYY-MM-DD') + `</p>
 
        <p>Time			: ` + moment(new Date(body.time)).format('h:mm a')+ `</p>
 
 
        <p>Mode Of Interview  ` + body.mode + ` </p> 

 
        <p>In case you have any additional questions, please don't hesitate to ask.</p>
 
        <p>Please carry a copy of your resume while coming. If you need any assistance, please feel free to contact me at the `+body.contact+`.</p>
 
        <p>Thanks & Regards,</p>
         <p>HR `+ body.company_name + `</p>
         </div>
         </td>` + EmailFooter
        }
      }

    },
    interviewupdate: function (body) {
      return {
        from: fromMail,
        to: body.email,
        subject: 'interview updated ' + body.companyname + '-' + moment(new Date(body.time)).format('YYYY-MM-DD'),
        // html: 'Your  interview with ' + body.companyname + ' is updated and now on ' + moment(new Date(body.time)).format('YYYY-MM-DD') + ' ' + moment(new Date(body.time)).format('h:mm a') + '.',
        html: EmailHeader + `<td align="left" valign="top" class="content">
          <div style="margin-left: 15px;">
         <h3 style="color:#353535;">Hi...!</h3>
         <p style="color:#353535;">This email is to remind you about your interview for `+body.postion_name +` position with `+ body.company_name+`. </p>
        <p>Here are the interview details:</p>
        <p>Please find the interview schedule details below.</p>
        <p>Date of interview	:  ` + moment(new Date(body.time)).format('YYYY-MM-DD') + `</p>
 
        <p>Time			: ` + moment(new Date(body.time)).format('h:mm a')+ `</p>
 
 

 
        <p>In case you have any additional questions, please don't hesitate to ask.</p>
 
        <p>Please carry a copy of your resume while coming. If you need any assistance, please feel free to contact me at the `+body.contact+`.</p>
 
        <p>Thanks & Regards,</p>
         <p>HR `+ body.companyname + `</p>
         </div>
         </td>` + EmailFooter
      }
    },
    interviewsucessstatus: function (body) {
      return {
        from: fromMail,
        to: body.email,
        subject: "your interview with " + body.companyname + " status update ",
        // html: 'Congratulations!  you have been approved  for the job ' + body.job + ' in  ' + body.companyname + '.',
        html: EmailHeader + `<td align="left" valign="top" class="content">
          <div style="margin-left: 15px;">
         <h3 style="color:#353535;">Hi...!</h3>
         <p style="color:#353535;">Congratulations!  you have been approved  for the job `+ body.job_title + ` position with `+ body.companyname + `. </p>
       
        <p>In case you have any additional questions, please don't hesitate to ask.</p>
 
        <p>Thanks & Regards,</p>
         <p>HR `+ body.companyname + `</p>
         </div>
         </td>` + EmailFooter
      }
    },
    interviewrejectstatus: function (body) {
      return {
        from: fromMail,
        to: body.email,
        subject: "your interview with " + body.companyname + " status update ",
        // html: '  you have been rejected for the job ' + body.job + ' in  ' + body.companyname + '.',
        html: EmailHeader + `<td align="left" valign="top" class="content">
          <div style="margin-left: 15px;">
         <h3 style="color:#353535;">Hi...!</h3>
         <p style="color:#353535;">This email is to tell about `+ body.job + ` have been rejected for the job  from ` + body.companyname + `. </p>
         <p>We appreciate your participation</p>
        
        <p>Thanks & Regards,</p>
         <p>HR `+ body.companyname + `</p>
         </div>
         </td>` + EmailFooter
      }
    },
    interviewcancelstatus: function (body) {
      return {
        from: fromMail,
        to: body.email,
        subject: "your interview with " + body.companyname + " status update ",
        // html: 'Your interview with  ' + body.companyname + ' for the job ' + body.job + ' is canceled.',
        html: EmailHeader + `<td align="left" valign="top" class="content">
        <div style="margin-left: 15px;">
        <h3 style="color:#353535;">Hi..</h3>
        <p style="color:#353535;"> Your interview with  ` + body.companyname + ` for the job ` + body.job + ` is canceled.</p>
 
        </div>
     </td>` + EmailFooter
      }
    },
    verifyAccountEmail: function (body) {
      return {
        from: fromMail,
        to: body.email,
        subject: "Click on the link to verify",
        // html: "Link for verifying your E-mail id is :" + appUrl + "/home/verifyemail/?id=" + body.id,
        html: EmailHeader + `<td align="left" valign="top" class="content">
        <div>
       <h3 style="color:#353535; font-size: 18px;">Hi...! </h3>
       <p style="color:#353535;line-height: 28px;">You recently requested to verify the account click on the link to verify</p>

          <a href="`+ appUrl + `/home/verifyemail/` + body.id + `" class="link">Click Here</a>    
     
       

       <p style="color:#353535;font-weight:600;">Regards</p>
       <p style="color:#353535;">WISE ENROLL</p>
         </div>
       </td> `+ EmailFooter

      }
    },
    forgotPassword: function (body) {
      return {
        from: fromMail,
        to: body.email,
        subject: "Click on the link to change the password",
        html: EmailHeader + `<td align="left" valign="top" class="content">
                <div>
         <h5 style="color:#353535; font-size: 20px;">Forgot Password</h5>
         <h3 style="color:#353535; font-size: 18px;">Hi...! `+ body.userName + `</h3>
         <p style="color:#353535;line-height: 28px;">You recently requested to reset your password for your
                 Wise Enroll account. Click the link below to reset it.</p>

                 <a href="`+ appUrl + `/home/forgotpassword/` + body.id + `" class="link">Click Here</a>    
             
                 <p style="line-height: 28px;">
                     If you did not request the password
                     please ignore this email. This password reset is only valid for the next 30 minutes.
                 </p>

             <p style="color:#353535;font-weight:600;">Regards</p>
             <p style="color:#353535;">WISE ENROLL</p>
                 </div>
             </td> `+ EmailFooter
      }
    },
    changePassword: function (body) {
      return {
        from: fromMail,
        to: body.email,
        subject: "OTP change password",
        // html: "OTP for verifying your E-mail id is : " + body.id,
        html: EmailHeader + `<td align="left" valign="top" class="content">
            <div style="margin-left: 15px;">
            <h3 style="color:#353535;">Hi..</h3>
            <p style="color:#353535;">OTP for verifying your E-mail id is : ` + body.id + `</p>
     
            </div>
         </td>` + EmailFooter

      }
    },
    shareProfile: function (body) {
      return {
        from: fromMail,
        to: body.email,
        subject: "WISE ENROLL Profile:",
        // html: "Link for viewing WISE ENROOL Profile is :" + appUrl + "/employee/" + body.template + "/?id=" + body.encryptedId,
        html: EmailHeader + `<td align="left" valign="top" class="content">
            <div style="margin-left: 15px;">
            <h3 style="color:#353535;">Hi..</h3>
            <p style="color:#353535;">Link for viewing WISE ENROLL Profile is :" + appUrl + "/employee/" `+ body.template + ` "/?id=" ` + body.encryptedId + `</p>
     
            </div>
         </td>` + EmailFooter
      }
    },

    JobAppliedMailToSubUsers: function (body) {
      return {
        from: fromMail,
        to: body.email,
        subject: body.userName+" Has applied to a job regarding to your company",
        // html: "Job Applied one "
        html: EmailHeader + `<td align="left" valign="top" class="content">
            <div style="margin-left: 15px;">
            <h3 style="color:#353535;">Hi..</h3>
            <p style="color:#353535;">`+ body.userName +` has applied job`+ body.jobTitile + `  postion posted from your company</p>
            <p> Candidate Name:`+ body.userName + `</p>
            <p> Candidate Email:`+ body.userEmail + `</p>
     
            </div>
         </td>` + EmailFooter
      }
    },
    sendJobAlerts: function (body) {
      return {
        from: fromMail,
        to: body.email,
        subject: "jobs Matching your alerts",
        html: EmailHeader + `<td align="left" valign="top">
                <table style="width:100%;">
                  <tbody>
                    
                    <tr>
                      <td align="left" valign="top" class="content">
                         <div>
                  <h3 style="color:#353535; font-size: 18px;">Hi..</h3>
                   <p style="color:#353535; font-size: 18px;">`+ body.candiadate_name + `</p>
                          <p style="color:#353535; font-size: 18px;">Greetings for the Day!</p>
                          <p style="color:#353535; font-size: 18px;">Company/Clients :`+ body.company_name + `</p>
                          <p style="color:#353535; font-size: 18px;">Location : [Company Location]</p>
                          <p style="color:#353535; font-size: 18px;">Please find below position details :</p>
                          <p style="color:#353535; font-size: 18px;">Experience : `+ body.min_exp + ` - ` + body.max_exp + `years</p>
                      
                          <div>
                              <p style="color:#353535;font-weight:600;">Job Description:</p>
                              <p>`+ body.job_description + `</p>
                          </div>
      
                          <div>
                              <p>Current CTC :`+ body.min_ctc + `</p>
                              <p>Expected CTC :`+ body.max_ctc + `</p>
                              <p>Notice Period :</p>
                              <p>Permanent/Contract :`+ body.emp_type + `</p>
                              vaccancies
                          </div>
      
                  <p>Visit <a href="#" target="_blank">www.Wiseenroll/careers</a> to search for other open postions</p>
      
                  <p style="margin-top: 36px;">Regards</p>
                  <p style="color:#353535;font-weight:600;">Team Wise Enroll</p>
                          </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>` + EmailFooter

      }
    },
    sendMailsToUsers: function (body) {
      return {
        from: fromMail,
        to: body.email,
        subject: "Regarding Job ",
        html: EmailHeader + ` <td align="left" valign="top" class="content">
        <div>
        <h3 style="color:#353535; font-size: 18px;">CompanyName:`+ body[0].companyName + `</h3>
        <p style="color:#353535;">`+ body[0].msg + `</p>
       </div>
     </td>`
          + EmailFooter

      }
    },
    sendsubuserNotification: function (body) {
      return {
        from: fromMail,
        to: body.email,
        subject: "Posted Job",
        // html: "Link for Job  " + appUrl + "/employee/viewjobtemplate/" + body.slug
        html: EmailHeader + `<td align="left" valign="top" class="content">
        <div style="margin-left: 15px;">
        <h3 style="color:#353535;">Hi..</h3>
        <p style="color:#353535;"> Link for Job  `+ appUrl + ` /employer/viewjobtemplate?id=/ + ` + body.slug + `</p>
 
        </div>
     </td>` + EmailFooter

      }
    },
    jobShareToUsers: function (body) {
      return {
        from: fromMail,
        to: body.toemail,
        subject: "Share Job",
        // html: "Link for Job  " + appUrl + "/employee/viewjobtemplate/" + body.slug
        html: EmailHeader + `<td align="left" valign="top" class="content">
        <div>
      
        <h3 style="color:#353535; font-size: 18px;">Hi ` + body.name + ` is share a job to you </h3>
       
        <p style="color:#353535; font-size: 18px;margin-left: 15px;">Link for viewing <a class="link" href="`+ appUrl + `/home/viewjobtemplate?id=` + body.slug + `">CLICK HERE</a></p>
      </div>
     </td>` + EmailFooter

      }
    },
    sendSubUserCredentials: function (body) {
      return {
        from: fromMail,
        to: body.email,
        subject: "You are Added As SubUser For the Organisation",
        // html: body.description
        html: EmailHeader + `<td align="left" valign="top" class="content">
        <div style="margin-left: 15px;">
        <h3 style="color:#353535;">Hi..</h3>
        <p style="color:#353535;">You have been  Added as a subuser  for the Organisation and the credetials are `+ body.description + ` </p>
 
        </div>
     </td>` + EmailFooter
      }

    },
    invitingcandidates: function (body) {
      return {
        from: fromMail,
        to: body.toEmail,
        subject: "Test Invitation",
        // html: body.html
        html: EmailHeader + `<td align="left" valign="top" class="content">
        <div style="margin-left: 15px;">
        <h3 style="color:#353535;">Hi..</h3>
        <p style="color:#353535;"> `+ body.html + `</p>
 
        </div>
     </td>` + EmailFooter
      }
    },
    replyToContactedCandidates: function (body) {
      return {
        from: fromMail,
        to: body.email,
        subject: "You Will Be Contacted By Our Team Soon",
        html: EmailHeader + `<td align="left" valign="top" class="content">
            <div style="margin-left: 15px;">
            <h3 style="color:#353535;">Hi..</h3>
            <p style="color:#353535;">Thanks For Approaching Us. You will Be Contacted by our team soon</p>
     
            </div>
         </td>` + EmailFooter

      }
    },

    sendMsgtoAdmin: function (body) {
      return {
        from: fromMail,
        to: 'info@cognitiveinnovations.in',
        subject: "Somebody Contacted Us",
        html: EmailHeader + `<td align="left" valign="top" class="content">
            <div style="margin-left: 15px;">
            <h3 style="color:#353535;">Hi.. we are contacted by somebody</h3>
            <p style="color:#353535;">Name:`+ body.name + ` </p>
            <p style="color:#353535;">Subject : `+ body.subject + `</p>
            <p style="color:#353535;">Message : `+ body.message + `</p>
            <p style="color:#353535;">Contacted Email : `+ body.email + `</p>
            
     
            </div>
         </td>` + EmailFooter

      }
    },

    newUserRegistration: function (body) {

      return {
        from: fromMail,
        to: body.email,
        subject: "Welcome to Wise Enroll ",
        html: EmailHeader + `<td align="left" valign="top" class="content">
                <div>
         <h3 style="color:#353535; font-size: 18px;">Hi...! `+ body.name + `</h3>
         <p style="color:#353535; font-size: 18px;margin-left: 15px;">Good Day!.</p>
         <p style="color:#353535;line-height: 28px;">Thank you for registering with Wise Enroll. You can check your details by login  with your credentials.</p>
         <p style="color:#353535;line-height: 28px;">If you have any queries please visit our <a href="`+ appUrl + `/home/ourservices?name=contactUs">Help Center </a> or <a href="` + appUrl + `/home/ourservices?name=contactUs">Contact Support</a>.</p>
         <div style="text-align: center;">
         <a class="link" href="`+ appUrl + `/home` + body.path + `">CLICK HERE</a>
         </div>
                 </div>
             </td>` + EmailFooter
      }

    },

    // Employee Profile Sharing: 
    employeeProfileSharing: function (body) {
      return {
        from: fromMail,
        to: body.email,
        subject: "Wise Enroll Profile",
        html: EmailHeader + `<td align="left" valign="top" class="content">
               <div>
                <h3 style="color:#353535; font-size: 18px;margin-top: 74px;margin-left: 15px;">Hi` + body.name + ` is sharing his profile </h3>
                <p style="color:#353535; font-size: 18px;margin-left: 15px;">Link for viewing <b>Wise Enroll</b>  Profile is :<a href="`+ appUrl + `/home/shareprofile?id=` + body.encryptedId + `" >Click Here</a> </p>
                </div>
                </td>` + EmailFooter

      }
    },

    jobAppliedEmailToAppliedUser: function (body) {

      return {
        from: fromMail,
        to: body.userEmail,
        subject: "Thank you for applying to the " + body.jobTitile + " postion at " + body.companyName,
        html: EmailHeader + ` <td align="left" valign="top" class="content">
                <div>
         <h3 style="color:#353535; font-size: 18px;">Hi...!`+ body.userName + `</h3>
         <p style="color:#353535;">Thank you for applying to the <a href="`+ appUrl + `/home/viewjobtemplate?id=` + body.jobSlug + `">` + body.jobTitile + `</a> postion at <a href="">` + body.companyName + `</a></p>
             <p style="line-height: 28px;">
                 I would like to inform
                 you that we have received your application. Our hiring team is currently re-viewing your application and we are
                 planning to schedule interview [mention timeframe, e.g. in the next two weeks.] If you are qualified then you
                 will receive [e.g. a call/email] from our one of our recruiters to schedule [e.g. a phone interview.] In any
                 case, we will keep you posted on the status of your application. 
             </p>
             <p style="color:#353535;">Thank you, again, for taking the time to apply to this role at <a>`+ body.companyName + `</a></p>


             <p style="color:#353535;font-weight:600;">Regards</p>
             <p style="color:#353535;">`+ body.companyName + `</p>
             <p style="color:#353535;"></p>
                 </div>
             </td> `+ EmailFooter
      }

    },
    sendEvents: function (body) {
      console.log(body)
      return {
        from: fromMail,
        to: body.email,
        subject: "Event  Created Successfully",
        html: EmailHeader + `<td align="left" valign="top" class="content">
            <div style="margin-left: 15px;">
           <h3 style="color:#353535;">Hi...!</h3>
           <p style="color:#353535;">Event Created by user `+ body.name + ` </p>


           <p> Good Day! </p>

          <p>`+ body.name + `is organizing an [Event Name] on ` + body.time + `.</P>

          <p>The purpose of this event is to `+ body.description + `. So, we are inviting people to join us.</P>

         

          <p>I hope to see you there!</P>

          <p>Thanks & Regards,</P>
          <p>`+ body.name + `</P>
   
          </div>
         </td>` + EmailFooter
      }

    },

    raiseTicket: function (body) {
      return {
        from: fromMail,
        to: body.email,
        subject: "Ticket Raising",
        html: EmailHeader + ` <td align="left" valign="top" class="content">
                <div>
                <h3 style="color:#353535; font-size: 20px;font-weight: 600;">Ticket Raising</h3>
               <h3 style="color:#353535; font-size: 18px;">Hi...! `+ [body.name] + `</h3>
               <p style="color:#353535;line-height: 28px;">Thank you for raising the ticket in Wise Enroll portal. Your ticket information is given below. If
                 you have any additional information to add to this ticket, please go through chat in tickets.</p>

                 <p style="color:#353535;">Ticket Title             : `+ body.subject + `</p>
                 <p style="color:#353535;">Ticket Number             : `+ body.ticketId + ` </p>
                 <p style="color:#353535;">Status                    :`+ body.status + ` </p>
                 <p style="color:#353535;">Date Created              : `+ body.created_at + `</p>
           
 
                 <p style="color: #353535;">  If you need immediate help call us:XXXXXXXXXX </p>
                 <p style="color: #353535;"> Toll -Free:XXXXXXXXXX </p>
                 <p style="color: #353535;">Phone:XXXXXXXXXX</p>
 
             
                 <p style="color:#353535;font-weight:600;">Thanks,</p>
                 <p style="color:#353535;">  Wise Enroll Team</p>
                 
       
                 </div>
             </td>`
          + EmailFooter
      }

    },

    closeTicket: function (body) {
      return {
        from: fromMail,
        to: body.email,
        subject: "Closed Ticket",
        html: EmailHeader + ` <td align="left" valign="top" class="content">
                  <div>
                  <h3 style="color:#353535; font-size: 20px;font-weight: 600;">Closed Ticket Notification</h3>
                 <h3 style="color:#353535; font-size: 18px;">Hi...!</h3>
                 <p style="color:#353535;line-height: 28px;">Thank you for raising the ticket in Wise Enroll portal. Your ticket information is given below. If
                   you have any additional information to add to this ticket, please go through chat in tickets.</p>
  
                   <p style="color:#353535;">Ticket Title             : ` + body.subject + `</p>
                   <p style="color:#353535;">Ticket Number             : `+ body.ticketId + ` </p>
                   <p style="color:#353535;">Status                    :` + body.status + ` </p>
                   <p style="color:#353535;">Closed Date             : `+ body.created_at + `</p>
             
   
                   <p style="color: #353535;">  If you need immediate help call us:XXXXXXXXXX </p>
                   <p style="color: #353535;"> Toll -Free:XXXXXXXXXX </p>
                   <p style="color: #353535;">Phone:XXXXXXXXXX</p>
   
               
                   <p style="color:#353535;font-weight:600;">Thanks,</p>
                   <p style="color:#353535;">  Wise Enroll Team</p>
                   
         
                   </div>
               </td>`
          + EmailFooter
      }

    },
    emailToIncompleteProfiles: function (body) {
      return {
        from: fromMail,
        to: body.email,
        subject: "",
        html:
          EmailHeader + ` <td align="left" valign="top" class="content">
                  <div>
                  <h3 style="color:#353535; font-size: 20px;font-weight: 600;">Profile Incomplete Remainder</h3>
                  Hi `+ body.name + `,

                  Sub: Gentle Reminder: Complete the registration process 
                  
                  Good Day!
                  
                  We would like to remind that you weren’t complete your registration process so please complete the process by clicking on the following link.
                  
                  Wise Enroll Portal Link: <a class="link" href="`+ appUrl + `/home/employeelogin/>Click Here</a> 
                  
                  If you have any questions, please feel free to contact us `+ fromMail + ` 
                  
                  Regards,
                  
                  Wise Enroll
                
                   
         
                   </div>
               </td>`
          + EmailFooter

      }
    }

  },

  smsOptions: {

    mobileVerfication: function (body) {

      return {
        message: " Hi,Your SECURE OTP is"  + body.otp + " to get verify your registered mobile number. If not requested by you, kindly update your registered Mobile number immediately.",
        mobile: body.PhoneNumber,
      }
    },
    registrationMsg: function (body) {
      return {
        message: 'Hi Thank you !You have Successfully enrolled in WISE ENROLL System. A Complete Solution for all your career needs.Link  Wise Enroll Portal Link:'+appUrl + '/home/default/',
        mobile: body.PhoneNumber,

      }

    },
    passwordModified: function (body) {
      return {
        message: 'Hi,You have successfully updated your Profile Password. Kindly login with your New Password.Link:'+appUrl + '/home/default/',
        mobile: body.PhoneNumber,

      }

    },
  
    interviewmsg:function(body){
      return {
        message: "Hi,Thanks for applying"+body.job_title+" position with "+body.companyname +". Your Interview schedule is,Mode of Interview: Tele (or) F2FVenue: "+body.location +"Date: "+body.time +".Wishing you all the very best!",
        mobile: body.PhoneNumber,

      }

    },
    jobnotificationmsg:function(body){
      return{
        message: "Hi,New Job matches found for your skill sets.Kindly review and apply for the same.Wish you all the very best!",
        mobile: body.PhoneNumber,

      }
    },
    interviewremaindermsg:function(body){

      return{
        message: " Hi,This is the final reminder about Your Interview schedule with "+body.companyName+" for the"+body.jobTitle+"position,Mode of Interview: Tele (or) F2F Venue: "+body.location+" Date: "+body.time+".Wishing you all the very best!",
        mobile: body.PhoneNumber,

      }
     
    },
   

  }

}















