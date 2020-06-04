<?php
  $include_once cards.php;
  $include_once index.php;

	try {
   $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
   // set the PDO error mode to exception
   $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

   // use exec() because no results are returned

//   $result = 0;
	 $id = session_id();
	 $guessed = $_POST["guessed"];
   $correct = $_POST["correct"];

   if ($conn){
     $sql = "INSERT INTO MyGuests (id, guessed, correct)
             VALUES ('$id', '$guessed', '$correct')";

     $conn -> exec($sql);
   }
                         /*
                         $stmt = $conn->prepare("INSERT INTO MyGuests(id, guessed, correct)
                                  VALUES (:id, :guessed, :correct)");

                                  $stmt->bindParam(':id', $id);
                                  $stmt->bindParam(':guessed', $guessed);
                                  $stmt->bindParam(':correct', $correct);

                          if ($stmt -> execute()){
                            $result = 1;
                          }*/

                      //    echo $result
                      	// $sql = "INSERT INTO MyGuests (id, guessed, correct)
                      	// 				VALUES ('$id', '$guessed', '$correct')";

                        //$sql = "INSERT INTO ajax_insert(id, guessed)VALUES($id, $guessed)";
                      //   $conn->exec($sql);
                      //   echo "New record created successfully";
}

 catch (PDOException $e){
   echo $sql."<br>".$e->getMessage();
 }
 $conn = null;
?>
