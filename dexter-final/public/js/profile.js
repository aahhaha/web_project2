const token = localStorage.getItem("token");

if (!token) {
    alert("Please login first");
    window.location.href = "/Form.html";
}

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const errorBox = document.getElementById("errorBox");
const successBox = document.getElementById("successBox");

function showError(msg) {
    errorBox.style.display = "block";
    errorBox.textContent = msg;
}

function showSuccess(msg) {
    successBox.style.display = "block";
    successBox.textContent = msg;
}

fetch("/api/users/profile", {
    headers: {
        "Authorization": `Bearer ${token}`
    }
})
    .then(res => res.json())
    .then(user => {
        nameInput.value = user.username;
        emailInput.value = user.email;
    })
    .catch(() => {
        showError("Failed to load profile");
    });

document.getElementById("saveBtn").addEventListener("click", () => {
    errorBox.style.display = "none";
    successBox.style.display = "none";

    const data = {
        username: nameInput.value,
        email: emailInput.value
    };

    if (passwordInput.value.trim() !== "") {
        data.password = passwordInput.value;
    }

    fetch("/api/users/profile", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
        .then(async res => {
            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.message || "Update failed");
            }
            return res.json();
        })
        .then(() => {
            showSuccess("Profile updated successfully");
            passwordInput.value = "";
        })
        .catch(err => {
            showError(err.message);
        });
});

document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/Form.html";
});
