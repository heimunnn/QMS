<?php

		$conn = mysqli_connect("localhost", "root", "") or die(mysql_error()); //Connect to server
		mysqli_select_db($conn, "queuedb") or die ("Cannot connect to database");
		$query = mysqli_query($conn, "SELECT * FROM queuemanagementsystem WHERE Complete = 'False' ORDER BY TimeAdded "); //SQL Query
		$jsonData = array();
		while($row = mysqli_fetch_assoc($query))
		{
			$data = array(
							"id"      => $row['Id'],
							"queueNumber"     => $row['QueueNumber'],
							"timeAdded"     => $row['TimeAdded'],
							"timeComplete"     => $row['TimeComplete'],
							"status"     => $row['Status'],
							"complete"     => $row['Complete'],
							'alarm' 				=> $row['New']
						);
			 $jsonData[] = $data;
		}

		echo json_encode($jsonData);
?>
