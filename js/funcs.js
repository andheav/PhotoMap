const photos = [
  ["DSC02063",45.245474,-92.986970,"landscape", 17, null, null],
  ["DSC02072",45.245474,-92.986970,"landscape", 17, null, null],
  ["DSC02110",45.246647,-92.991829,"portrait", 16, null, null],
  ["DSC02186",45.258186,-92.918164,"landscape", 15, 45.257075, -92.915957],
  ["DSC02222",45.271285,-92.877985,"landscape", 16, null, null],
  ["DSC02241",45.272649,-92.866223,"portrait", 16, 45.271351, -92.864745],
  ["DSC02276",45.284270, -92.766022,"portrait", 15, 45.281133, -92.760860],
  ["DSC02290",45.288164,-92.761261,"portrait", 15, 45.283101, -92.760104],
  ["DSC02297",45.312242,-92.725622,"landscape", 15, null, null],
  ["DSC02345",45.322028,-92.718996,"portrait", 15, 45.321829, -92.713144],
  ["DSC02378",45.345976,-92.703577,"portrait", 15, 45.347749, -92.698631],
  ["DSC02392",45.370067,-92.693965,"landscape", 13, null, null],
  ["DSC02399",45.406701,-92.652973,"portrait", 15, 45.409986, -92.649652],
  ["DSC02506",45.473052,-92.913599,"landscape", 14, 45.477103, -92.905793],
  ["DSC02576",45.47857,-93.051599, "landscape", 15, null, null],
  ["DSC02599",45.484494,-93.050753,"landscape", 18, null, null],
  ["DSC02623",45.484434,-93.050516,"portrait", 19, null, null],
  ["DSC02637",45.484434,-93.050516,"landscape", 19, null, null],
  ["DSC02681",45.484434,-93.050516,"landscape", 19, null, null],
  ["DSC02752",45.484494,-93.050753,"landscape", 19, null, null],
  ["DSC02862",45.484631,-93.050602,  "landscape", 18, null, null],
  ["DSC02969",45.484906,-93.050891,"landscape", 17, 45.484657, -93.050612],
  ["DSC03067",45.245545,-92.987073,"landscape", 17, null, null],
  ["DSC03108",45.245545,-92.987073,"landscape", 17, null, null],
  ["DSC03126",45.245545,-92.987073,"landscape", 17, null, null],
  ["DSC03172",45.245545,-92.987073,"landscape", 17, null, null],
  ["DSC03180",45.245545,-92.987073,"portrait", 17, null, null],
  ["DSC03182",45.245545,-92.987073,"landscape", 17, null, null]
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
  map = new google.maps.Map(document.getElementById('map'), {center: airport, zoom: 17, mapTypeId: 'satellite', mapTypeControl: false, streetViewControl: false});
  var marker = new google.maps.Marker({position: airport, map: map});
  plotMarkers()
}

function plotMarkers() {
  for (i=0; i<photos.length; i++) {
    var marker = new google.maps.Marker({position: {lat: photos[i][1], lng: photos[i][2]}, map: map});
  }
}

function hasNewCenter(pos) {
  if (photos[pos][5] == null && photos[pos][6] == null) {
    return false
  } else {
    return true
  }
}

function moveMap(pos) {
  if (hasNewCenter(pos)) {
    map.setCenter({lat: photos[pos][5], lng: photos[pos][6]});
  } else {
    map.setCenter({lat: photos[pos][1], lng: photos[pos][2]});
  }
  console.log(photos[pos][0] + ": " + photos[pos][1] + ", " + photos[pos][2]);
  map.setZoom(photos[pos][4]);    // This is the function to use to change zooms
}