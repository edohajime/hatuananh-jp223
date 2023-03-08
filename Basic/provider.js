// Các xử lý cho provider.html
function checkValidProvider(fn){
	// Lấy thông tin trên giao diện
	var name = document.getElementById("name").value;
	var check = document.getElementById("check").checked;
	
	// Tham chiếu đến nút bấm
	var btnReg = document.getElementById("btnRegistry");
	
	var message = "";
	
	var viewErrProviderName = document.getElementById("errorName");
	
	let validProviderName = true;
	
	if(name.trim() == ""){
		validProviderName = false;
		message = "Nhập tên nhà cung cấp sản phẩm";
	}
	if((name.trim() != "") && check){
		btnReg.disabled = false;
	}else{
		btnReg.disabled = true;
	}
	
	if(!validProviderName){
		viewErrProviderName.innerHTML = message;
		viewErrProviderName.style.color = "red";
		viewErrProviderName.style.fontWeight = "bold";
	}else{
		viewErrProviderName.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
		viewErrProviderName.style.color = "blue";
		viewErrProviderName.style.fontWeight = "bold";
	}
	
	return !btnReg.disabled;
}