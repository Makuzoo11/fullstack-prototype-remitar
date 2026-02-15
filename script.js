// simulate logged in user
const currentUser = {
username: "Admin",
email: "admin@example.com",
role: "admin"   // change to "user" to test normal user
};

function initUser(){
if(!currentUser) return;

document.getElementById("userMenu").style.display = "block";
document.getElementById("usernameDisplay").textContent = currentUser.username;

document.getElementById("profileName").textContent = currentUser.username;
document.getElementById("profileEmail").textContent = currentUser.email;
document.getElementById("profileRole").textContent = "Role: " + currentUser.role;

// hide admin items if not admin
if(currentUser.role !== "admin"){
document.querySelectorAll(".role-admin").forEach(el=>el.style.display="none");
}
}

document.getElementById("logoutBtn").addEventListener("click", function(){
alert("Logged out");
location.reload();
});

initUser();
