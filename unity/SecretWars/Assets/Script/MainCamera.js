#pragma strict

var player : GameObject;

function Start () {
	var y : float =transform.position.y;
	var z : float =transform.position.z;
Debug.Log(y);
Debug.Log(z);
}

function Update () {
	//プレイヤーどの位置に置くか
	transform.position = Vector3(player.transform.position.x, transform.position.y, transform.position.z);
}