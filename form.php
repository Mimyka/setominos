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

  $namereg = "#^(?:[a-zA-Z]|[\-_ ](?![\-_ ])|[\x{00C0}\x{00C1}\x{00C2}\x{00C3}\x{00C4}\x{00C5}\x{00C6}\x{00C7}\x{00C8}\x{00C9}\x{00CA}\x{00CB}\x{00CC}\x{00CD}\x{00CE}\x{00CF}\x{00D0}\x{00D1}\x{00D2}\x{00D3}\x{00D4}\x{00D5}\x{00D6}\x{00D8}\x{00D9}\x{00DA}\x{00DB}\x{00DC}\x{00DD}\x{00DF}\x{00E0}\x{00E1}\x{00E2}\x{00E3}\x{00E4}\x{00E5}\x{00E6}\x{00E7}\x{00E8}\x{00E9}\x{00EA}\x{00EB}\x{00EC}\x{00ED}\x{00EE}\x{00EF}\x{00F0}\x{00F1}\x{00F2}\x{00F3}\x{00F4}\x{00F5}\x{00F6}\x{00F9}\x{00FA}\x{00FB}\x{00FC}\x{00FD}\x{00FF}\x{0153}]){3,50}$#";
  $adressreg = "#^(?:[a-zA-Z0-9]|[\-_ ](?![\-_ ])|[\x{00C0}\x{00C1}\x{00C2}\x{00C3}\x{00C4}\x{00C5}\x{00C6}\x{00C7}\x{00C8}\x{00C9}\x{00CA}\x{00CB}\x{00CC}\x{00CD}\x{00CE}\x{00CF}\x{00D0}\x{00D1}\x{00D2}\x{00D3}\x{00D4}\x{00D5}\x{00D6}\x{00D8}\x{00D9}\x{00DA}\x{00DB}\x{00DC}\x{00DD}\x{00DF}\x{00E0}\x{00E1}\x{00E2}\x{00E3}\x{00E4}\x{00E5}\x{00E6}\x{00E7}\x{00E8}\x{00E9}\x{00EA}\x{00EB}\x{00EC}\x{00ED}\x{00EE}\x{00EF}\x{00F0}\x{00F1}\x{00F2}\x{00F3}\x{00F4}\x{00F5}\x{00F6}\x{00F9}\x{00FA}\x{00FB}\x{00FC}\x{00FD}\x{00FF}\x{0153}]){3,50}$#";

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
        echo ErrorInfo;
      }
  }else{
    echo $firstName . ",";
    echo $toverif[0] ."|";
    echo $toverif[1] ."|";
    echo $toverif[2] ."|";
    echo $toverif[3] ."|";
    echo $toverif[4] ."|";
    echo $toverif[5] ."|";
    echo $toverif[6] ."|";
    echo $toverif[7];
  }
?>
