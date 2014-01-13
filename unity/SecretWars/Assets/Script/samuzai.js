#pragma strict

var speed : float;
var addSpeed : float;
var decSpeedCoefficient : float;
var maxSpeed : float;
var jumpSpeed : float;
var gravity : float;
var rotateSpeed : float;
var actionIntervalTime : float;

private var moveDirection : Vector3 = Vector3.zero;
private var controller:CharacterController;
private var animator : Animator;
private var state : AnimatorStateInfo;
private var attackFlag : boolean;
private var actionStartTime : float;
private var decSpeedJumpCoefficient : float;
private var afterAttackSpeed : float;

function Start () {
	actionStartTime = 0;
	decSpeedJumpCoefficient = 2;
	afterAttackSpeed = 0.2;
	animator = GetComponent(Animator);
	animator.SetBool("Jump", false);
	animator.SetFloat("Speed", speed);
	controller = GetComponent(CharacterController);
}

function Update () {
	state = animator.GetCurrentAnimatorStateInfo(0);
	if(state.IsName("Base Layer.Jump") && !this.animation.isPlaying){
		animator.SetBool("Jump", false);
	}
	if(state.IsName("Base Layer.Attack")){
		animator.SetBool("Attack", false);
		attackFlag = true;
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
		var forward : Vector3 = Camera.mainCamera.transform.TransformDirection(Vector3.forward);
		var right : Vector3 = Camera.mainCamera.transform.TransformDirection(Vector3.right);

		moveDirection = Input.GetAxis("Horizontal")*right + Input.GetAxis("Vertical")*forward;
	   	 
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
			attackFlag = false;
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
//ジャンプコントロール ボタン
//function jumpButton (){
//	jump();
//}

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
//攻撃コントロール ボタン
//function attackButton (){
//	attack();
//}

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