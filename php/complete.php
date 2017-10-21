<?php
  $storeId = $_POST['storeId'];
  $queueNumber = $_POST['queueNumber'];

  $conn = mysqli_connect("localhost", "root", "") or die(mysql_error()); //Connect to server
  mysqli_select_db($conn, "queuedb") or die ("Cannot connect to database");
  $query = mysqli_query($conn, "UPDATE queuemanagementsystem SET Complete = 'True', TimeComplete = now() WHERE StoreId=".$storeId." AND QueueNumber=".$queueNumber);
  $data;

  if($query)
  {
    $data = array("status"=> "This Order has been completed.");
  }
  else
  {
    $data = array("status"=> "Request cannot be processed.");
  }
  echo json_encode($data);

?>
