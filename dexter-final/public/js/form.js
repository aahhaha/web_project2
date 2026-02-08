function setMsg(text, ok) {
    const msg = $("#formMsg");
    msg.text(text).removeClass().addClass(ok ? "text-success small" : "text-danger small");
}

let mode = "login";

function setMode(newMode) {
    mode = newMode;
    if (mode === "register") {
        $("#usernameBlock").show();
    } else {
        $("#usernameBlock").hide();
        $("#username").val("");
    }
}
setMode("login");

async function doAuth(url, body) {
    const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });

    const data = await res.json();

    if (!res.ok) {
        const msg = data.message || "Request failed";
        if (res.status === 401) {
            setMsg("Login failed. If you don’t have an account, click Register.", false);
        } else {
            setMsg(msg, false);
        }
        return;
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    setMsg("Success. Redirecting...", true);
    setTimeout(() => (window.location.href = "Case_Files.html"), 500);
}

$("#btnLogin").on("click", async function () {
    setMode("login");
    const email = $("#email").val().trim();
    const password = $("#password").val().trim();

    if (!email || !password) {
        setMsg("Email and password are required.", false);
        return;
    }

    try {
        await doAuth("/api/auth/login", { email, password });
    } catch (e) {
        setMsg("Server error", false);
    }
});

$("#btnRegister").on("click", async function () {
    setMode("register");
    const username = $("#username").val().trim();
    const email = $("#email").val().trim();
    const password = $("#password").val().trim();

    if (!username) {
        setMsg("Please enter your name to continue registration.");
        return;
    }

    if (!email || !password) {
        setMsg("Email and password are required.");
        return;
    }

    try {
        await doAuth("/api/auth/register", { username, email, password });
    } catch (e) {
        setMsg("Server error", false);
    }
});

setInterval(() => {
    $("#timeNow").text(new Date().toLocaleString());
}, 1000);
