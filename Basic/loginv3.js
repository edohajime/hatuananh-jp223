// Các xử lý kịch bản cho loginv3.html

function checkValidUser(fn){
	// Lấy giá trị thông tin đăng nhập trên giao diện
	let username = document.getElementById("user").value;
	let userpass = document.getElementById("pass").value;
	
	var message = "";
	
	var validUserName = true;
	var validUserPass = true;
	
	//Biến hiển thị thông báo lỗi
	let viewErrUser = document.getElementById("errorUser");
	let viewErrPass = document.getElementById("errorPass");
	
	//Kiểm tra username
	
	username = username.trim();
	if(username == ""){
		validUserName = false;
		message = "Thiếu tên đăng nhập vào hệ thống"
	} else {
		if ((username.length < 5) || (username.length > 50)){
			validUserName = false;
			message = "Tên đăng nhập quá dài hoặc quá ngẵn";
		} else{
			if (username.indexOf(" ") != -1){
				validUserName = false;
				message = "Tên đăng nhập có chứa dấu cách";
			}else {
				if (username.indexOf ("@") != -1){
					let parttern = /\w+@\w+[.]\w/;
					if(!username.match(parttern)){
						validUserName = false;
						message = "Không đúng cấu trúc hộp thư";
					}
			
				}
		
		
			}
	
		}
	
	}
	
	//Xuất thông báo của Username
	if(!validUserName) {
		viewErrUser.innerHTML = message;
		viewErrUser.style.color = "red";
		viewErrUser.style.fontWeight = "bold";
	}else{
		viewErrUser.innerHTML = '<i class="fa-solid fa-check"></i>';
		viewErrUser.style.color = "green";
		viewErrUser.style.fontWeight = "bold";
	}
	
	// Kiểm tra Userpass
	userpass = userpass.trim();
	if(userpass == ""){
		validUserPass = false;
		message = "Thiếu mật khẩu vào hệ thống";
	} else{
		if(userpass.length < 5){
			validUserPass = false;
			message = "Mật khẩu quá ngắn, cần tối thiểu ít nhất 5 kí tự.";
		}
	}
	// Xuất thông báo của Userpass
	if(!validUserPass){
		viewErrPass.innerHTML = message;
		viewErrPass.style.color = "red";
		viewErrPass.style.fontWeight = "bold";
	} else{
		viewErrPass.innerHTML = '<i class="fa-solid fa-check"></i>';
		viewErrPass.style.color = "green";
		viewErrPass.style.fontWeight = "bold";
	}
	
	// Trả về trạng thái tổng thể
	return validUserName && validUserPass
}