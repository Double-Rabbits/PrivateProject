#pragma strict

var targetObj : GameObject;
var script : samuzai;

function Start () {
	targetObj = GameObject.Find("samuzai");
	script = targetObj.GetComponent(samuzai);
}

function OnTriggerEnter(other : Collider) {
	if(other.gameObject.tag != "Enemy"){
    	return;
	}
}

function OnTriggerStay(other : Collider) {
	if(other.gameObject.tag != "Enemy"){
    	return;
	}
	if(script.attackFlag){
		// 敵キャラクターに攻撃がヒット
		script.hitAttack(other);
	}    
}

function OnTriggerExit(other : Collider) {
	if(other.gameObject.tag != "Enemy"){
    	return;
	}
}