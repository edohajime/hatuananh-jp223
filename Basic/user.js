// Các xử lý kịch bản cho user.html

function generatePermis(){
	// Khai báo các quyền thực thi trong hệ thống 
	var permis = new Array();
	permis[0] = "---";
	permis[1] = "Members";
	permis[2] = "Authors";
	permis[3] = "Managers";
	permis[4] = "Administrators";
	//permis[5000000] = "Super Admin";
	permis[5] = "Super Admin";
	var opt = '<select class="form-control" id="permiss" onchange="refreshPermis(this.form)">';
	for (var i=0; i<permis.length; i++){	
		opt += '<option value="'+i+'">';
		opt += permis[i];
		opt += '</option>';
	}
	opt += '</select>';
	
	// In ra màn hình 
	document.write(opt);
}
function generateRoles(){
	var roles = new Array();
	
	roles[0] = "User";
	roles[1] = "Section";
	roles[2] = "Category";
	roles[3] = "Article";
	roles[4] = "Product System";
	roles[5] = "Product Group";
	roles[6] = "Product Category";
	roles[7] = "Product";
	roles[8] = "Order";
	roles[9] = "Customer";
	roles[10] = "Log";
	
	let role = "";
	for (var i = 0; i<roles.length; i++){
		// Mở dòng
		if (i%3 == 0){
			role += '<div class="row my-2 align-items-center">';
		}
		
		role += '<div class="col-md-4">';
		role += '<i class="fa-solid fa-user"></i>&nbsp;';
		role += '<input type="checkbox" class="form-check-input" onclick="checkPermis()" id="chk'+i+'" disabled name="chks" >&nbsp;&nbsp;';
		role += '<label class="form-check-label" for="chk'+i+'">'+roles[i]+' Management</label>';
		role += '</div>';
		
		// Đóng dòng 
		if ((i%3 == 2) || (i==roles.length-1)){
			role += '</div>';
		}
	}
	
	document.write(role);
}


function setCheckBox(fn, check, dis){
	// Duyệt các phần tử của form
	for (let i = 0; i<fn.elements.length; i++){
		if((fn.elements[i].type == "checkbox") && (fn.elements[i].name == "chks")){
			fn.elements[i].checked = check;
			fn.elements[i].disabled = dis;
		}
		
	}		
}

function refreshPermis(fn){
	// Lấy permission
	var permis = parseInt(document.getElementById("permiss").value);
	
	if (permis == 4 || permis == 5){
		this.setCheckBox(fn, true, true);
	}else if (permis ==3){
		this.setCheckBox(fn, true, false);
	}else if (permis ==2){
		this.setCheckBox(fn, false, false);
	} else {
		this.setCheckBox(fn, false, true);
	}
	
	this.checkPermis();
}

function checkUsername(){
	// Lấy thông tin 
	let name = document.getElementById("name").value;
	
	var validUsername = true;
	
	var message = "";
	
	// Tham chiếu đối tượng hiển thị lỗi
	let errName = document.getElementById("errUsername");
	
	// tham chiếu đối tượng nhập email
	let email = document.getElementById("email");
	
	if(name.trim() == ""){
		validUsername = false;
		message = "Thiếu tên / hộp thư đăng nhập vào hệ thống cho tài khoản";
	} else{
		if ((name.length <5) || (name.length >50)){
			validUsername = false;
			message = "Tên đăng nhập nên có độ dài từ 5 - 50 kí tự";
		} else{
			if (name.indexOf(" ") != -1){
				validUsername = false;
				message = "Tên đăng nhập không có dấu cách";
			} else if (name.indexOf("@") != -1){
				var parttern = /\w+@\w+[.]\w/;
				if (!name.match(parttern)){
					validUsername = false;
					message = "Không đúng cấu trúc hộp thư";
					email.disabled = false;
				}else{
					email.disabled = true;
					email.value = "";
					document.getElementById('errEmail').innerHTML = "";
					document.getElementById('errEmail').style.backgroundColor = "transparent";
					
				}
			}else{
				email.disabled = false;
			}
		}
	}
	
	// Thông báo 
	if (!validUsername){
		errName.innerHTML = message;
		errName.style.color = "yellow";
		errName.style.backgroundColor = "red";
	} else{
		errName.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
		errName.style.color = "blue";
		errName.style.backgroundColor = "transparent";
	}
	
	return validUsername;
	
}

/*function checkPassword(){
	// tham chiếu đối tượng Password
	let pass = document.getElementById("pass").value;
	
	var message = "";
	
	// tham chiếu đối tượng errPass
	let errPass = document.getElementById("errPass");
	
	var validPassword = true;
	
	// Biểu thức Regular
	let parttern = /\d/;
	
	if (pass.trim() == ""){
		message = "Thiếu mật khẩu đăng nhập vào hệ thống";
		validPassword = false;
	}else {
		if (pass.length < 5){
			message = "Mật khẩu phải chứa ít nhất 5 ký tự trở lên";
			validPassword = false;
		} else{
			if (!parttern.test(pass)){
				message = "Mật khẩu phải chứa ít nhất 1 chữ số";
				validPassword = false;
			}
		}
	}
	
	// thông báo
	if (!validPassword){
		errPass.innerHTML = message;
		errPass.style.color = "yellow";
		errPass.style.backgroundColor = "red";
	}else{
		errPass.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
		errPass.style.color = "blue";
		errPass.style.backgroundColor = "transparent";
	}
	return validPassword;
	
}

function checkConfirmPassword(){
	// Tham chiếu đến đối tượng confirm password
	let pass2 = document.getElementById("pass2").value;
	// Tham chiếu đến đối tượng password
	let pass = document.getElementById("pass").value;
	
	message = "";
	
	// Tham chiếu đến đối tượng có id = errPass
	let errPass = document.getElementById("errPass");
	
	var validConfirmPassword = true;
	
	
	// Biểu thức Regular
	let parttern1 = /\d/;
	
	if(pass2.trim() == ""){
		message = "Thiếu Confirm Password";
		validConfirmPassword = false;
	}else{
		if (pass2.length < 5){
			message = "Mật khẩu phải chứa ít nhất 5 ký tự trở lên";
			validConfirmPassword = false;
		}else{
			if(parttern1.test(pass2)){
				message = "Mật khẩu phải chứa ít nhất 1 chữ số";
				validConfirmPassword = false;
			}else{
				if (pass2.trim() != pass.trim()){
					message = "Mật khẩu không trùng khớp";
					validConfirmPassword = false;
				}
			}
		}
	}
	
	//Thông báo
	if (!validConfirmPassword){
		errPass.innerHTML = message;
		errPass.style.color = "yellow";
		errPass.style.backgroundColor = "red";
	}else{
		errPass.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
		errPass.style.color = "blue";
		errPass.style.backgroundColor = "transparent";
	}
	
}*/

