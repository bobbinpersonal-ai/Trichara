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
  var revealEls = document.querySelectorAll('.card, .g-item, .step, .price-card, .review-card, .split');
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
  if(tabs.length){
    tabs.forEach(function(b){
      b.addEventListener('click', function(){
        tabs.forEach(function(x){ x.classList.remove('active'); x.setAttribute('aria-selected','false'); });
        b.classList.add('active');
        b.setAttribute('aria-selected','true');
        var f = b.getAttribute('data-filter');
        document.querySelectorAll('.g-item').forEach(function(it){
          var show = (f === 'all') || (it.getAttribute('data-cat') === f);
          it.style.display = show ? '' : 'none';
          if(show){ it.classList.remove('visible'); requestAnimationFrame(function(){ requestAnimationFrame(function(){ it.classList.add('visible'); }); }); }
        });
      });
    });
  }

  // Gallery lightbox
  var lb = document.getElementById('lightbox');
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
