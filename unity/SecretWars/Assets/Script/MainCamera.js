
#pragma strict

var player : GameObject;

var zoomRate : float;
var smooth : float;
var maxCameraPositionVerticalZ : float;
var minNormalCameraPositionVerticalZ : float;
var minZoomCameraPositionVerticalZ : float;

private var wallLeft : GameObject;
private var wallRight : GameObject;
private var height : float;
private var width : float;
private var mostLeftPosition : float;
private var mostRightPosition : float;
private var isZoomed = false;
private var normalOrthographicSize : float;
private var zoomOrthographicSize : float;
private var initCameraPositionZ : float;
private var initPlayerPositionZ : float;
private var minCameraPositionVerticalZ : float;

function Start () {
	wallLeft = GameObject.Find('wall_left');
	wallRight = GameObject.Find('wall_right');
	normalOrthographicSize = Camera.main.orthographicSize;
	zoomOrthographicSize = normalOrthographicSize * zoomRate;
	height = normalOrthographicSize * 2.0;
	width = height * Screen.width / Screen.height;
	mostLeftPosition = wallLeft.transform.position.x + width/2;
	mostRightPosition = wallRight.transform.position.x - width/2;
	initCameraPositionZ = Camera.main.transform.position.z;
	initPlayerPositionZ = player.transform.position.z;
	minCameraPositionVerticalZ = minNormalCameraPositionVerticalZ;
}

function Update () {
	// x座標
	var positionX : float = player.transform.position.x;
	// 画面端調整
	if(positionX < mostLeftPosition){
		positionX = mostLeftPosition;
	}if(positionX > mostRightPosition){
		positionX = mostRightPosition;
	}
	// y座標
	var positionZ : float = initCameraPositionZ + player.transform.position.z - initPlayerPositionZ;
	// 画面端調整
	if(positionZ < minCameraPositionVerticalZ){
		positionZ = minCameraPositionVerticalZ;
	}if(positionZ > maxCameraPositionVerticalZ){
		positionZ = maxCameraPositionVerticalZ;
	}

	transform.position = Vector3(positionX, transform.position.y, positionZ);
	
	if(isZoomed == true){
  		Camera.main.orthographicSize = Mathf.Lerp(Camera.main.orthographicSize,zoomOrthographicSize,Time.deltaTime*smooth);
  		mostLeftPosition = Mathf.Lerp(mostLeftPosition,wallLeft.transform.position.x + width/2,Time.deltaTime*smooth);
  		mostRightPosition = Mathf.Lerp(mostRightPosition,wallRight.transform.position.x - width/2,Time.deltaTime*smooth);
  		minCameraPositionVerticalZ = Mathf.Lerp(minCameraPositionVerticalZ,minZoomCameraPositionVerticalZ,Time.deltaTime*smooth);
     }
     else{
        Camera.main.orthographicSize = Mathf.Lerp(Camera.main.orthographicSize,normalOrthographicSize,Time.deltaTime*smooth);
  		mostLeftPosition = Mathf.Lerp(mostLeftPosition,wallLeft.transform.position.x + width/2,Time.deltaTime*smooth);
  		mostRightPosition = Mathf.Lerp(mostRightPosition,wallRight.transform.position.x - width/2,Time.deltaTime*smooth);
  		minCameraPositionVerticalZ = Mathf.Lerp(minCameraPositionVerticalZ,minNormalCameraPositionVerticalZ,Time.deltaTime*smooth);
     }
}

function zoomIn(){
	isZoomed = true;
	height = zoomOrthographicSize * 2.0;
	width = height * Screen.width / Screen.height;
}

function zoomOut(){
	isZoomed = false;
	height = normalOrthographicSize * 2.0;
	width = height * Screen.width / Screen.height;
}