function checkUserpass(){
	let pass1 = document.getElementById('pass').value;
	let pass2 = document.getElementById('pass2').value;
	
	var validUserpass = true;
	
	var message = "";
	
	let errPass = document.getElementById('errPass');
	
	if(pass1==""){
		validUserpass = false;
		message = "Nhập mật khẩu cho tài khoản";
	}else{
		let name = document.getElementById('name').value;
			
		if((name!="") && (pass1.indexOf(name)!=-1)){
			validUserpass = false;
			message = "Mật khẩu không nên chứa tên đăng nhập";
			document.getElementById('pass2').disabled = true;
		}else {
			document.getElementById('pass2').disabled = false;
			if (pass2 != ""){
				if (pass1 != pass2){
					validUserpass = false;
					message = "Mật khẩu xác nhận lại chưa đúng";
				}
			} else{
				if (pass1.length < 6){
				validUserpass = false;
				message = "Mật khẩu quá ngắn, cần lớn hơn 5 ký tự";
				document.getElementById('pass2').disabled = false;
				}else{
					validUserpass = false;
					message = "Xin mời xác nhận lại mật khẩu";
				}
			}
		}
	}
	
	//Xuất thông báo
	if(!validUserpass){
		errPass.innerHTML = message;
		errPass.style.color = "yellow";
		errPass.style.backgroundColor = "red";
	}else{
		errPass.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
		errPass.style.color = "blue";
		errPass.style.backgroundColor = "transparent";
	}
	
}

function checkEmail(){
	let email = document.getElementById('email').value;
	
	var validUserEmail = true;
	
	var message = "";
	
	let errEmail = document.getElementById('errEmail');
	
	if(email.trim()==""){
		validUserEmail = false;
		message = "Nhập email cho tài khoản";
	}else{
		if (email.indexOf('@') != -1){
			var parttern = /\w+@\w[.]\w/;
			if(parttern.match(email)){
				validUserEmail = false;
				message = "Không đúng cấu trúc hộp thư chuẩn";
			}
		}else{
			validUserEmail = false;
			message = "Hãy nhập cấu trúc hộp thư chuẩn";
		}
	}
	
	//Xuất thông báo
	if(!validUserEmail){
		errEmail.innerHTML = message;
		errEmail.style.color = "yellow";
		errEmail.style.backgroundColor = "red";
	}else{
		errEmail.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
		errEmail.style.color = "blue";
		errEmail.style.backgroundColor = "transparent";
	}
	
	return validUserEmail;
	
}

function checkPermis(){
	let permis = parseInt(document.getElementById('permiss').value);
	
	var validPermis = true;
	
	var errRoles_hidden = false;
	
	var message = "Cần có ít nhất 1 vai trò cho quyền này";
	//tham chiếu vị trí báo lỗi
	let errRoles = document.getElementById('errRoles');
	
	//tham chiếu form
	let fn = document.getElementById('frmUser');
	if (permis == 2 || permis == 3){
		for(var i=0; i<fn.elements.length; i++){
			if (fn.elements[i].type == "checkbox" && fn.elements[i].name == "chks"){
				if (fn.elements[i].checked){
					validPermis = true; 
					break;
				}else{
					validPermis = false;
				}
			}
		}
		
	}else{
		var errRoles_hidden = true;
	}
	
	//Xuất thông báo
	if(!validPermis){
			errRoles.style.display = "block";
		errRoles.innerHTML = message;
		errRoles.style.color = "yellow";
		errRoles.style.backgroundColor = "red";
	}else{
		if(errRoles_hidden){
			errRoles.style.display = "none";
		}else{
			errRoles.style.display = "block";
			errRoles.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
			errRoles.style.color = "blue";
			errRoles.style.backgroundColor = "transparent";
		}
	}
	return validPermis;
}

function checkValidUser(){
	// kiểm tra tên
	let checkName = this.checkUsername();
	
	// kiểm tra pass
	let checkPass = this.checkUserpass();
	
	// kiểm tra email
	let checkEmail = this.checkEmail();
	
	// kiểm tra permis
	let checkPermis = this.checkPermis();
	
	if (!checkName){
		document.getElementById('name').focus();
		document.getElementById('name').select();
	}else if(!checkPass){
		document.getElementById('pass').focus();
		document.getElementById('name').select();
	}else if(!checkEmail){
		document.getElementById('email').focus();
		document.getElementById('name').select();
	}else if(!checkPermis){
		document.getElementById('permiss').focus();
	}
	
	return checkName && checkPass && checkEmail && checkPermis;
}