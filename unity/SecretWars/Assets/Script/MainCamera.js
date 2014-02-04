
#pragma strict

var player : GameObject;

private var mostLeftPosition : float;
private var mostRightPosition : float;

function Start () {
	var wallLeft : GameObject = GameObject.Find('wall_left');
	var wallRight : GameObject = GameObject.Find('wall_right');
	mostLeftPosition = Camera.main.orthographicSize*-1;
	mostRightPosition = Camera.main.orthographicSize;
	Debug.Log(Camera.main.rect);
	Debug.Log(mostRightPosition);
}

function Update () {
	// x座標のみプレイヤーに合わせる
	var positionX : float = player.transform.position.x;
	Debug.Log(Camera.main.rect);
	if(positionX < mostLeftPosition){
		positionX = mostLeftPosition;
	}if(positionX > mostRightPosition){
		positionX = mostRightPosition;
	}
	transform.position = Vector3(positionX, transform.position.y, transform.position.z);
}