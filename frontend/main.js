let token = '';
let currentRoom = '';

function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  fetch("/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  })
    .then(res => res.json())
    .then(data => {
      if (data.token) {
        token = data.token;
        document.getElementById("authBox").classList.add("hidden");
        document.getElementById("chatBox").classList.remove("hidden");
        document.getElementById("userInfo").innerText = "Logged in as: " + username;
      } else {
        alert("Login failed");
      }
    });
}

function logout() {
  token = '';
  currentRoom = '';
  document.getElementById("authBox").classList.remove("hidden");
  document.getElementById("chatBox").classList.add("hidden");
  document.getElementById("messages").innerHTML = '';
}

function loadRoom() {
  currentRoom = document.getElementById("room").value;
  fetch(`/chat/room/${currentRoom}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
    .then(res => res.json())
    .then(msgs => {
      const box = document.getElementById("messages");
      box.innerHTML = "";
      msgs.forEach(m => {
        const div = document.createElement("div");
        div.classList.add("message");
        div.innerText = `${m.sender.username}: ${m.text}`;
        box.appendChild(div);
      });
    });
}

function sendMessage() {
  const text = document.getElementById("msgInput").value;
  fetch("/chat/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ room: currentRoom, text })
  }).then(() => {
    document.getElementById("msgInput").value = "";
    loadRoom();
  });
}
