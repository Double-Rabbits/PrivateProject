#pragma strict

var speed : float;
var jumpSpeed : float;
var gravity : float;
var rotateSpeed : float;

private var moveDirection : Vector3 = Vector3.zero;
private var controller:CharacterController;
private var animator : Animator;

function Start () {
	animator = GetComponent(Animator);
	//animator.SetBool("Attack", true);
	animator.SetFloat("Speed", 3.1);
	controller = GetComponent(CharacterController);
}

function Update () {
	CameraAxisControl();
	jumpControl();
	//attackControl();
	attachMove();
	attachRotation();
}

//カメラ軸に沿った移動コントロール
function  CameraAxisControl(){
	if (controller.isGrounded) {
	   var forward : Vector3 = Camera.mainCamera.transform.TransformDirection(Vector3.forward);
	   var right : Vector3 = Camera.mainCamera.transform.TransformDirection(Vector3.right);
	   
	   moveDirection = Input.GetAxis("Horizontal")*right + Input.GetAxis("Vertical")*forward;
	   moveDirection *= speed;
	}
}

//標準的なジャンプコントロール
function jumpControl (){
	if (Input.GetButton("Jump")) {
		//moveDirection.y = jumpSpeed;
	}
}

//攻撃コントロール
function attackControl (){
	//if (Input.GetButton("Key Z")){
	//}
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