var map = L.map('map',{
  minZoom:2,
  maxZoom:15,
  //maxBounds:bounds
}).setView([36.37504, -99.11346], 4); // ajustar coordenadas y nivel de zoom

//Mapas Base//
var osmLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap<\/a> contributors'
}).addTo(map);
var Stadia_AlidadeSmooth = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {
maxZoom: 20,
attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
});
var OpenStreetMap_Mapnik = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
maxZoom: 19,
attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});
var Esri_NatGeoWorldMap = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', {
attribution: 'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC',
maxZoom: 16
});
var Esri_DeLorme = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/Specialty/DeLorme_World_Base_Map/MapServer/tile/{z}/{y}/{x}', {
attribution: 'Tiles &copy; Esri &mdash; Copyright: &copy;2012 DeLorme',
minZoom: 1,
maxZoom: 11
});
var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});
//Mapas base Google
// Calles
var gCalles = googleStreets = L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
maxZoom: 20,
subdomains:['mt0','mt1','mt2','mt3']
});
// Hibrido
var gHibrido = googleHybrid = L.tileLayer('https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{
maxZoom: 20,
subdomains:['mt0','mt1','mt2','mt3']
});
// Satelite
var gSatelite = googleSat = L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
maxZoom: 20,
subdomains:['mt0','mt1','mt2','mt3']
});
// Terreno
var gTerreno = googleTerrain = L.tileLayer('https://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',{
maxZoom: 20,
subdomains:['mt0','mt1','mt2','mt3']
});

var capasBase = {
  "Stadia" : Stadia_AlidadeSmooth,
"Calles Mapnik": OpenStreetMap_Mapnik,
"Nat Geo": Esri_NatGeoWorldMap,
"Carreteras": osmLayer,
"Topo": Esri_DeLorme,
"Satelite": Esri_WorldImagery,
"Calles Google": gCalles,
"Hibrido Google": gHibrido,
"Satelite Google": gSatelite,
"Terreno Google": gTerreno
};
///////////////////Añadir servicios/////////////////////////
///////////////////servicios wfs//////////////////////////////Aguas con la IP 

var owsrootUrl = 'http://192.168.3.68/geoserver/geoweb/wfs';

var defaultParameters = {
    service : 'WFS',
    version : '2.0',
    request : 'GetFeature',
    typeName : 'geoweb:mexpop',
    outputFormat : 'text/javascript',
    format_options : 'callback:getJson',
    SrsName : 'EPSG:4326'
};

var parameters = L.Util.extend(defaultParameters);
var URL = owsrootUrl + L.Util.getParamString(parameters);
//console.log(URL);
var mtbp = null;
var mexpopajax = $.ajax({
  url : URL,
    dataType : 'jsonp',
    jsonpCallback : 'getJson',
    success : function (response) {
      //console.log(response);
      mtbp = L.geoJson(response, {
      style: function(feature){
        return{
          stroke:true,
          color:getColour1(feature.properties.mex_pop),
          fillOpacity: 0.8,
          opacity:0.7,
          weight: 1
        };
      },
      onEachFeature: function (feature, layer){
        popupOptions = {maxWidth: 200};
        layer.bindPopup("<b>"+feature.properties.NAME+"</b><br/>"+feature.properties.mex_pop,popupOptions);
        "<b>"+feature.properties.col_name+"</b><br/>"+feature.properties.mun_name + "<br/>" + feature.properties.sta_name
      
        layer.on({
            click: highlightOneFeature
        });
      }
      }).addTo(map);
    }
});

function getColour1(c) {
    if(c >= 5000) {
    return "#88419d";
    } else if(c<=5000 && c >= 1000) {
    return "#8c96c6";
    } else if(c<=1000 && c >=500) {
    return "#b3cde3";
    } else{
      return "#edf8fb"
    }
};

var highlightedFeature = null
function highlightOneFeature(e) {
  if (highlightedFeature) {
    resetHighlight(highlightedFeature);
  };
var layer = e.target;
  highlightedFeature = layer;
  layer.setStyle({
    fillColor: "yellow",
      color: "yellow",
      weight: 2,
      opacity: 0.5
  });

  if (!L.Browser.ie && !L.Browser.opera) {
    layer.bringToFront();
  }
}

