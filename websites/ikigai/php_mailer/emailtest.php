<?php
require 'PHPMailerAutoload.php';

if(isset($_REQUEST['submit']))
{


$fname = $_REQUEST['fname'];
$cemail = $_REQUEST['email'];
$csubject = $_REQUEST['subject'];
$cmessage = $_REQUEST['message'];

$name = "NexBorg";
$email = "info@blackcactusglobal.in";
$subject = "token from contact us";
$message = "Test";
$mail = new PHPMailer;
                       $mail->isSMTP();
                       $mail->Debugoutput = 'html';
                       $mail->Host = "ssl://smtp.gmail.com";
                       $mail->Port = 465;
					   $mail->SMTPDebug  = 1;
                       $mail->SMTPAuth = true;
                       $mail->Username = "info@blackcactusglobal.in";
                       $mail->Password = "Bcgt2018*";
                       $mail->setFrom('info@blackcactusglobal.in', 'Contact');
                       $mail->addReplyTo('info@blackcactusglobal.in', 'Black Cactus global.in');
                       $mail->addAddress("info@blackcactusglobal.in", "Black Cactus Global Support");
                       $mail->Subject = $subject;
                       $mail->msgHTML("$message");
                       $mail->AltBody = 'Please enable HTML to view this email';
                       if (!$mail->send()) {
                          echo "<p>Something went wrong! Please try again after refreshing the page.</p>";
                       }
                        else {
                         echo "<p>Thank You for contacting us, We have received your message and our representative will contact you as soon as possible.</p>";

                       }
?>
