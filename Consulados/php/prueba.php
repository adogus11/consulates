<?php

$conexion = pg_connect("host=localhost dbname=cons user=postgres password=ubuntu");

$nombres = pg_query($conexion, "SELECT statefp FROM circus);

?>