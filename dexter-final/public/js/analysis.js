    $("#analyzeBtn").click(() => {
    const name = $("#nameInput").val().trim() || "Unknown";
    const victims = Number($("#victimsInput").val());
    let level;
    if (isNaN(victims) || victims < 0) level = "Invalid input.";
    else if (victims <= 2) level = "Low risk";
    else if (victims <= 5) level = "Medium risk";
    else if (victims <= 10) level = "High risk";
    else level = "Extreme threat";
    $("#resultText").text(`${name} classified as: ${level}`);
});

    function sortNums(order) {
    const raw = $("#nums").val().trim();
    if (!raw) { $("#sorted").text("No data."); return; }
    const arr = raw.split(",").map(x => Number(x.trim())).filter(x => !isNaN(x));
    const sorted = arr.sort((a, b) => order === 'asc' ? a - b : b - a);
    $("#sorted").text("Sorted: " + sorted.join(", "));
}

    function centerBox() {
    const $box = $("#animBox");
    const parent = $box.parent();
    const top = (parent.height() - $box.height()) / 2;
    const left = (parent.width() - $box.width()) / 2;
    $box.css({ top, left });
}
    $(window).on("load resize", centerBox);

    $("#animateBox").click(() => {
    const $box = $("#animBox");
    const pos = $box.position();
    const startTop = pos.top;
    const startLeft = pos.left;
    const stepRight = 120;
    const stepDown = 70;

    $box.stop(true, true)
    .animate({ left: startLeft + stepRight }, 600)
    .animate({ top: startTop + stepDown }, 600)
    .animate({ width: 50, height: 50, opacity: 0.5 }, 600)
    .animate({ left: startLeft, top: startTop, width: 80, height: 80, opacity: 1 }, 800);
});

    (function(){
    const q=document.getElementById('dexterQuery');
    const btn=document.getElementById('dexterFetch');
    const wrap=document.getElementById('episodesWrap');
    if(!q||!btn||!wrap) return;

    async function fetchShows(){
    const query=(q.value||'dexter').trim();
    wrap.innerHTML='<div class="text-secondary text-center">Loading blood samples…</div>';
    try{
    const res=await fetch('https://api.tvmaze.com/search/shows?q='+encodeURIComponent(query));
    const data=await res.json();

    const dexterOnly = data.filter(x=>{
    const name=(x.show.name||"").toLowerCase();
    return (
    name.includes("dexter") &&
    !name.includes("laboratory") &&
    !name.includes("procter") &&
    !name.includes("duster")
    );
});

    render(dexterOnly);
}catch(e){
    wrap.innerHTML='<div class="text-danger text-center">Failed to fetch TV evidence.</div>';
}
}

    function render(items){
    wrap.innerHTML='';
    if(!items.length){wrap.innerHTML='<div class="text-warning text-center">No Dexter-related evidence found.</div>';return;}
    items.forEach(x=>{
    const s=x.show,img=(s.image&&s.image.medium)?s.image.medium:'https://via.placeholder.com/210x295?text=Dexter';
    const year=(s.premiered||'').slice(0,4)||'—';
    const div=document.createElement('div');
    div.className='episode-card fade-in-up';
    div.innerHTML=`
        <div class="d-flex gap-3 flex-wrap align-items-start">
          <img src="${img}" alt="${s.name}" style="width:120px;height:160px;object-fit:cover;border-radius:.5rem;">
          <div>
            <h6>${s.name} <small class="text-secondary">(${year})</small></h6>
            <div class="mb-2"><span class="badge text-bg-danger">TV Evidence</span></div>
            <a class="btn btn-outline-light btn-sm" href="${s.url}" target="_blank" rel="noopener">Open Case File</a>
          </div>
        </div>`;
    wrap.appendChild(div);
});
}

    btn.addEventListener('click', fetchShows);
    q.addEventListener('keyup', e=>{ if(e.key==='Enter') fetchShows(); });
    fetchShows();
})();