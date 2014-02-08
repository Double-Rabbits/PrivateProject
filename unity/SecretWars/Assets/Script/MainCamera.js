
#pragma strict

var player : GameObject;

private var mostLeftPosition : float;
private var mostRightPosition : float;

function Start () {
	var wallLeft : GameObject = GameObject.Find('wall_left');
	var wallRight : GameObject = GameObject.Find('wall_right');
	var height = Camera.main.orthographicSize * 2.0;
	var width = height * Screen.width / Screen.height;
	mostLeftPosition = wallLeft.transform.position.x + width/2;
	mostRightPosition = wallRight.transform.position.x - width/2;
}

function Update () {
	// x座標のみプレイヤーに合わせる
	var positionX : float = player.transform.position.x;
	// 画面端調整
	if(positionX < mostLeftPosition){
		positionX = mostLeftPosition;
	}if(positionX > mostRightPosition){
		positionX = mostRightPosition;
	}
	transform.position = Vector3(positionX, transform.position.y, transform.position.z);
}

function zoomIn(){

	Debug.Log("zoomIn");
}

function zoomOut(){
	Debug.Log("zoomOut");
}