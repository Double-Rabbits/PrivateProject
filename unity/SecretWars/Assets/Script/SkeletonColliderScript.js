#pragma strict

var mainCamera : Camera;

private var parentScript : Skeleton;
private var cameraScript : MainCamera;

function Start () {
	var  parent : GameObject = this.gameObject.transform.parent.gameObject;
	//Debug.Log(parent.name);
	parentScript = parent.GetComponent("Skeleton");
	cameraScript = mainCamera.GetComponent("MainCamera");
}

function OnTriggerEnter(other : Collider) {
	if(other.gameObject.tag == "Player"){
		//Debug.Log("OnTriggerEnter");
		cameraScript.SendMessage("zoomIn");
	}
}

function OnTriggerStay(other : Collider) {
	if(!parentScript.damageFlag){
		if(other.gameObject.tag == "Player"){
    		parentScript.speed = 1.2;
		}
	}
}

function OnTriggerExit(other : Collider) {
	if(other.gameObject.tag == "Player"){
		//Debug.Log("OnTriggerExit");
    	parentScript.speed = parentScript.defaultSpeed;
    	cameraScript.SendMessage("zoomOut");
	}
}