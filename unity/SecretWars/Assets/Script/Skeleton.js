﻿#pragma strict

var targetObj : GameObject;
var speed :float;
var gravity : float;
var damageFlag : boolean;
var direction : float;

private var controller:CharacterController;
private var animator : Animator;
private var state : AnimatorStateInfo;

function Start () {
	controller = GetComponent(CharacterController);
	targetObj = GameObject.Find("samuzai");
	animator = GetComponent(Animator);
	direction = 1;
}

function Update()
{
	animator.SetBool("DamagedFlag", damageFlag);	
	if(!damageFlag){
		direction = 1;
	}
		
	state = animator.GetCurrentAnimatorStateInfo(0);
	if(state.IsName("Base Layer.Damage")){
		direction = -5;
		if(state.normalizedTime > state.length){
				damageFlag = false;
				direction = 0;
		}
	}
	
	var moveDirection = Vector3.zero;
	var  targetDirection :Vector3 =  Vector3(targetObj.transform.position.x,this.transform.position.y,targetObj.transform.position.z);
	this.transform.rotation = Quaternion.Slerp(this.transform.rotation, Quaternion.LookRotation(targetDirection -     this.transform.position), Time.time * 0.1);
	moveDirection += transform.forward*1;
	moveDirection.y -= gravity * Time.deltaTime;
	controller.Move(moveDirection * Time.deltaTime  *  speed * direction);
}

function OnControllerColliderHit(hit : ControllerColliderHit) {
	if(hit.gameObject.tag != "Player"){
    	return;
	}
	//Debug.Log(hit.gameObject.name);
	var hitController:CharacterController = hit.gameObject.GetComponent(CharacterController);
	Debug.Log(hit.moveDirection);
	hitController.Move(hit.moveDirection * Time.deltaTime *0.5);
}
