// Trichara Wrap Shop — nav, lightbox, reveal on scroll
(function(){
"use strict";
// Sticky header shadow
var header = document.getElementById('siteHeader');
function onScroll(){
if(!header) return;
header.style.boxShadow = window.scrollY > 10 ? '0 4px 18px rgba(0,0,0,.45)' : 'none';
}
window.addEventListener('scroll', onScroll, {passive:true});
onScroll();
// Mobile nav
var toggle = document.getElementById('navToggle');
var nav = document.getElementById('mainNav');
if(toggle && nav){
toggle.addEventListener('click', function(){
var open = nav.classList.toggle('open');
toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
});
nav.querySelectorAll('a').forEach(function(a){
a.addEventListener('click', function(){ nav.classList.remove('open'); });
});
}
// Reveal on scroll
var revealEls = document.querySelectorAll('.card, .g-item, .step, .price-card, .review-card, .split, .acard, .style-card');
revealEls.forEach(function(el){ el.classList.add('reveal'); });
if('IntersectionObserver' in window){
var io = new IntersectionObserver(function(entries){
entries.forEach(function(e){
if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); }
});
}, {threshold:.12});
revealEls.forEach(function(el){ io.observe(el); });
} else {
revealEls.forEach(function(el){ el.classList.add('visible'); });
}
// Gallery filter tabs
var tabs = document.querySelectorAll('.ftab');
var cta = document.getElementById('galleryCta');
var ctaMap = {
all:      ['Not sure where to start? Call us →', 'tel:+14244260760'],
american: ['See all American wraps →', '/vehicles/american.html'],
japanese: ['See all Japanese wraps →', '/vehicles/japanese.html'],
ev:       ['See all EV wraps →', '/vehicles/ev.html'],
suv:      ['See all SUV wraps →', '/vehicles/suv.html'],
truck:    ['See all truck & semi wraps →', '/vehicles/truck.html']
};
if(tabs.length){
tabs.forEach(function(b){
b.addEventListener('click', function(){
tabs.forEach(function(x){ x.classList.remove('active'); x.setAttribute('aria-selected','false'); });
b.classList.add('active');
b.setAttribute('aria-selected','true');
var f = b.getAttribute('data-filter');
if(cta && ctaMap[f]){ cta.textContent = ctaMap[f][0]; cta.setAttribute('href', ctaMap[f][1]); }
document.querySelectorAll('.g-item').forEach(function(it){
var show = (f === 'all') || (it.getAttribute('data-cat') === f);
it.style.display = show ? '' : 'none';
if(show){ it.classList.remove('visible'); requestAnimationFrame(function(){ requestAnimationFrame(function(){ it.classList.add('visible'); }); }); }
});
});
});
}
// Model directory: live search + category filter
var modelGrid = document.getElementById('modelGrid');
var modelSearch = document.getElementById('modelSearch');
var modelTabs = document.querySelectorAll('#modelTabs .ftab');
var resultCount = document.getElementById('resultCount');
if(modelGrid){
var activeCat = 'all';
function applyModelFilter(){
var q = modelSearch ? modelSearch.value.trim().toLowerCase() : '';
var n = 0;
modelGrid.querySelectorAll('.model-card').forEach(function(card){
var okCat = (activeCat === 'all') || (card.getAttribute('data-cat') === activeCat);
var okQ = !q || card.getAttribute('data-name').indexOf(q) !== -1;
var show = okCat && okQ;
card.style.display = show ? '' : 'none';
if(show) n++;
});
if(resultCount) resultCount.textContent = n === 1 ? '1 car' : n + ' cars';
}
if(modelSearch) modelSearch.addEventListener('input', applyModelFilter);
modelTabs.forEach(function(b){
b.addEventListener('click', function(){
modelTabs.forEach(function(x){ x.classList.remove('active'); });
b.classList.add('active');
activeCat = b.getAttribute('data-filter');
applyModelFilter();
});
});
applyModelFilter();
}
// Gallery lightbox  var lb = document.getElementById('lightbox');
var lbImg = document.getElementById('lightboxImg');
var lbCap = document.getElementById('lightboxCap');
var lbClose = document.getElementById('lightboxClose');
if(lb && lbImg){
document.querySelectorAll('.g-item').forEach(function(fig){
fig.addEventListener('click', function(){
var img = fig.querySelector('img');
var cap = fig.querySelector('figcaption');
// Load a larger version in the lightbox
lbImg.src = img.src.replace('w=800', 'w=1400');
lbImg.alt = img.alt;
lbCap.textContent = cap ? cap.textContent : '';
lb.classList.add('open');
lb.setAttribute('aria-hidden','false');
document.body.style.overflow = 'hidden';
});
});
function close(){
lb.classList.remove('open');
lb.setAttribute('aria-hidden','true');
document.body.style.overflow = '';
}
if(lbClose) lbClose.addEventListener('click', close);
lb.addEventListener('click', function(e){ if(e.target === lb) close(); });
document.addEventListener('keydown', function(e){ if(e.key === 'Escape') close(); });
}
})();
/* Bottom nav active state */
(function(){
var path = location.pathname;
var map = {'/':'home','/index.html':'home','/models/':'models','/models/wrap.html':'models','/packages/':'packages','/learn/brands.html':'brands'};
var key = map[path];
if(!key){
if(path.indexOf('/models/')===0) key='models';
else if(path.indexOf('/packages/')===0) key='packages';
else if(path.indexOf('/vehicles/')===0) key='models';
else if(path.indexOf('/learn/')===0) key='brands';
}
if(key){
var el = document.querySelector('.top-nav a[href="'+key+'"]');
if(el) el.classList.add('active');
}
})();
