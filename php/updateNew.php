<?php
  $storeId = $_POST['storeId'];
  $queueNumber = $_POST['queueNumber'];

  $conn = mysqli_connect("localhost", "root", "") or die(mysql_error()); //Connect to server
  mysqli_select_db($conn, "queuedb") or die ("Cannot connect to database");
  $query = mysqli_query($conn, "UPDATE queuemanagementsystem SET New = 'False' WHERE StoreId=".$storeId." AND QueueNumber=".$queueNumber);

?>
