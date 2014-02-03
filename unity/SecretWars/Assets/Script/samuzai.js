#pragma strict

var speed : float;
var addSpeed : float;
var decSpeedCoefficient : float;
var maxSpeed : float;
var jumpSpeed : float;
var gravity : float;
var rotateSpeed : float;
var actionIntervalTime : float;
var attackFlag : boolean;
var enemyScript : Skeleton;

private var moveDirection : Vector3 = Vector3.zero;
private var controller:CharacterController;
private var animator : Animator;
private var state : AnimatorStateInfo;
private var actionStartTime : float;
private var decSpeedJumpCoefficient : float;
private var afterAttackSpeed : float;
private var joystick : Joystick;

function Start () {
	actionStartTime = 0;
	decSpeedJumpCoefficient = 2;
	afterAttackSpeed = 0.2;
	animator = GetComponent(Animator);
	animator.SetBool("Jump", false);
	animator.SetFloat("Speed", speed);
	controller = GetComponent(CharacterController);
	joystick = FindObjectOfType(Joystick) as Joystick;
}

function Update () {
	state = animator.GetCurrentAnimatorStateInfo(0);
	if(state.IsName("Base Layer.Jump") && !this.animation.isPlaying){
		animator.SetBool("Jump", false);
	}
	if(state.IsName("Base Layer.Attack")){
		animator.SetBool("Attack", false);
		attackFlag = true;
	}else{
		attackFlag = false;
	}
	
	CameraAxisControl();
	jumpControl();
	attackControl();
	attachMove();
	attachRotation();
}

//カメラ軸に沿った移動コントロール
function  CameraAxisControl(){
	if (controller.isGrounded) {
		var forward : Vector3 = Camera.main.transform.TransformDirection(Vector3.forward);
		var right : Vector3 = Camera.main.transform.TransformDirection(Vector3.right);

		moveDirection = Input.GetAxis("Horizontal")*right + Input.GetAxis("Vertical")*forward;

		if(Input.GetAxis("Fire1")){
			moveDirection = Vector3(joystick.position.x, 0, joystick.position.y);
		}
	   	 
	   	if(!attackFlag){
			if(moveDirection.magnitude > 0.01){
				if(speed > maxSpeed){
					speed = maxSpeed;
				}else{
					speed += addSpeed;
				}
			}else{
				if(speed > 0){
					speed -= (addSpeed * decSpeedCoefficient);
				}else{
					speed = 0;
				}
			}
		}else{
			speed = afterAttackSpeed;
		}

		animator.SetFloat("Speed", speed);
		moveDirection *= speed;
	}
}

// ジャンプ
function jump(){
	if(actionIntervalTime > (Time.realtimeSinceStartup - actionStartTime)){
		return;
	}
	if(controller.isGrounded) {
		animator.SetBool("Jump", true);
		moveDirection.y = jumpSpeed;
		speed -= (addSpeed * decSpeedCoefficient / decSpeedJumpCoefficient);
		actionStartTime = Time.realtimeSinceStartup;
	}
}

//ジャンプコントロール キー
function jumpControl (){
	if (Input.GetButton("Jump")) {
		jump();
	}
}

//攻撃
function attack(){
	if(actionIntervalTime > (Time.realtimeSinceStartup - actionStartTime)){
		return;
	}
	animator.SetBool("Attack", true);
	actionStartTime = Time.realtimeSinceStartup;
}
//攻撃コントロール キー
function attackControl (){
	if (Input.GetButton("Attack")){
		attack();
	}
}

//移動処理 
function attachMove (){
	moveDirection.y -= gravity * Time.deltaTime;
	controller.Move(moveDirection * Time.deltaTime);
}

//キャラクターを進行方向へ向ける処理 
function attachRotation(){
	var moveDirectionYzero = moveDirection;
	moveDirectionYzero.y=0;

	//ベクトルの２乗の長さを返しそれが0.001以上なら方向を変える（０に近い数字なら方向を変えない） 
	if (moveDirectionYzero.sqrMagnitude > 0.001){
	   
	   //２点の角度をなだらかに繋げながら回転していく処理（stepがその変化するスピード） 
	   var step : float = rotateSpeed*Time.deltaTime;
	   var newDir : Vector3 = Vector3.RotateTowards(transform.forward,moveDirectionYzero,step,0f);
	   
	   transform.rotation = Quaternion.LookRotation(newDir);
	}
}

// 敵キャラクターとの衝突
function OnControllerColliderHit(hit : ControllerColliderHit) {
	if(hit.gameObject.tag != "Enemy"){
    	return;
	}
	var hitController:CharacterController = hit.gameObject.GetComponent(CharacterController);
	hitController.Move(hit.moveDirection * Time.deltaTime);
}

// 敵キャラクターに攻撃がヒット
function hitAttack(other : Collider){
	enemyScript = other.GetComponent(other.gameObject.name);
	enemyScript.damageFlag = true;
}