function resetHighlight(layer) {
  layer.setStyle({
    fillColor: getColour1(layer.feature.properties.mex_pop),
    color: getColour1(layer.feature.properties.mex_pop),
    fillOpacity: 0.8,
    opacity: 0.7,
    weight: 1
  });
}

function toggleLayer() {
  if (map.hasLayer(mtbp)) {
    map.removeLayer(mtbp);
}}
////////////WMS LATINPOP//////////

var url = 'http://192.168.3.68/geoserver/geoweb/wms';
var capaWMS = L.tileLayer.betterWms(url, {
  layers: 'latinpop',
  transparent: true,
  format: 'image/png'
});

  // Insertando una leyenda en el mapa
var legend = L.control({position: 'bottomright'});
legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend');
    div.innerHTML += '<img alt="leyenda" src="http://192.168.3.68/geoserver/geoweb/ows?service=WMS&request=GetLegendGraphic&format=image%2Fpng&width=20&height=20&layer=latinpop" />';
    return div;
};
legend.addTo(map);
// Cargar GeoJSON desde un archivo local////////////

var geojsonMarkerOptions = {
radius: 3,
fillColor: "#000000",
color: "#000",
weight: 1,
opacity: 1,
fillOpacity: 0.8
};
var misdatos = L.geoJson(null, {
pointToLayer: function (feature, latlng) {
  return L.circleMarker(latlng, geojsonMarkerOptions);
},
onEachFeature: popUpInfo
});

$.getJSON("poi/Dir_Consulados.geojson", function (data) {
misdatos.addData(data);
});

misdatos.addTo(map);

/* 	$.getJSON("poi/coloniascdmx.geojson", function(coloniasdata) {
L.geoJson(coloniasdata).addTo(map);
}); */
/////////////////////////////////////////////////
function popUpInfo(feature, layer) {
if (feature.properties && feature.properties.col_name) {
layer.bindPopup("<b>"+feature.properties.col_name+"</b><br/>"+feature.properties.mun_name + "<br/>" + feature.properties.sta_name);
}
}  
L.control.scale().addTo(map);
//  L.control.layers(capasBase).addTo(map); ///////////////
var overlayMaps= {
"Consulados":misdatos,
"WMS": capaWMS
}

L.control.layers(capasBase,overlayMaps).addTo(map);

////////////////////////////////////////////////////
function popUpInfo(features,layer) {
if (features.properties && features.properties.nombre) {
//layer.bindPopup("<b>Alcaldia:" + features.properties.nomgeo + "</b><br/>Poblacion = " + features.properties.pob_2015);
layer.bindTooltip("<b>Condado:" + features.properties.nombre + "</b><br/>Consulado = " + features.properties.consu);
}
}

var miconsulta = L.geoJson(null, {
style: function (feature) {
  if($("#consu").is(":checked") == true){
      optColorear = feature.properties.consu;
      columna = 'consu'
  } else {
      optColorear = feature.properties.statefp;
      columna = 'statefp';
  }
  return {
      stroke: true,
      color: getColour(optColorear, columna),
      opacity: 0.7,
      weight: 1
  };
  },
  onEachFeature: popUpInfo
});

