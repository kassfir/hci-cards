
<?php
//function upToDb{
	$servername = "localhost";
	$username = "root";
	$password = "";
	$dbname = "hcikass";

	try {
   $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
   // set the PDO error mode to exception
   $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

   // use exec() because no results are returned
   /*$sql = "DROP TABLE MyGuests";
   $conn->exec($sql);
   echo "table dropped\n";
*//*
   $sql = "CREATE TABLE MyGuests(
     incr INT PRIMARY KEY AUTO_INCREMENT,
     id VARCHAR(40) NOT NULL,
     guessed VARCHAR(30) NOT NULL,
     correct INT NOT NULL,
     chrono TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
   )";
   echo "table created\n";

   $conn->exec($sql);
*/


		echo '<script language="javascript">';
		echo 'window.alert("message successfully sent")';  //not showing an alert box.
		echo '</script>';

 }

 catch (PDOException $e){
   echo $sql."<br>".$e->getMessage();
 }

 if( isset($_POST['guessed']) )
 {
	 $id = session_id();
	 $guessed = $_POST["guessed"];
	 $correct = $_POST["correct"];

	 if ($guessed != 0){
			$sql = "INSERT INTO MyGuests (id, guessed, correct)
					VALUES ('$id', '$guessed', '$correct')";

	 //$sql = "INSERT INTO ajax_insert(id, guessed)VALUES($id, $guessed)";
	 $conn->exec($sql);}
 }
?>
