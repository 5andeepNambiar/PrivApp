// (function() {
//   if (chrome.storage.local.get("password") !== null) {
//     window.open("page.html")
//   } else {
//     window.open("index.html")
//   }
// })();

const button2 = document.getElementById('myButton2');

if (button2) {
  button2.addEventListener("click", function() {
    const password = document.getElementById("password2").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if (password === confirmPassword) {
      chrome.storage.local.set({ password: password }, function() {
        console.log("Password saved successfully:", password);
        alert("Password saved successfully");
      });
    } else {
      alert('Passwords do not match');
    }
  });
}