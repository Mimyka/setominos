<?php

  header("Content-Type: text/plain");

  $firstName = (isset($_POST['first_name'])) ? $_POST['first_name'] : "" ;
  $lastName = (isset($_POST['last_name'])) ? $_POST['last_name'] : "" ;
  $email = (isset($_POST['email'])) ? $_POST['email'] : "" ;
  $amount = (isset($_POST['amount'])) ? $_POST['amount'] : "" ;
  $adress = (isset($_POST['adress'])) ? $_POST['adress'] : "" ;
  $postalCode = (isset($_POST['postal_code'])) ? $_POST['postal_code'] : "" ;
  $city = (isset($_POST['city'])) ? $_POST['city'] : "" ;
  $phone = (isset($_POST['phone'])) ? $_POST['phone'] : "" ;

  $namereg = "#^(?:[a-zA-ZÉÈÊËéèêëÎÏîïÙùÇçÑñÔôÂâŒœ]|[\-_ ](?![\-_ ])){3,50}$#";
  $adressreg = "#^(?:[a-zA-Z0-9ÉÈÊËéèêëÎÏîïÙùÇçÑñÔôÂâŒœ]|[\-_ ](?![\-_ ])){3,50}$#";

  $toverif = array(
    preg_match($namereg, $firstName),
    preg_match($namereg, $lastName),
    preg_match("#^[\w-]{2,24}@[\w-]{2,19}+\.[a-zA-Z]{2,5}$#", $email),
    preg_match("#^[0-9]{1,5}$#", $amount),
    preg_match($adressreg, $adress),
    preg_match("#^[0-9]{5}$#", $postalCode),
    preg_match($namereg, $city),
    preg_match("#^0[0-9]{9}$#", $phone)
  );

  include './PHPMailer/class.phpmailer.php';
  include './PHPMailer/class.smtp.php';

  foreach ($toverif as $value) {
    if (!$value) {
      $match = false;
      break;
    }
    $match = true;
  }

  if ($match) {
      $message =
      "
      Sample text $first_name
      ";
      $mail = new PHPMailer();
      $mail->IsSMTP();
      $mail->SMTPAuth = true;
      $mail->Host = "host";
      $mail->Port = 587;
      $mail->Username = "mail";
      $mail->Password = "pass";
      $mail->SetFrom('from');
      $mail->Subject = "Subject";
      $mail->MsgHTML($message);
      $mail->AddAddress('leprunenec.jeremy@gmail.com', 'Jeremy Le Prunenec');
      if($mail->Send()) {
        echo "true";
      } else {
        echo $mail->ErrorInfo;
      }
  }else{
    echo "false";
  }
?>
