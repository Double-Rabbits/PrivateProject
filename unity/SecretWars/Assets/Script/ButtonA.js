#pragma strict

var targetObj : GameObject;
var script : samuzai;
var animator : Animator;
var touch: Touch;

function Start () {
	targetObj = GameObject.Find("samuzai");
	script = targetObj.GetComponent(samuzai);
}

function OnMouseDown () {
	script.attack();
}

function Update () {
	if(Input.touchCount > 0){
		for(var i=0 ; i<Input.touchCount ; i++){
			touch = Input.GetTouch(i);
			if(guiTexture.HitTest(touch.position))
	        {
				script.attack();
	        }
		}
	}
}