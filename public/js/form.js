    $("#accessForm").on("submit", function(e) {
    e.preventDefault();
    const user = $("#username").val().trim();
    const pass = $("#password").val().trim();
    const level = $("#accessLevel").val();

    if (!user || !pass || !level) {
    $("#alertBox").text("Access Denied: Missing credentials.").fadeIn(400);
    return;
}

    if (pass === "TryME123") {
    $("#alertBox").css("color", "#32cd32").text(`Access Granted: Welcome, ${user}.`).fadeIn(400);
} else {
    $("#alertBox").css("color", "#ff4c4c").text("Access Denied: Invalid Security Key.").fadeIn(400);
}
});

    setInterval(() => {
    $("#timeNow").text(new Date().toLocaleString());
}, 1000);

    (function(){
    const form=document.getElementById('accessForm');
    if(!form) return;
    const user=document.getElementById('username');
    const pass=document.getElementById('password');
    const level=document.getElementById('accessLevel');
    const msg=document.getElementById('formMsg');
    const reUser=/^[A-Za-z][A-Za-z0-9_\-]{2,}$/;

    function setState(el, ok, text){
    if(!el) return;
    el.classList.remove('is-valid','is-invalid');
    el.classList.add(ok?'is-valid':'is-invalid');
    if(text && msg){ msg.textContent=text; msg.className = ok ? 'text-success small' : 'text-danger small'; }
}

    form.addEventListener('submit', (e)=>{
    let ok=true;
    const uok = reUser.test((user?.value||'').trim());
    setState(user, uok, uok?'':'Username must be ≥3 chars, start with a letter.');
    ok = ok && uok;

    const lok = !!(level && level.value);
    setState(level, lok, lok?'':'Select access level.');
    ok = ok && lok;

    const pok = (pass?.value||'').trim().length>=8;
    if(!pok) setState(pass, false, 'Security key must be at least 8 characters.');
    ok = ok && ((pass?.value||'')==='TryME123');

    if(!ok) { e.preventDefault(); return; }
    msg.textContent='Access granted. Welcome, Agent.'; msg.className='text-success small';
    localStorage.setItem('dexterAgent', JSON.stringify({ user: user?.value||null, level: level?.value||null }));
});
})();