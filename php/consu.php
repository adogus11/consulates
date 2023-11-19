<?php 

// Abre una conexion al servidor de pgsql
$connection=pg_connect ("host=localhost dbname=cons port=5432 user=postgres password=ubuntu");
if (!$connection) {
  die("No se ha podido establecer conexion con la bd.  ");
  exit;
}
//$opt = $_GET['pob'];

// Genera la consulta a la base de datos
$query = "SELECT statefp, nombre, consu";
$query = $query.",ST_AsGeoJson(geom,5) as coords ";
$query = $query."FROM circus ";
if($_POST['consu'] == 'true'){
  if($_POST['opcons'] == 'al') {
    $query = $query."WHERE consu = 'ALBUQUERQUE'";
  } elseif ($_POST['opcons'] == 'at') {
    $query = $query."WHERE consu = 'ATLANTA'";
  } elseif ($_POST['opcons'] == 'au') {
    $query = $query."WHERE consu = 'AUSTIN'";  
  } elseif ($_POST['opcons'] == 'boi') {
    $query = $query."WHERE consu = 'BOISE'";
  } elseif ($_POST['opcons'] == 'bos') {
    $query = $query."WHERE consu = 'BOSTON'";
  } elseif ($_POST['opcons'] == 'br') {
    $query = $query."WHERE consu = 'BROENSVILLE'";
  } elseif ($_POST['opcons'] == 'ca') {
    $query = $query."WHERE consu = 'CALEXICO'";  
  } elseif ($_POST['opcons'] == 'ch') {
    $query = $query."WHERE consu = 'CHICAGO'";
  } elseif ($_POST['opcons'] == 'da') {
    $query = $query."WHERE consu = 'DALLAS'";
  } elseif ($_POST['opcons'] == 'del') {
    $query = $query."WHERE consu = 'DEL RIO'";
  } elseif ($_POST['opcons'] == 'den') {
    $query = $query."WHERE consu = 'DENVER'";
  } elseif ($_POST['opcons'] == 'det') {
    $query = $query."WHERE consu = 'DETROIT'";
  } elseif ($_POST['opcons'] == 'do') {
    $query = $query."WHERE consu = 'DOUGLAS'";  
  } elseif ($_POST['opcons'] == 'ea') {
    $query = $query."WHERE consu = 'EAGLE PASS'";
  } elseif ($_POST['opcons'] == 'el') {
    $query = $query."WHERE consu = 'EL PASO'";
  } elseif ($_POST['opcons'] == 'fi') {
    $query = $query."WHERE consu = 'FILADELFIA'";  
  } elseif ($_POST['opcons'] == 'fr') {
    $query = $query."WHERE consu = 'FRESNO'";
  } elseif ($_POST['opcons'] == 'ho') {
    $query = $query."WHERE consu = 'HOUSTON'";
  } elseif ($_POST['opcons'] == 'in') {
    $query = $query."WHERE consu = 'INDIANAPOLIS'";
  } elseif ($_POST['opcons'] == 'ka') {
    $query = $query."WHERE consu = 'KANSAS CITY'";
  } elseif ($_POST['opcons'] == 'lar') {
    $query = $query."WHERE consu = 'LAREDO'";
  } elseif ($_POST['opcons'] == 'las') {
    $query = $query."WHERE consu = 'LAS VEGAS'";  
  } elseif ($_POST['opcons'] == 'li') {
    $query = $query."WHERE consu = 'LITTLE ROCK'";
  } elseif ($_POST['opcons'] == 'lo') {
    $query = $query."WHERE consu = 'LOS ANGELES'";
  } elseif ($_POST['opcons'] == 'mc') {
    $query = $query."WHERE consu = 'MC ALLEN'";
  } elseif ($_POST['opcons'] == 'mia') {
    $query = $query."WHERE consu = 'MIAMI'";
  } elseif ($_POST['opcons'] == 'mil') {
    $query = $query."WHERE consu = 'MILWAUKEE'";
  } elseif ($_POST['opcons'] == 'ne') {
    $query = $query."WHERE consu = 'NEW YORK'";
  } elseif ($_POST['opcons'] == 'no') {
    $query = $query."WHERE consu = 'NOGALES'";
  } elseif ($_POST['opcons'] == 'nu') {
    $query = $query."WHERE consu = 'NUEVA ORLEANS'";  
  } elseif ($_POST['opcons'] == 'om') {
    $query = $query."WHERE consu = 'OMAHA'";
  } elseif ($_POST['opcons'] == 'or') {
    $query = $query."WHERE consu = 'ORLANDO'";
  } elseif ($_POST['opcons'] == 'ox') {
    $query = $query."WHERE consu = 'OXNARD'";
  } elseif ($_POST['opcons'] == 'ph') {
    $query = $query."WHERE consu = 'PHOENIX'";
  } elseif ($_POST['opcons'] == 'po') {
    $query = $query."WHERE consu = 'PORTLAND'";
  } elseif ($_POST['opcons'] == 'pr') {
    $query = $query."WHERE consu = 'PRESIDIO'";  
  } elseif ($_POST['opcons'] == 'ra') {
    $query = $query."WHERE consu = 'RALEIGH'";
  } elseif ($_POST['opcons'] == 'sac') {
    $query = $query."WHERE consu = 'SACRAMENTO'";
  } elseif ($_POST['opcons'] == 'sai') {
    $query = $query."WHERE consu = 'SAINT PAUL'";
  } elseif ($_POST['opcons'] == 'sal') {
    $query = $query."WHERE consu = 'SALT LAKE CITY'";
  } elseif ($_POST['opcons'] == 'ant') {
    $query = $query."WHERE consu = 'SAN ANTONIO'";
  } elseif ($_POST['opcons'] == 'sbe') {
    $query = $query."WHERE consu = 'SAN BERNARDINO'";
  } elseif ($_POST['opcons'] == 'sdi') {
    $query = $query."WHERE consu = 'SAN DIEGO'";  
  } elseif ($_POST['opcons'] == 'sfr') {
    $query = $query."WHERE consu = 'SAN FRANCISCO'";
  } elseif ($_POST['opcons'] == 'sjo') {
    $query = $query."WHERE consu = 'SAN JOSE'";
  } elseif ($_POST['opcons'] == 'sju') {
    $query = $query."WHERE consu = 'SAN JUAN'";
  } elseif ($_POST['opcons'] == 'ana') {
    $query = $query."WHERE consu = 'SANTA ANA'";
  } elseif ($_POST['opcons'] == 'se') {
    $query = $query."WHERE consu = 'SEATTLE'";
  } elseif ($_POST['opcons'] == 'tu') {
    $query = $query."WHERE consu = 'TUCSON'";  
  } elseif ($_POST['opcons'] == 'wa') {
    $query = $query."WHERE consu = 'WASHINGTON DC'";
  } elseif ($_POST['opcons'] == 'yu') {
    $query = $query."WHERE consu = 'YUMA'";
  }
} else {
  if($_POST['opedo'] == 'alab') {
    $query = $query."WHERE statefp = '01'";
  } elseif ($_POST['opedo'] == 'alas') {
    $query = $query."WHERE statefp = '02'";
  } elseif ($_POST['opedo'] == 'ariz') {
    $query = $query."WHERE statefp = '04'";  
  } elseif ($_POST['opedo'] == 'arka') {
    $query = $query."WHERE statefp = '05'";
  } elseif ($_POST['opedo'] == 'cali') {
    $query = $query."WHERE statefp = '06'";
  } elseif ($_POST['opedo'] == 'carn') {
    $query = $query."WHERE statefp = '37'";
  } elseif ($_POST['opedo'] == 'cars') {
    $query = $query."WHERE statefp = '45'";  
  } elseif ($_POST['opedo'] == 'colo') {
    $query = $query."WHERE statefp = '08'";
  } elseif ($_POST['opedo'] == 'conn') {
    $query = $query."WHERE statefp = '10'";
  } elseif ($_POST['opedo'] == 'dakn') {
    $query = $query."WHERE statefp = '38'";
  } elseif ($_POST['opedo'] == 'daks') {
    $query = $query."WHERE statefp = '46'";  
  } elseif ($_POST['opedo'] == 'dela') {
    $query = $query."WHERE statefp = '11'";
  } elseif ($_POST['opedo'] == 'flor') {
    $query = $query."WHERE statefp = '12'";
  } elseif ($_POST['opedo'] == 'geor') {
    $query = $query."WHERE statefp = '13'";
  } elseif ($_POST['opedo'] == 'hawa') {
    $query = $query."WHERE statefp = '15'";  
  } elseif ($_POST['opedo'] == 'idah') {
    $query = $query."WHERE statefp = '16'";
  } elseif ($_POST['opedo'] == 'illi') {
    $query = $query."WHERE statefp = '17'";
  } elseif ($_POST['opedo'] == 'indi') {
    $query = $query."WHERE statefp = '18'";
  } elseif ($_POST['opedo'] == 'iowa') {
    $query = $query."WHERE statefp = '19'";  
  } elseif ($_POST['opedo'] == 'kans') {
    $query = $query."WHERE statefp = '20'";
  } elseif ($_POST['opedo'] == 'kent') {
    $query = $query."WHERE statefp = '21'";
  } elseif ($_POST['opedo'] == 'luis') {
    $query = $query."WHERE statefp = '22'";
  } elseif ($_POST['opedo'] == 'main') {
    $query = $query."WHERE statefp = '23'";  
  } elseif ($_POST['opedo'] == 'mary') {
    $query = $query."WHERE statefp = '24'";
  } elseif ($_POST['opedo'] == 'mass') {
    $query = $query."WHERE statefp = '25'";
  } elseif ($_POST['opedo'] == 'mich') {
    $query = $query."WHERE statefp = '26'";
  } elseif ($_POST['opedo'] == 'minn') {
    $query = $query."WHERE statefp = '27'";  
  } elseif ($_POST['opedo'] == 'misi') {
    $query = $query."WHERE statefp = '28'";
  } elseif ($_POST['opedo'] == 'misu') {
    $query = $query."WHERE statefp = '29'";
  } elseif ($_POST['opedo'] == 'mont') {
    $query = $query."WHERE statefp = '30'";
  } elseif ($_POST['opedo'] == 'nebr') {
    $query = $query."WHERE statefp = '31'";  
  } elseif ($_POST['opedo'] == 'neva') {
    $query = $query."WHERE statefp = '32'";
  } elseif ($_POST['opedo'] == 'njer') {
    $query = $query."WHERE statefp = '34'";
  } elseif ($_POST['opedo'] == 'nyor') {
    $query = $query."WHERE statefp = '36'";
  } elseif ($_POST['opedo'] == 'nham') {
    $query = $query."WHERE statefp = '33'";  
  } elseif ($_POST['opedo'] == 'nmex') {
    $query = $query."WHERE statefp = '35'";
  } elseif ($_POST['opedo'] == 'ohio') {
    $query = $query."WHERE statefp = '39'";
  } elseif ($_POST['opedo'] == 'okla') {
    $query = $query."WHERE statefp = '40'";
  } elseif ($_POST['opedo'] == 'oreg') {
    $query = $query."WHERE statefp = '41'";  
  } elseif ($_POST['opedo'] == 'pens') {
    $query = $query."WHERE statefp = '42'";
  } elseif ($_POST['opedo'] == 'rhod') {
    $query = $query."WHERE statefp = '44'";
  } elseif ($_POST['opedo'] == 'tene') {
    $query = $query."WHERE statefp = '47'";
  } elseif ($_POST['opedo'] == 'texa') {
    $query = $query."WHERE statefp = '48'";  
  } elseif ($_POST['opedo'] == 'utah') {
    $query = $query."WHERE statefp = '49'";
  } elseif ($_POST['opedo'] == 'verm') {
    $query = $query."WHERE statefp = '50'";
  } elseif ($_POST['opedo'] == 'virg') {
    $query = $query."WHERE statefp = '51'";
  } elseif ($_POST['opedo'] == 'wash') {
    $query = $query."WHERE statefp = '53'";
  } elseif ($_POST['opedo'] == 'wadc') {
    $query = $query."WHERE statefp = '54'"; 
  } elseif ($_POST['opedo'] == 'wisc') {
    $query = $query."WHERE statefp = '55'";
  } elseif ($_POST['opedo'] == 'wyom') {
    $query = $query."WHERE statefp = '56'";
  } elseif ($_POST['opedo'] == 'puer') {
    $query = $query."WHERE statefp = '72'";
  }
}

/*if($_POST['pob'] == 'a') {
  $query = $query."WHERE pob_2015 > 1000000 ";
} elseif ($_POST['pob'] == 'b') {
  $query = $query."WHERE pob_2015 < 1000000 AND pob_2015 > 500000";
} elseif ($_POST['pob'] == 'c') {
  $query = $query."WHERE pob_2015 < 500000 AND pob_2015 > 200000";
} elseif ($_POST['pob'] == 'd') {
  $query = $query."WHERE pob_2015 < 200000";
} elseif ($_POST['pob'] == 'e') {
  $query = $query."WHERE nomgeo like 'C%'";
} elseif ($_POST['pob'] == 'f') {
  $query = $query."WHERE nomgeo like 'T%'";
}*/
//echo $query;

$result = pg_query($query);
if (!$result) {
  die("Invalid query: " . pg_error());
}

$features = [];
while($row = @pg_fetch_assoc($result)) {
  $geometry = $row['coords'] = json_decode($row['coords']);
  unset($row['coords']);
  $feature = ["type"=>"Feature","geometry"=>$geometry,"properties" => $row];
  array_push($features,$feature);
}
$featureCollection = ["type"=>"FeatureCollection","features"=>$features];
echo json_encode($featureCollection); 

?>