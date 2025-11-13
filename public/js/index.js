    const alertBtn = document.getElementById('alertToggle');
    alertBtn.addEventListener('click', function() {
    document.body.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--bs-body-bg') || '';
    if (this.classList.contains('btn-outline-danger')) {
    this.classList.remove('btn-outline-danger');
    this.classList.add('btn-danger');
    document.body.style.boxShadow = 'inset 0 0 0 100vmax rgba(255,0,0,0.03)';
} else {
    this.classList.add('btn-outline-danger');
    this.classList.remove('btn-danger');
    document.body.style.boxShadow = '';
}
});

    function updateTime() {
    const t = new Date();
    document.getElementById('timestamp').textContent =
    t.toLocaleString('en-US', { dateStyle: 'long', timeStyle: 'short' });
}
    setInterval(updateTime, 1000);
    updateTime();


    (function(){
    const tgl=document.getElementById('alertToggle');
    if(!tgl) return;
    const get=()=>localStorage.getItem('killMode')==='on';
    const set=(v)=>localStorage.setItem('killMode', v?'on':'off');
    function apply(v){
    document.body.classList.toggle('kill-mode', v);
    document.body.style.boxShadow = v ? 'inset 0 0 0 100vmax rgba(255,0,0,0.03)' : '';
    if(v){ tgl.classList.remove('btn-outline-danger'); tgl.classList.add('btn-danger'); }
    else { tgl.classList.add('btn-outline-danger'); tgl.classList.remove('btn-danger'); }
}
    let on=get(); apply(on);
    tgl.addEventListener('click', ()=>{ on=!on; set(on); apply(on); });
})();