    const input = $('#todoInput');
    const list = $('#todoList');

    $('#addBtn').click(() => {
    const text = input.val().trim();
    if (!text) return alert('Enter a task!');
    const li = $('<li class="list-group-item d-flex justify-content-between align-items-center"></li>');
    li.html(`<span>${text}</span>
      <div><button class="btn btn-sm btn-success me-1 doneBtn">✓</button>
      <button class="btn btn-sm btn-danger delBtn">🗑</button></div>`);
    list.append(li);
    input.val('');
});

    list.on('click', '.delBtn', e => $(e.target).closest('li').remove());
    list.on('click', '.doneBtn', e => $(e.target).closest('li').toggleClass('done'));

    const killers = [
    {
        name: "Dexter Morgan",
        img: "https://images.steamusercontent.com/ugc/38941270896180288/30175D423D8E0811A3A470CCDB8789783238B6CE/",
        link: "https://dexter.fandom.com/wiki/Dexter_Morgan"
    },
    {
        name: "Brian Moser",
        img: "https://wallpaperaccess.com/full/16486779.jpg",
        link: "https://dexter.fandom.com/wiki/Brian_Moser"
    },
    {
        name: "Arthur Mitchell",
        img: "https://static0.srcdn.com/wordpress/wp-content/uploads/2021/07/John-Lithgow-Dexter-Arthur-Mitchell-big-villain-problem.jpg",
        link: "https://dexter.fandom.com/wiki/Arthur_Mitchell"
    }
    ];

    let currentIndex = 0;

    $('#changeImg').click(() => {
    currentIndex = (currentIndex + 1) % killers.length;
    const killer = killers[currentIndex];
    $('#evidenceImg').fadeOut(300, function() {
    $(this).attr('src', killer.img).fadeIn(400);
});
    $('#sourceLink').attr('href', killer.link).text(killer.name);
});

    (function(){
    const LSK={get:(k,d=null)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch(e){return d}}, set:(k,v)=>localStorage.setItem(k,JSON.stringify(v))};


    const list=document.getElementById('todoList');
    const add=document.getElementById('addBtn');
    if(list){

    const saved=LSK.get('caseTodos',[]);
    if(saved.length){ list.innerHTML=''; saved.forEach(html=>{ const li=document.createElement('li'); li.className='list-group-item d-flex justify-content-between align-items-center'; li.innerHTML=html; list.appendChild(li); }); }

    list.addEventListener('click', (e)=>{ if(e.target.closest('.doneBtn')||e.target.closest('.delBtn')) save(); });
    add?.addEventListener('click', save);
    function save(){ const state=[...list.children].map(li=>li.innerHTML); LSK.set('caseTodos', state); }
}


    const viewer=document.getElementById('evidenceImg');
    const srcLink=document.getElementById('sourceLink');
    const change=document.getElementById('changeImg');
    if(viewer && change){
    let idx = Number(LSK.get('evidenceIndex', 0))||0;
    const data = window.killers?.map(k=>({img:k.img, link:k.link, name:k.name})) || killers;
    function show(i){
    if(!data) return;
    idx=(i+data.length)%data.length;
    $(viewer).fadeOut(200, function(){ viewer.src=data[idx].img; $(this).fadeIn(300); });
    if(srcLink){ srcLink.href=data[idx].link; srcLink.textContent=data[idx].name; }
    LSK.set('evidenceIndex', idx);
}
    change.addEventListener('click', ()=> show(idx+1));
    show(idx);
}
})();