<?php
$server = "localhost";
$connection = array( "Database"=>"qms", "UID"=>"sa", "PWD"=>"0000000" );
$conn = sqlsrv_connect( $server, $connection);
if( $conn)
{}
else
{
    die( print_r( sqlsrv_errors(), true));
}