<?php
// Start the session
session_start();
$id = session_id();

require 'cards.php';

//setcookie(kasshci, cookie_value, [expiry_time], [cookie_path], [domain], [secure], [httponly]);

setcookie("user_id", "kassfir", time()+ 3600,'/'); // expires after 60 seconds
//echo 'the cookie has been set for one hour';

?>

<!-- index.html -->

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Kass HCI Test</title>

  <link rel="stylesheet" href="styles.css">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
</head>
<body>

	<section class="task-list">
		<h1>Tasks</h1>

	</section>

	<section class="memory-game" id="memgame">


	</section>


  <button id="ajaxButton" onClick = "ajaxFunction()"> AJAX ME BAB </button>

  <!-- The core Firebase JS SDK is always required and must be listed first -->
  <script src="/__/firebase/7.14.2/firebase-app.js"></script>

  <!-- TODO: Add SDKs for Firebase products that you want to use
       https://firebase.google.com/docs/web/setup#available-libraries -->

  <!-- Initialize Firebase -->
  <script src="/__/firebase/init.js"></script>

	<script src="scripts.js"></script>

</body>
</html>
