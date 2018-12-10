const photos = [
  ["DSC02063",45.245474,-92.986970,"landscape"],
  ["DSC02072",45.245474,-92.986970,"landscape"],
  ["DSC02110",45.246647,-92.991829,"portrait"],
  ["DSC02186",45.258186,-92.918164,"landscape"],
  ["DSC02222",45.271285,-92.877985,"landscape"],
  ["DSC02241",45.272649,-92.866223,"portrait"],
  ["DSC02276",45.284104,-92.765107,"portrait"],
  ["DSC02290",45.288164,-92.761261,"portrait"],
  ["DSC02297",45.312242,-92.725622,"landscape"],
  ["DSC02345",45.322028,-92.718996,"portrait"],
  ["DSC02378",45.345976,-92.703577,"portrait"],
  ["DSC02392",45.370067,-92.693965,"landscape"],
  ["DSC02399",45.406701,-92.652973,"portrait"],
  ["DSC02506",45.473052,-92.913599,"landscape"],
  ["DSC02576",45.47857,-93.051599, "landscape"],
  ["DSC02599",45.484494,-93.050753,"landscape"],
  ["DSC02623",45.484434,-93.050516,"portrait"],
  ["DSC02637",45.484434,-93.050516,"landscape"],
  ["DSC02681",45.484434,-93.050516,"landscape"],
  ["DSC02752",45.484494,-93.050753,"landscape"],
  ["DSC02862",45.484432,-93.0506,  "landscape"],
  ["DSC02969",45.484906,-93.050891,"landscape"],
  ["DSC03067",45.245545,-92.987073,"landscape"],
  ["DSC03108",45.245545,-92.987073,"landscape"],
  ["DSC03126",45.245545,-92.987073,"landscape"],
  ["DSC03172",45.245545,-92.987073,"landscape"],
  ["DSC03180",45.245545,-92.987073,"portrait"],
  ["DSC03182",45.245545,-92.987073,"landscape"]
];

function getIndex(cur_photo) {
  let index = 0;
  for (i=0; i<photos.length; i++) {
    if (photos[i][0] == cur_photo) {
      index = i;
    }
  }
  return index;
}

function getNewPath(direction) {
  // Get the current img object, dissect the filename, 
  // get the next photo's filename, and create a new path to the next photo.
  let cur_photo = document.getElementById('cur_photo');
  let path = cur_photo.src.toString().split("/");

  let cur_filename = path.pop();    // This needs to be fixed!
  cur_filename = cur_filename.split(".jpg")[0];

  let beginning = path.join("/");         // Breaks any time the link/file path is different!

  let next_pos = 0;
  if (direction == "next") {
    next_pos = getIndex(cur_filename) + 1;
  } else if (direction == "prev") {
    next_pos = getIndex(cur_filename) - 1;
  }

  if (next_pos == photos.length) {
    document.getElementById('end').style.color = "black";
    next_pos = photos.length-1;
  } else if (next_pos !== photos.length) {
    document.getElementById('end').style.color = "white";
  }
  
  if (next_pos < 0) {
    next_pos = 0;
  }

  let new_filename = photos[next_pos][0];
  let new_path = beginning + "/" + new_filename + ".jpg";
  return [new_path, next_pos];
}

function createNewImg(direction) {
  // Create a new img object and assign the new path to it. Assign the new img the cur_photo id
  // so it can be changed every time nextPhoto() is called. Change the alt attribute
  // and add either "landscape" or "portrait" to the classList so the dimensions display accordingly.
  let package = getNewPath(direction);
  let new_path = package[0];
  let next_pos = package[1]
  let new_img = document.createElement("img");
  new_img.src = new_path;
  new_img.id = "cur_photo";
  new_img.alt = "Current Image";
  new_img.classList.add(photos[next_pos][3]);
  moveMap(next_pos);
  return new_img;
}

function nextPhoto() {
  let new_img = createNewImg("next");
  document.getElementById('cur_photo').replaceWith(new_img);
}

function previousPhoto() {
  let new_img = createNewImg("prev");
  document.getElementById('cur_photo').replaceWith(new_img);
}

var map;
function initMap() {
  var airport = {lat: 45.245545, lng: -92.987073};
  map = new google.maps.Map(document.getElementById('map'), {center: airport, zoom: 16, mapTypeId: 'satellite', rotateControl: true});
  var marker = new google.maps.Marker({position: airport, map: map});
  plotMarkers()
}

function plotMarkers() {
  for (i=0; i<photos.length; i++) {
    var marker = new google.maps.Marker({position: {lat: photos[i][1], lng: photos[i][2]}, map: map});
  }
}

function moveMap(pos) {
  map.setCenter({lat: photos[pos][1], lng: photos[pos][2]});
}