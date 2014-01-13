#pragma strict

var targetObj : GameObject;
var script : samuzai;
var animator : Animator;
var touch: Touch;

function OnMouseDown () {
	targetObj = GameObject.Find("samuzai");
	script = targetObj.GetComponent(samuzai);
	script.attack();
}

function Update () {
	if(Input.touchCount > 0){
		touch = Input.GetTouch(0);
		if(guiTexture.HitTest(touch.position))
        {
        	Debug.Log('script.attack');
			script.attack();
        }
	}
}