function getColour(feature, campo) {
if (campo=='consu') {
if(feature == 'ATLANTA') {
return "#000000";
} else if(feature == 'SEATTLE') {
return "#c90076";
} else if(feature == 'DOUGLAS') {
return "#6a329f";
} else if(feature == 'NOGALES') {
return "#16537e";
} else if(feature == 'PHOENIX') {
return "#2986cc";
} else if(feature == 'TUCSON') {
return "#8fce00";
} else if(feature == 'YUMA') {
return "#ce7e00";
} else if(feature == 'LITTLE ROCK') {
return "#744700";
} else if(feature == 'CALEXICO') {
return "#f44336";
} else if(feature == 'FRESNO') {
return "#741b47";
} else if(feature == 'LOS ANGELES') {
return "#351c75";
} else if(feature == 'OXNARD') {
return "#38761d";
} else if(feature == 'SACRAMENTO') {
return "#f1c232";
} else if(feature == 'SAN BERNARDINO') {
return "#990000";
} else if(feature == 'SAN DIEGO') {
return "#3ee5f3";
} else if(feature == 'SAN FRANCISCO') {
return "#ffa8d2";
} else if(feature == 'SAN JOSE') {
return "#96b4a5";
} else if(feature == 'SANTA ANA') {
return "#9dca88";
} else if(feature == 'DENVER') {
return "#260d29";
} else if(feature == 'NEW YORK') {
return "#83937c";
} else if(feature == 'FILADELFIA') {
return "#8397bc";
} else if(feature == 'WASHINGTON DC') {
return "#e06666";
} else if(feature == 'MIAMI') {
return "#f6b26b";
} else if(feature == 'ORLANDO') {
return "#f27c00";
} else if(feature == 'ALBUQUERQUE') {
return "#f2ec00";
} else if(feature == 'AUSTIN') {
return "#e9e684";
} else if(feature == 'BOISE') {
return "#9f9e6e";
} else if(feature == 'BOSTON') {
return "#d0e0e3";
} else if(feature == 'BROENSVILLE') {
return "#ffe599";
} else if(feature == 'CHICAGO') {
return "#4fef08";
} else if(feature == 'DALLAS') {
return "#267304";
} else if(feature == 'DEL RIO') {
return "#a7dc8f";
} else if(feature == 'DETROIT') {
return "#bfb4da";
} else if(feature == 'EAGLE PASS') {
return "#988fae";
} else if(feature == 'EL PASO') {
return "#2b0a81";
} else if(feature == 'HOUSTON') {
return "#4600fa";
} else if(feature == 'INDIANAPOLIS') {
return "#cb00fa";
} else if(feature == 'KANSAS CITY') {
return "#c35cda";
} else if(feature == 'LAREDO') {
return "#da5cba";
} else if(feature == 'LAS VEGAS') {
return "#e59cd3";
} else if(feature == 'MC ALLEN') {
return "##7e3c6d";
} else if(feature == 'MILWAUKEE') {
return "#965f0a";
} else if(feature == 'NUEVA ORLEANS') {
return "#af8f5b";
} else if(feature == 'OMAHA') {
return "#d9ead3";
} else if(feature == 'PORTLAND') {
return "#d0e0e3";
} else if(feature == 'PRESIDIO') {
return "#d9d2e9";
} else if(feature == 'RALEIGH') {
return "#ead1dc";
} else if(feature == 'SAINT PAUL') {
return "#fff2cc";
} else if(feature == 'SALT LAKE CITY') {
return "#00695C";
} else if(feature == 'SAN ANTONIO') {
return "#f4cccc";
} else if(feature == 'SAN JUAN, PUERTO RIC') {
return "#0a4b59";
} else {
return "#f40707";
}
} else if (campo=='statefp') {
if(feature == '01') {
return "#000000";
} else if(feature == '02') {
return "#c90076";
} else if(feature == '04') {
return "#6a329f";
} else if(feature == '05') {
return "#16537e";
} else if(feature == '06') {
return "#2986cc";
} else if(feature == '08') {
return "#8fce00";
} else if(feature == '09') {
return "#ce7e00";
} else if(feature == '10') {
return "#744700";
} else if(feature == '11') {
return "#f44336";
} else if(feature == '12') {
return "#741b47";
} else if(feature == '13') {
return "#351c75";
} else if(feature == '15') {
return "#38761d";
} else if(feature == '16') {
return "#f1c232";
} else if(feature == '17') {
return "#990000";
} else if(feature == '18') {
return "#3ee5f3";
} else if(feature == '19') {
return "#ffa8d2";
} else if(feature == '20') {
return "#96b4a5";
} else if(feature == '21') {
return "#9dca88";
} else if(feature == '22') {
return "#260d29";
} else if(feature == '23') {
return "#83937c";
} else if(feature == '24') {
return "#8397bc";
} else if(feature == '25') {
return "#e06666";
} else if(feature == '26') {
return "#f6b26b";
} else if(feature == '27') {
return "#f27c00";
} else if(feature == '28') {
return "#f2ec00";
} else if(feature == '29') {
return "#e9e684";
} else if(feature == '30') {
return "#9f9e6e";
} else if(feature == '31') {
return "#d0e0e3";
} else if(feature == '32') {
return "#ffe599";
} else if(feature == '33') {
return "#4fef08";
} else if(feature == '34') {
return "#267304";
} else if(feature == '35') {
return "#a7dc8f";
} else if(feature == '36') {
return "#bfb4da";
} else if(feature == '37') {
return "#988fae";
} else if(feature == '38') {
return "#2b0a81";
} else if(feature == '39') {
return "#4600fa";
} else if(feature == '40') {
return "#cb00fa";
} else if(feature == '41') {
return "#c35cda";
} else if(feature == '42') {
return "#da5cba";
} else if(feature == '44') {
return "#e59cd3";
} else if(feature == '45') {
return "##7e3c6d";
} else if(feature == '46') {
return "#965f0a";
} else if(feature == '47') {
return "#af8f5b";
} else if(feature == '48') {
return "#d9ead3";
} else if(feature == '49') {
return "#d0e0e3";
} else if(feature == '50') {
return "#d9d2e9";
} else if(feature == '51') {
return "#ead1dc";
} else if(feature == '53') {
return "#fff2cc";
} else if(feature == '54') {
return "#00695C";
} else if(feature == '55') {
return "#f4cccc";
} else if(feature == '56') {
return "#0a4b59";
} else {
return "#f40707";
}
}

}

