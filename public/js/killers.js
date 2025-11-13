    $(function(){
    let hidden=false;
    $("#toggleProfiles").click(function(){
    hidden=!hidden;
    if(hidden){ $(".killer-cards").slideUp(400); $(this).text("Show Profiles").removeClass("btn-danger").addClass("btn-secondary"); }
    else { $(".killer-cards").slideDown(400); $(this).text("Hide Profiles").removeClass("btn-secondary").addClass("btn-danger"); }
});
    $("#fadeProfiles").click(()=>$(".killer-cards").fadeToggle(500));
    $("#toggleFiles, #fadeFiles").on("click",function(){
    const section=$("#dexterDetail, #brianDetail, #arthurDetail, #miguelDetail");
    if($(this).is("#toggleFiles")){
    section.is(":visible")?section.fadeOut(300):section.fadeIn(300).css("opacity",0).animate({opacity:1},300);
}else{
    section.is(":visible")?section.animate({opacity:0},200,function(){section.slideUp(400);}):
    section.slideDown(400,function(){section.css("opacity",0).animate({opacity:1},400);});
}
});

    $(".reveal-info").on("click", function(){
    const target = $(this).data("target");
    const $section = $(target);
    if ($section.is(":visible")) {
    $section.fadeOut(400).css("opacity", 0);
} else {
    $section.fadeIn(400).css("opacity", 0).animate({opacity:1}, 400);
    $("html, body").animate({scrollTop: $section.offset().top - 100}, 500);
}
});
});

    (async function(){
    const suspects=[
{name:"Dexter Morgan",threat:"High",bio:"Forensic blood analyst for Miami Metro who follows the Code of Harry.",wiki:"https://dexter.fandom.com/wiki/Dexter_Morgan"},
{name:"Brian Moser",threat:"High",bio:"The Ice Truck Killer – Dexter’s estranged brother with a chilling artistry.",wiki:"https://dexter.fandom.com/wiki/Brian_Moser"},
{name:"Arthur Mitchell",threat:"Extreme",bio:"The Trinity Killer – methodical family annihilator following ritual patterns.",wiki:"https://dexter.fandom.com/wiki/Arthur_Mitchell"},
{name:"Miguel Prado",threat:"Medium",bio:"Assistant District Attorney drawn into Dexter’s moral spiral.",wiki:"https://dexter.fandom.com/wiki/Miguel_Prado"}
    ];

    const fallback={
    "Dexter Morgan":"https://images.steamusercontent.com/ugc/38941270896180288/30175D423D8E0811A3A470CCDB8789783238B6CE/",
    "Brian Moser":"https://wallpaperaccess.com/full/16486779.jpg",
    "Arthur Mitchell":"https://static0.srcdn.com/wordpress/wp-content/uploads/2021/07/John-Lithgow-Dexter-Arthur-Mitchell-big-villain-problem.jpg",
    "Miguel Prado":"https://i.pinimg.com/1200x/2c/4f/27/2c4f27fcffa1bcf0bd0a9efd7a950c57.jpg"
};

    const grid=document.getElementById("killerGrid");
    const search=document.getElementById("killerSearch");
    const modal=new bootstrap.Modal(document.getElementById("caseModal"));
    const $=s=>document.querySelector(s);
    const LS={get:(k,d=null)=>JSON.parse(localStorage.getItem(k)||"null")??d,set:(k,v)=>localStorage.setItem(k,JSON.stringify(v))};

    function openCase(s){
    $("#caseImg").src=fallback[s.name];
    $("#caseName").textContent=s.name;
    $("#caseThreat").textContent=s.threat;
    $("#caseBio").textContent=s.bio;
    $("#caseWiki").href=s.wiki;
    modal.show();
    LS.set("lastCase",s);
}

    document.querySelectorAll(".open-file-btn").forEach(btn=>{
    btn.addEventListener("click",()=>{
    const s=suspects.find(x=>x.name===btn.dataset.name);
    if(s) openCase(s);
});
});

    function badge(l){return l==="Extreme"?"text-bg-danger":l==="High"?"text-bg-warning":"text-bg-secondary";}

    function render(list){
    grid.innerHTML="";
    for(const s of list){
    const card=document.createElement("div");
    card.className="killer-card";
    card.innerHTML=`
        <img src="${fallback[s.name]}" alt="${s.name}">
        <div class="p-2 d-flex justify-content-between align-items-start">
          <div><h5 class="mb-1">${s.name}</h5><span class="badge ${badge(s.threat)}">${s.threat}</span></div>
          <button class="btn btn-outline-danger btn-sm btn-open">Open</button>
        </div>`;
    card.querySelector(".btn-open").onclick=()=>openCase(s);
    grid.append(card);
}
}

    search.onkeyup=()=>{const q=search.value.toLowerCase();render(suspects.filter(s=>s.name.toLowerCase().includes(q)));};
    render(suspects);
})();