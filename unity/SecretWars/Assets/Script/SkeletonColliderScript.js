#pragma strict

private var parentScript : Skeleton;

function Start () {
	var  parent : GameObject = this.gameObject.transform.parent.gameObject;
	//Debug.Log(parent.name);
	parentScript = parent.GetComponent("Skeleton");
}

function OnTriggerStay(other : Collider) {
	if(!parentScript.damageFlag){
		//Debug.Log("OnTriggerStay");
		if(other.gameObject.tag == "Player"){
    		parentScript.speed = 1.2;
		}
	}
}

function OnTriggerExit(other : Collider) {
	if(other.gameObject.tag == "Player"){
		//Debug.Log("OnTriggerExit");
    	parentScript.speed = parentScript.defaultSpeed;
	}
}