///////////////////////////////////////////////////

$(document).ready(function(){
$('#envio_post').submit(function() {
  //alert("Alcaldías = " + document.getElementById('consu').checked);
  //alert("Densidad = " + document.getElementById('den_pob').checked);
  alert($("#consu").is(":checked"));
  var radio1 = $("#consu").is(":checked");
  var radio2 = $("#edo").is(":checked");
  var optcons = $("#l_cons option:selected").val();
  var optedo = $("#l_edo option:selected").val();
  if (radio1 == false && radio2==false){
      alert("Selecciona alguna de las dos opciones de consulta");
      return false;
  } else {
      var URL = 'php/consu.php';
      var contenido_html = "";
      var ajax_post = $.ajax({
          type : "POST",
          url : URL,
          dataType : 'json',
          data : {
              consu: radio1,
              edo: radio2,
              opcons: optcons,
              opedo: optedo,
          },
          cache: false,
          timeout:10000,
      success : function (respuesta) {
      //limpia la capa temporal de consulta anterior
      miconsulta.clearLayers();
      $('#contenido').html('');
      if(respuesta.features.length > 0) {
          miconsulta.addData(respuesta);
          //Recorre los resultados obtenidos
          //console.log(respuesta);
          for (var i = 0; i < respuesta.features.length; i++) {
              contenido_html = "Condado: " + respuesta.features[i].properties.nombre + "<br/>";
              contenido_html += "Estado: " + respuesta.features[i].properties.statefp + "<br/>";
              contenido_html += "Consulado: " + respuesta.features[i].properties.consu + "<br/>";
              contenido_html += "<hr/>";
  $('#contenido').append(contenido_html);
} //fin del for
      } else {
          contenido_html = "La consulta no tiene resultados";
          $('#contenido').append(contenido_html);
      }
          
      },
      error : function(jqXHR, estado, error) {
          $('#contenido').html('Se produjo un error:' + estado + ' error: ' + error);
      }
      });
      ///////////////////////////////////////
      miconsulta.addTo(map);

      //previene el re-envío del requerimiento
      return false;
  } //fin del if que verifica la seleccion de radio button
}); //fin del evento submit
}); //fin de la fn document.ready