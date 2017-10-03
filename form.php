<?php
  header("Content-Type: text/plain");

  include './PHPMailer/class.phpmailer.php';
  include './PHPMailer/class.smtp.php';

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
      Bonjour,<br><br>
      Vous avez reçu une commande de $amount boîte".(($amount==1)? "":"s")." de la part de <b>$firstName $lastName</b>.<br><br>
      Voici ses coordonnées :<br>
      <u>Nom</u> : $firstName<br>
      <u>Prénom</u> : $lastName<br>
      <u>Email</u> : $email<br>
      <u>Adresse</u> : $adress<br>
      <u>Code postal</u> : $postalCode<br>
      <u>Ville</u> : $city<br>
      <u>Téléphone</u> : $phone<br>
      ";
      $mail = new PHPMailer();
      try {
        $mail->IsSMTP();
        $mail->SMTPAuth = true;
        $mail->Host = "smtp.gmail.com";
        $mail->Port = 587;
        $mail->Username = "virtual.assistant.setominos@gmail.com";
        $mail->Password = "";
        $mail->SetFrom('virtual.assistant.setominos@gmail.com','from');
        $mail->Subject = "[$phone] Vous avez recu une commande de $amount boite".(($amount==1)? "":"s");
        $mail->MsgHTML($message);
        $mail->AddAddress('leprunenec.jeremy@gmail.com', 'Jeremy Le Prunenec');
        $mail->Send();
        echo "true";
      } catch (Exception $e) {
        echo $mail->ErrorInfo;
      }
  }else{
    echo "false";
  }
?>
