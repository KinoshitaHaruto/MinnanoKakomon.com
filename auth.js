import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyD4ViHcFj-9334N1OGQR1v3dYN1RhWfzpg",
  authDomain: "minnanokakomon-c2b7f.firebaseapp.com",
  projectId: "minnanokakomon-c2b7f",
  storageBucket: "minnanokakomon-c2b7f.firebasestorage.app",
  messagingSenderId: "387571811654",
  appId: "1:387571811654:web:688b0c4203d07f4ae61147",
  measurementId: "G-3XFHGSE7FN"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// === 門番の仕事 ===
onAuthStateChanged(auth, (user) => {
  if (user) {
    // ログインOK！画面を表示する
    document.body.style.display = "block";
    
    // ★ここにあった「名前を表示するコード」を削除しました

  } else {
    // ログインしてないなら強制送還
    // (ただし今いるのがログイン画面なら飛ばない)
    if (!window.location.href.includes("loginform.html")) {
        window.location.href = "loginform.html";
    }
  }
});

// === ログアウト機能 ===
window.addEventListener('DOMContentLoaded', () => {
    const btnLogout = document.getElementById("btn-logout");
    if(btnLogout){
      btnLogout.addEventListener("click", async () => {
        await signOut(auth);
        alert("ログアウトしました");
        window.location.href = "loginform.html";
      });
    }
});