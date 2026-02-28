// بيانات تسجيل الدخول الافتراضية
const adminUser = "admin";
const adminPass = "123456";

function login(){
    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;
    let msg = document.getElementById("msg");

    if(user === adminUser && pass === adminPass){
        localStorage.setItem("isLoggedIn", "true");
        window.location.href = "admin.html";
    } else {
        msg.innerText = "اسم المستخدم أو كلمة المرور غير صحيحة!";
    }
}

// حماية صفحة admin
if(window.location.href.includes("admin.html")){
    if(localStorage.getItem("isLoggedIn") !== "true"){
        window.location.href = "login.html";
    }
}