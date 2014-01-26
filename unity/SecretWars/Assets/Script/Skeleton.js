#pragma strict

var targetObj : GameObject;
var speed :float;
var gravity : float;

private var controller:CharacterController;

function Start () {
	controller = GetComponent(CharacterController);
	targetObj = GameObject.Find("samuzai");
}

function Update()
{
	var moveDirection = Vector3.zero;
	var  targetDirection :Vector3 =  Vector3(targetObj.transform.position.x,this.transform.position.y,targetObj.transform.position.z);
	this.transform.rotation = Quaternion.Slerp(this.transform.rotation, Quaternion.LookRotation(targetDirection -     this.transform.position), Time.time * 0.1);
	moveDirection += transform.forward*1;
	moveDirection.y -= gravity * Time.deltaTime;
	controller.Move(moveDirection * Time.deltaTime  *  speed);
	//Debug.Log(moveDirection);
}

function OnCollisionEnter(collision:Collision)
{
	Debug.Log("OnCollisionEnter");
}

function OnCollisionStay(collision:Collision)
{
	Debug.Log("OnCollisionStay");
}

function OnCollisionExit(collision:Collision)
{
	Debug.Log("OnCollisionExit");
}

function OnControllerColliderHit(hit : ControllerColliderHit) {
	if(hit.gameObject.tag != "Player"){
    	return;
	}
	//Debug.Log(hit.gameObject.name);
	var hitController:CharacterController = hit.gameObject.GetComponent(CharacterController);
	hitController.Move(hit.moveDirection * Time.deltaTime *0.5);
}
