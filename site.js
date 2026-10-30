// 칸 셋 새 쪽들이 같이 쓰는 것 — 그림체 고르기(주소 끝 #pencil · #textbook · #blueprint, 기본 교과서 도식),
// 쪽 사이 링크에 그림체를 붙여 넘기기, 글자 다듬기 도우미.
(function (root) {
  'use strict';
  var STYLES = ['pencil', 'textbook', 'blueprint'];
  var listeners = [];

  function current() { return document.documentElement.dataset.style || 'textbook'; }

  // 같은 사이트 안의 .html 링크에 지금 그림체를 붙인다 — 교재 쪽들도 주소 끝 #그림체 로 받는다
  function carry() {
    var s = current();
    Array.prototype.forEach.call(document.querySelectorAll('a[href]'), function (a) {
      var h = a.getAttribute('href');
      if (!h || /^(https?:|mailto:|tel:|#)/.test(h)) return;
      if (!/\.html(\?|#|$)/.test(h)) return;
      a.setAttribute('href', h.replace(/#.*$/, '') + '#' + s);
    });
  }

  function use(style) {
    if (STYLES.indexOf(style) < 0) style = 'textbook';
    document.documentElement.dataset.style = style;
    Array.prototype.forEach.call(document.querySelectorAll('#pick button'), function (b) { b.classList.toggle('on', b.dataset.s === style); });
    carry();
    listeners.forEach(function (f) { f(style); });
  }

  function fromHash() { use((location.hash || '').slice(1)); }

  function init() {
    var pick = document.getElementById('pick');
    if (pick) pick.addEventListener('click', function (e) {
      var b = e.target.closest('button[data-s]');
      if (b) { use(b.dataset.s); if (history.replaceState) history.replaceState(null, '', location.pathname + location.search + '#' + b.dataset.s); }
    });
    window.addEventListener('hashchange', fromHash);
    fromHash();
  }

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; });
  }
  function param(name) { return new URLSearchParams(location.search).get(name); }

  root.UBO_SITE = {
    init: init, use: use, current: current, carry: carry, esc: esc, param: param,
    onStyle: function (f) { listeners.push(f); }
  };
})(window);
