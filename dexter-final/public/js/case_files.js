const input = $("#todoInput");
const list = $("#todoList");

const killers = [
    {
        key: "dexter_morgan",
        name: "Dexter Morgan",
        img: "https://images.steamusercontent.com/ugc/38941270896180288/30175D423D8E0811A3A470CCDB8789783238B6CE/",
        link: "https://dexter.fandom.com/wiki/Dexter_Morgan"
    },
    {
        key: "brian_moser",
        name: "Brian Moser",
        img: "https://wallpaperaccess.com/full/16486779.jpg",
        link: "https://dexter.fandom.com/wiki/Brian_Moser"
    },
    {
        key: "arthur_mitchell",
        name: "Arthur Mitchell",
        img: "https://static0.srcdn.com/wordpress/wp-content/uploads/2021/07/John-Lithgow-Dexter-Arthur-Mitchell-big-villain-problem.jpg",
        link: "https://dexter.fandom.com/wiki/Arthur_Mitchell"
    }
];

let currentIndex = 0;
let currentKillerKey = killers[0].key;


function getToken() {
    return localStorage.getItem("token");
}

function requireToken() {
    const token = getToken();
    if (!token) {
        alert("Please login first");
        window.location.href = "Form.html";
        return null;
    }
    return token;
}

function getCurrentUserId() {
    try {
        const u = JSON.parse(localStorage.getItem("user") || "null");
        return u && u.id ? String(u.id) : null;
    } catch {
        return null;
    }
}


async function apiGetNotes(killerKey) {
    const token = requireToken();
    if (!token) return { notes: [] };

    const res = await fetch(`/api/notes?killerKey=${encodeURIComponent(killerKey)}`, {
        headers: { Authorization: `Bearer ${token}` }
    });

    return res.json();
}

async function apiAddNote(killerKey, text) {
    const token = requireToken();
    if (!token) return null;

    const res = await fetch("/api/notes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ killerKey, text })
    });

    return res.json();
}

async function apiUpdateNote(id, text) {
    const token = requireToken();
    if (!token) return null;

    const res = await fetch(`/api/notes/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ text })
    });

    return res.json();
}

async function apiDeleteNote(id) {
    const token = requireToken();
    if (!token) return null;

    const res = await fetch(`/api/notes/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
    });

    try {
        return await res.json();
    } catch {
        return { message: "Deleted" };
    }
}


function renderNotes(notes) {
    list.empty();
    const myId = getCurrentUserId();

    notes.forEach((n) => {
        const ownerId = n.owner && n.owner.id ? String(n.owner.id) : null;
        const isMine = myId && ownerId === myId;

        const author = n.owner
            ? (n.owner.username || n.owner.email)
            : "unknown";

        const li = $("<li>")
            .addClass("list-group-item d-flex justify-content-between align-items-center gap-2");

        const text = $(`
      <span style="flex:1;">
        <b>${author}:</b> ${n.text}
      </span>
    `);

        const actions = $("<div>").addClass("d-flex gap-2");

        if (isMine) {
            const editBtn = $("<button>")
                .addClass("btn btn-sm btn-outline-secondary")
                .text("Edit")
                .on("click", async () => {
                    const newText = prompt("Edit note:", n.text);
                    if (!newText) return;

                    await apiUpdateNote(n.id, newText.trim());
                    loadNotes();
                });

            const delBtn = $("<button>")
                .addClass("btn btn-sm btn-danger")
                .text("Delete")
                .on("click", async () => {
                    await apiDeleteNote(n.id);
                    loadNotes();
                });

            actions.append(editBtn, delBtn);
        } else {
            actions.append(
                $("<span>").addClass("text-muted small").text("read-only")
            );
        }

        li.append(text, actions);
        list.append(li);
    });
}

async function loadNotes() {
    const data = await apiGetNotes(currentKillerKey);
    renderNotes(data.notes || []);
}


function showKiller(i) {
    currentIndex = (i + killers.length) % killers.length;
    const killer = killers[currentIndex];

    currentKillerKey = killer.key;

    $("#evidenceImg").fadeOut(200, function () {
        $(this).attr("src", killer.img).fadeIn(300);
    });

    $("#sourceLink").attr("href", killer.link).text(killer.name);

    loadNotes();
}

$("#addBtn").on("click", async () => {
    const text = input.val().trim();
    if (!text) return alert("Enter a note");

    await apiAddNote(currentKillerKey, text);
    input.val("");
    loadNotes();
});

$("#changeImg").on("click", () => {
    showKiller(currentIndex + 1);
});



showKiller(0);
