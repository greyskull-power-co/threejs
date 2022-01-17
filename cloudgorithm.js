//creates basic low poly count clouds
//draws a core cloud, then 3-7 sub clouds that sit on the circumference of the core cloud

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function createClouds(){
  var cloudCount = 10;
//  const cloudMat = new THREE.MeshBasicMaterial( { color: 0xFFFFFF, opacity:0.0, transparent:true, fog: false } );
  var cloudHeight;
  var existingClouds = 0;
  for (i=0;i<scene.children.length;i++){
    try{
      if (scene.children[i].name == "cloud"){
        existingClouds = existingClouds + 1;
      }
    }
  catch (error){
    }
  }
  if (existingClouds < cloudCount){
    var neededClouds = cloudCount - existingClouds;
    for (i=0;i<neededClouds;i++){

      var radius = randomInteger(100,500);
      var radialSegments = Math.round(radius / 10);
      var cloudMaterial = new THREE.MeshToonMaterial({color: "white", opacity:0.0, transparent:true});
      var hemiSphereGeom = new THREE.SphereBufferGeometry(radius, radialSegments, Math.round(radialSegments / 4), 0, Math.PI * 2, 0, Math.PI * 0.5);
      var coreCloud = new THREE.Mesh(hemiSphereGeom, cloudMaterial);
      var bottomGeom = new THREE.CircleBufferGeometry(radius + 1, radialSegments);//adding one here gets rid of the seams
      bottomGeom.rotateX(Math.PI * 0.5);
      var bottom = new THREE.Mesh(bottomGeom, cloudMaterial);
      coreCloud.add(bottom);

      var subClouds = randomInteger(3,7);
      for (w=0;w<subClouds;w++){
        var subCloudRadius = randomInteger(radius*.2,radius*.7);
        var subRadialSegments = Math.round(radius / 10);
        var subHemiSphereGeom = new THREE.SphereBufferGeometry(subCloudRadius, subRadialSegments, Math.round(subRadialSegments / 4), 0, Math.PI * 2, 0, Math.PI * 0.5);
        var subCloud = new THREE.Mesh(subHemiSphereGeom,cloudMaterial);
        var subCloudBottomGeom = new THREE.CircleBufferGeometry(subCloudRadius + 1, subRadialSegments)
        subCloudBottomGeom.rotateX(Math.PI * 0.5);
        var subCloudBottom = new THREE.Mesh(subCloudBottomGeom, cloudMaterial);
        var subCloudAngle = randomInteger(0,360);
        subCloud.add(subCloudBottom);
        subCloud.position.x = radius*Math.sin(subCloudAngle);
        subCloud.position.z = radius*Math.cos(subCloudAngle);
        coreCloud.add(subCloud);
      }
      scene.add(coreCloud);
      coreCloud.userData = {layer: "cloud"};
      coreCloud.position.y = randomInteger(-200,0);
      coreCloud.name = "cloud";
      coreCloud.position.x = scene.getObjectByName(my_id).position.x - randomInteger(maxCloudDistance*-1,maxCloudDistance);
      coreCloud.position.z = scene.getObjectByName(my_id).position.z - randomInteger(maxCloudDistance*-1,maxCloudDistance);
    }
  }

}

function animateClouds(){
  for (i=0;i<scene.children.length;i++){
    try{
    if (scene.children[i].name == "cloud"){
      //Do this with the distance formula...
      if ( Math.abs(scene.children[i].position.x) - Math.abs(scene.getObjectByName(my_id).position.x) > maxCloudDistance || Math.abs(scene.children[i].position.z) - Math.abs(scene.getObjectByName(my_id).position.z) > maxCloudDistance ){
        scene.remove(scene.children[i]);
      }
      if (scene.children[i].material.opacity < 1){
        scene.children[i].material.opacity = scene.children[i].material.opacity + .05;
      }
      scene.children[i].position.x = ( scene.children[i].position.x + .25 );
    }
  }
  catch (error){
  }
  }
}
