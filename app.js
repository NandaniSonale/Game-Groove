document.addEventListener("DOMContentLoaded", function() {
    // Signup Form Validation
    let signupForm = document.getElementById("signupForm");
    if (signupForm) {
        signupForm.addEventListener("submit", function(event) {
            event.preventDefault();

            let email = document.getElementById("email").value;
            let password = document.getElementById("password").value;
            let confirmPassword = document.getElementById("confirmPassword").value;

            if (password !== confirmPassword) {
                alert("Passwords do not match!");
                return;
            }

            let user = {
                email: email,
                password: password
            };

            localStorage.setItem("user", JSON.stringify(user));
            alert("Sign up successful! Redirecting to login page.");
            window.location.href = "login.html";
        });
    }

    // Login Form Validation
    let loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function(event) {
            event.preventDefault();

            let loginEmail = document.getElementById("loginEmail").value;
            let loginPassword = document.getElementById("loginPassword").value;

            let storedUser = JSON.parse(localStorage.getItem("user"));

            if (storedUser && loginEmail === storedUser.email && loginPassword === storedUser.password) {
                localStorage.setItem("loggedIn", true);
                alert("Login successful! Redirecting to main page.");
                window.location.href = "webpage.html";
            } else {
                alert("Invalid email or password.");
            }
        });
    }

    // Restrict access to main page
    if (window.location.pathname.includes("webpage.html")) {
        let loggedIn = localStorage.getItem("loggedIn");
        if (!loggedIn) {
            alert("You must log in first!");
            window.location.href = "login.html";
        }
    }

    // Logout functionality
    let logoutBtn = document.getElementById("logout");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function() {
            localStorage.removeItem("loggedIn");
            alert("Logged out successfully.");
            window.location.href = "login.html";
        });
    }
});
