// Trichara PPF — site interactions
(function () {
  // Mobile nav toggle
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('mainNav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { nav.classList.remove('open'); });
    });
  }

  // Pre-select package on book.html from ?package= param
  var params = new URLSearchParams(window.location.search);
  var pkg = params.get('package');
  if (pkg) {
    var select = document.getElementById('package');
    if (select) {
      var opt = select.querySelector('option[value="' + pkg + '"]');
      if (opt) select.value = pkg;
    }
  }

  // Default preferred-date to tomorrow
  var dateInput = document.getElementById('date');
  if (dateInput && !dateInput.value) {
    var t = new Date();
    t.setDate(t.getDate() + 1);
    dateInput.value = t.toISOString().split('T')[0];
  }
})();
