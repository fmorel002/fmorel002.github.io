/**
* @URL register-to-notification
* Associe un utilisateur à un endpoint de Push Server
*/
<?php

function debug_to_console( $data ) {
    $output = $data;
    if ( is_array( $output ) )
        $output = implode( ',', $output);

    echo "<script>console.log( 'Debug Objects: " . $output . "' );</script>";
}

debug_to_console("step 1 register notif");
//public function registerToNotification(){

  $content = file_get_contents("php://input");
  $data = json_decode($content);

  if (isset($data->endpoint)){
    $endpoint = $data->endpoint;
  }else{
    throw new Exception('couldnt find endpoint');
  }

  //Association de l'utilisateur courant au endpoint
   $this->notificationService->registerUser($this->userService->getLoggedUser(), $endpoint);

  // ... puis renvoyer le résultat souhaité
//}

$fields = array
(
 'registration_ids' => $registrationIds //il est possible de notifier plusieurs endpoint en un seul appel
);

$headers = array
(
 'Content-Type: application/json'
);

$ch = curl_init();
curl_setopt( $ch,CURLOPT_URL, 'https://android.googleapis.com/gcm/send' );
curl_setopt( $ch,CURLOPT_POST, true );
curl_setopt( $ch,CURLOPT_HTTPHEADER, $headers );
curl_setopt( $ch,CURLOPT_RETURNTRANSFER, true );
curl_setopt( $ch,CURLOPT_SSL_VERIFYPEER, false );
curl_setopt( $ch,CURLOPT_POSTFIELDS, json_encode( $fields ) );
$result = curl_exec($ch );
curl_close( $ch );
 ?>
