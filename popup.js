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

// const button1 = document.getElementById('myButton1');

// if (button1) {
//   button1.addEventListener("click", function() {
//     const password = document.getElementById("password1").value;
//     chrome.runtime.sendMessage({ message: "checkPassword", password: password }, function(response) {
//       if (response === "correct") {
//         alert("Correct!");
//         window.open("https://web.whatsapp.com")
//       } else {
//         alert("Incorrect");
//       }
//     });
//   });
// }
