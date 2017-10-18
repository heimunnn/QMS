<?php

  $queueNumber = $_POST['queueNumber'];
  $conn = mysqli_connect("localhost", "root", "") or die(mysql_error()); //Connect to server
  mysqli_select_db($conn, "queuedb") or die ("Cannot connect to database");
  $query = mysqli_query($conn, "DELETE FROM queuesystem WHERE QueueNumber=".$queueNumber); //SQL Query
  $data;

  if($query)
  {
    $data = array("status"=> "Queue number removed");
  }
  else
  {
    $data = array("status"=> "Request cannot be processed");
  }
  echo json_encode($data);

?>
