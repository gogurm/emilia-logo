(function () {
  'use strict';

  var GRADIENT = 'url(#emGrad)';
  var DARK = '#32180a';
  var LIGHT = '#eadfd5';
  var BRASS = '#a85d2c';

  // Six cromatic "ways" a mosaic tile can cycle through: background, symbol ink, wordmark ink.
  var WAYS = [
    { bg: '#f6efe7', mark: BRASS, word: DARK },
    { bg: DARK, mark: GRADIENT, word: GRADIENT },
    { bg: DARK, mark: LIGHT, word: LIGHT },
    { bg: '#a85d2c', mark: DARK, word: DARK },
    { bg: '#f0c291', mark: DARK, word: DARK },
    { bg: LIGHT, mark: BRASS, word: DARK }
  ];

  // Maps the picker's internal keys to the real exported-file naming scheme.
  var LOCKUP_FILE = { vertical: 'vertical', horizontal: 'orizontal', wordmark: 'text', mark: 'simbol' };
  var VARIANT_FILE = { color: 'full-color', mono: 'mono-crem', gradient: 'gradient' };

  var LOCKUP_LABEL = { vertical: 'Lockup vertical', horizontal: 'Lockup orizontal', wordmark: 'Wordmark', mark: 'Simbol' };
  var VARIANT_LABEL = { color: 'full color', mono: 'monocrom', gradient: 'gradient' };
  var VARIANT_NOTE = {
    color: 'Versiunea principală: simbol aramiu, text espresso, pe fundal deschis. De folosit ori de câte ori e posibil.',
    mono: 'O singură culoare, crem pe fundal închis. Pentru print pe un singur ton, ștampile, gravură.',
    gradient: 'Tratament metalic cald, de la aramă la nisip. Doar pe fundaluri închise și la dimensiuni mari.'
  };

  var state = {
    lockup: 'vertical',
    variant: 'color',
    tiles: [0, 2, 1, 3, 4, 1]
  };

  function renderPicker() {
    var isColor = state.variant === 'color';
    var markInk = isColor ? BRASS : state.variant === 'mono' ? LIGHT : GRADIENT;
    var wordInk = isColor ? DARK : state.variant === 'mono' ? LIGHT : GRADIENT;
    var stageBg = isColor ? '#f6efe7' : DARK;

    document.querySelectorAll('#lockup-pills .pill').forEach(function (btn) {
      btn.classList.toggle('is-active', btn.dataset.lockup === state.lockup);
    });
    document.querySelectorAll('#variant-pills .pill').forEach(function (btn) {
      btn.classList.toggle('is-active', btn.dataset.variant === state.variant);
    });

    var stage = document.getElementById('stage');
    stage.style.background = stageBg;
    ['vertical', 'horizontal', 'wordmark', 'mark'].forEach(function (key) {
      var svg = document.getElementById('stage-' + key);
      svg.classList.toggle('is-visible', key === state.lockup);
    });
    document.querySelectorAll('.stage-mark-fill').forEach(function (el) { el.setAttribute('fill', markInk); });
    document.querySelectorAll('.stage-word-fill').forEach(function (el) { el.setAttribute('fill', wordInk); });

    document.getElementById('selection-label').textContent =
      LOCKUP_LABEL[state.lockup] + ' · ' + VARIANT_LABEL[state.variant];
    document.getElementById('selection-note').textContent = VARIANT_NOTE[state.variant];

    var realLockup = LOCKUP_FILE[state.lockup];
    var realVariant = VARIANT_FILE[state.variant];
    var fileStem = 'emilia-' + realLockup + '-' + realVariant;
    document.getElementById('file-stem').textContent = fileStem;

    var svgLink = document.getElementById('download-svg');
    svgLink.href = 'export/svg/' + fileStem + '.svg';
    svgLink.setAttribute('download', fileStem + '.svg');

    var pngLink = document.getElementById('download-png');
    pngLink.href = 'export/png/' + fileStem + '.png';
    pngLink.setAttribute('download', fileStem + '.png');
  }

  function renderMosaic() {
    state.tiles.forEach(function (wayIndex, i) {
      var way = WAYS[wayIndex];
      var tile = document.querySelector('.mosaic-tile[data-tile="' + i + '"]');
      tile.style.background = way.bg;
      tile.querySelectorAll('.tile-mark').forEach(function (el) { el.setAttribute('fill', way.mark); });
      tile.querySelectorAll('.tile-word').forEach(function (el) { el.setAttribute('fill', way.word); });
    });
  }

  document.getElementById('lockup-pills').addEventListener('click', function (e) {
    var btn = e.target.closest('[data-lockup]');
    if (!btn) return;
    state.lockup = btn.dataset.lockup;
    renderPicker();
  });

  document.getElementById('variant-pills').addEventListener('click', function (e) {
    var btn = e.target.closest('[data-variant]');
    if (!btn) return;
    state.variant = btn.dataset.variant;
    renderPicker();
  });

  document.getElementById('mosaic').addEventListener('click', function (e) {
    var tile = e.target.closest('[data-tile]');
    if (!tile) return;
    var i = Number(tile.dataset.tile);
    state.tiles[i] = (state.tiles[i] + 1) % WAYS.length;
    renderMosaic();
  });

  renderPicker();
  renderMosaic();
})();
