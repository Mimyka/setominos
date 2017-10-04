<?php

header("Content-Type: text/plain");

if ($_POST['check'] != "true") {
  header('Location: http://www.google.com');
}

$cnx = mysqli_connect('localhost', 'root', '', 'setominos') or die("error=".mysqli_connect_errno());

$pseudo = (isset($_POST['pseudo'])) ? $_POST['pseudo'] : "" ;
$email = (isset($_POST['member_email'])) ? $_POST['member_email'] : "" ;

$namereg = "#^(?:[a-zA-ZÉÈÊËéèêëÎÏîïÙùÇçÑñÔôÂâŒœ]|[\-_ ](?![\-_ ])){3,50}$#";

$toverif = array(
  preg_match($namereg, $pseudo),
  preg_match("#^[\w-]{2,24}@[\w-]{2,19}+\.[a-zA-Z]{2,5}$#", $email),
);

foreach ($toverif as $value) {
  if (!$value) {
    $match = false;
    break;
  }
  $match = true;
}

if ($match) {
  try {
    mysqli_query($cnx, "INSERT INTO `Member` (`pseudo`, `email`) VALUES ($pseudo, $email)");
  } catch (Exception $e) {
    echo $e;
  }
  echo "true";
} else {
  echo "false";
}
