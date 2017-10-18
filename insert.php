<?php

  $queueNumber = $_POST['queueNumber'];
  $conn = mysqli_connect("localhost", "root", "") or die(mysql_error()); //Connect to server
  mysqli_select_db($conn, "queuedb") or die ("Cannot connect to database");
  $query = mysqli_query($conn, "INSERT INTO queuemanagementsystem (Id, QueueNumber, TimeAdded, TimeComplete, Status, Complete, StoreId, New) VALUES ('', ".$queueNumber.", now(), null, 'False', 'False', 1, 'True')"); //SQL Query
  $data;
  if($query)
  {
    $data = array("status"=> "Queue number added");
  }
  else
  {
    $data = array("status"=> "Request cannot be processed");
  }
  echo json_encode($data);

?>
