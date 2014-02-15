#pragma strict

var mainCamera : Camera;


private var parentScript : Skeleton;
private var cameraScript : MainCamera;
private var runRadius : float;
private var runRadiusRate : float = 0.5;

function Start () {
	var  parent : GameObject = this.gameObject.transform.parent.gameObject;
	parentScript = parent.GetComponent("Skeleton");
	cameraScript = mainCamera.GetComponent("MainCamera");
	var sphereColliderObject : GameObject =  GameObject.Find('SkeletonCollider');
	var sphereCollider : SphereCollider = sphereColliderObject.GetComponent("SphereCollider");
	runRadius = sphereCollider.radius * runRadiusRate;
}

function OnTriggerEnter(other : Collider) {
	if(other.gameObject.tag == "Player"){
		cameraScript.SendMessage("zoomIn");
	}
}

function OnTriggerStay(other : Collider) {
	if(!parentScript.damageFlag){
		if(other.gameObject.tag == "Player"){
			var distance = Vector3.Distance(transform.position, other.transform.position);
			if(distance < runRadius){
				parentScript.speed = 1.2;
			}else{
				parentScript.speed = parentScript.defaultSpeed;
			}
		}
	}
}

function OnTriggerExit(other : Collider) {
	if(other.gameObject.tag == "Player"){
		var distance = Vector3.Distance(transform.position, other.transform.position);
		if(distance > runRadius){
			parentScript.speed = parentScript.defaultSpeed;
		}
    	cameraScript.SendMessage("zoomOut");
	}
}