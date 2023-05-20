function openOverlay() {
  const overlay = document.createElement('div');
  overlay.id = 'myNav';
  overlay.className = 'overlay';
  

  const box = document.createElement('div');
  box.className = 'box';
  box.innerHTML = `
    <h2>Login</h2>
    <form id="loginForm">
      <div class="inputBox">
        <input type="password" id="password2" name="password2" required value="">
        <label>Password</label>
      </div>
      <div class="inputBox" id="confirmPasswordContainer">
      <input type="password" id="confirm-password" name="confirm-password" required value="">
      <label>Confirm Password</label>
    </div>
      <input type="submit" id="myButton2" name="sign-in" value="Save">
    </form>
  `;

  overlay.appendChild(box);
  document.body.appendChild(overlay);
}

const style = document.createElement('style');
style.innerHTML = `

  body {
    font-family: 'Lato', sans-serif;
  }

  .overlay {
    height: 100%;
    width: 100%;
    position: fixed;
    z-index: 9999;
    top: 0;
    left: 0;
    background-color: rgb(0, 0, 0);
    background-color: rgba(0, 0, 0, 0.9);
    overflow-y: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .box {
    width: 25rem;
    padding: 2.5rem;
    box-sizing: border-box;
    background: rgba(0, 0, 0, 0.6);
    border-radius: 0.625rem;
  }

  .box h2 {
    margin: 0 0 1.875rem;
    padding: 0;
    color: #fff;
    text-align: center;
  }

  .box .inputBox {
    position: relative;
  }

  .box .inputBox input {
    width: 100%;
    padding: 0.625rem 0;
    font-size: 1rem;
    color: #fff;
    letter-spacing: 0.062rem;
    margin-bottom: 1.875rem;
    border: none;
    border-bottom: 0.065rem solid #fff;
    outline: none;
    background: transparent;
  }

  .box .inputBox label {
    position: absolute;
    top: 0;
    left: 0;
    padding: 0.625rem 0;
    font-size: 1rem;
    color: #fff;
    pointer-events: none;
    transition: 0.5s;
  }

  .box .inputBox input:focus ~ label,
  .box .inputBox input:valid ~ label,
  .box .inputBox input:not([value=""]) ~ label {
    top: -1.125rem;
    left: 0;
    color: #03a9f4;
    font-size: 0.75rem;
  }

  .box input[type="submit"] {
    border: none;
    outline: none;
    color: #fff;
    background-color: #03a9f4;
    padding: 0.625rem 1.25rem;
    cursor: pointer;
    border-radius: 0.312rem;
    font-size: 1rem;
  }

  .box input[type="submit"]:hover {
    background-color: #1cb1f5;
  }
`;

document.head.appendChild(style);

function sendOpenOverlayMessage() {
  chrome.runtime.sendMessage({ cmd: 'openOverlay' }, function (response) {
    console.log(response.result);
  });
}

if (window.location.href.includes('web.whatsapp.com') || window.location.href.includes('facebook.com') || window.location.href.includes('instagram.com')) {
  sendOpenOverlayMessage();
}

chrome.runtime.sendMessage({ cmd: 'checkPassword' }, function (response) {
  if (response.passwordExists) {
    // Remove the confirm password container
    const confirmPasswordContainer = document.getElementById('confirmPasswordContainer');
    if (confirmPasswordContainer) {
      confirmPasswordContainer.remove();
    }
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.cmd === 'openOverlay') {
    openOverlay();
    sendResponse({ result: 'success' });
  }
});

document.addEventListener('submit', function (event) {
  event.preventDefault();

  const password = document.getElementById('password2').value;
  const confirmPasswordInput = document.getElementById('confirm-password');

  if (confirmPasswordInput !== null) {
    const confirmPassword = confirmPasswordInput.value;

    if (password === confirmPassword) {
    // Send message to background script to store the new password
    chrome.runtime.sendMessage({ cmd: 'storePassword', password }, function (response) {
      console.log('Password created');
      closeOverlay();
    });
  }
}

  else if(confirmPasswordInput === null)
  {
    chrome.storage.local.get('password', function(data) {
      const storedPassword = data.password;

      if (password === storedPassword) {
      // Send message to background script to unlock the website
        chrome.runtime.sendMessage({ cmd: 'unlock' }, function (response) {
          console.log(response.result);
          closeOverlay();
        });
      } 
      else {
      alert('Passwords do not match');
      }
    });
  }
});

function closeOverlay() {
  const overlay = document.getElementById('myNav');
  if (overlay) {
    overlay.remove();
  }
}



