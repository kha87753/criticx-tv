import { auth } from "./firebase/firebase-config.js";

import {
    signInWithEmailAndPassword,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const email = document.getElementById("email");
const password = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");
const message = document.getElementById("message");

// Already Logged In
onAuthStateChanged(auth, (user) => {

    if (user) {

        window.location.href = "dashboard.html";

    }

});

// Login
loginBtn.addEventListener("click", async () => {

    message.textContent = "";

    const emailValue = email.value.trim();
    const passwordValue = password.value;

    if (!emailValue || !passwordValue) {

        message.textContent = "Please enter email and password.";

        return;

    }

    loginBtn.disabled = true;
    loginBtn.textContent = "Logging in...";

    try {

        await signInWithEmailAndPassword(
            auth,
            emailValue,
            passwordValue
        );

        window.location.href = "dashboard.html";

    } catch (error) {

        switch (error.code) {

            case "auth/invalid-credential":
                message.textContent = "Invalid email or password.";
                break;

            case "auth/too-many-requests":
                message.textContent = "Too many attempts. Try again later.";
                break;

            default:
                message.textContent = error.message;

        }

    }

    loginBtn.disabled = false;
    loginBtn.textContent = "Login";

});

// Press Enter
password.addEventListener("keypress", (e) => {

    if (e.key === "Enter") {

        loginBtn.click();

    }

});