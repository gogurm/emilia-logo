(function () {
  'use strict';

  var GATE_CODE = '4465';
  var GATE_KEY = 'emilia-gate-unlocked';

  function unlockGate() {
    document.getElementById('gate').hidden = true;
    document.getElementById('site-content').hidden = false;
  }

  try {
    if (sessionStorage.getItem(GATE_KEY) === '1') unlockGate();
  } catch (e) { /* storage unavailable — fall through to asking for the code */ }

  var gateForm = document.getElementById('gate-form');
  var gateInput = document.getElementById('gate-code');
  var gateError = document.getElementById('gate-error');

  gateForm.addEventListener('submit', function (e) {
    e.preventDefault();
    if (gateInput.value.trim() === GATE_CODE) {
      try { sessionStorage.setItem(GATE_KEY, '1'); } catch (e) { /* ignore */ }
      gateError.hidden = true;
      unlockGate();
    } else {
      gateError.hidden = false;
      gateInput.value = '';
      gateInput.focus();
    }
  });

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

  // Real logo files, synced from the client's Google Drive folder — keyed by
  // "<lockup>-<variant>" file stem, each holding that file's Drive id.
  var DRIVE_FILES = {
    'vertical-full-color': { svg: '1krOxSfvB7phXoW0ofSYMyUqd6PWZ5Lpj', png: '1IUH5mCw3U5g8swuvjt-ZPIMNY-Bvog7u' },
    'vertical-mono-crem': { svg: '1waXJ_TR7aV0liBb0HGQCwR1dP15qLKeG', png: '1QP97CvA-Y37EvcSzQSuUPy5khv8i427Z' },
    'vertical-gradient': { svg: '1xmkAMPDMRchNZVsN64jU9ty53OsTBkU1', png: '1-B9-tkqCJj1ofZDDP0nIFem4uVZ9Zk9O' },
    'orizontal-full-color': { svg: '1aNjbI4qveOkFayxw3rV7BLHBIW82CKbI', png: '1OEoE9Ia7IbqSXnKB9ZbwinI7tDmz2X3-' },
    'orizontal-mono-crem': { svg: '16ZZOyahJuFdHQ-tcftVvAMLRsv_djGtz', png: '1asS6MnmnmpGGlNfTjDhx0HQgYRvzJGJw' },
    'orizontal-gradient': { svg: '19ERGmxMBJKdGQKEgVgntQXq7AtyaU69_', png: '17cCwHKddLDDf0P-QBT-SPfALmrfDHpNV' },
    'text-full-color': { svg: '1AXEdZg1VU_BDnzHd4Ww2TDU9f9UYCaGg', png: '1EIyMmkyoN4kc-OEoEycQo8nP8q8Y5cP2' },
    'text-mono-crem': { svg: '1c5Z1puO5VoFmMb4CwV9_nT_ESz9eIhvS', png: '1mLSjheCgyC1g0iBt773Z_aX3zuflTF05' },
    'text-gradient': { svg: '1a4n6TJkifWBPptHDaIcgihH8CAsQTfpE', png: '1qd0KsfcpxOnFJBhX34stbpZwNVasxYJH' },
    'simbol-full-color': { svg: '1t2E_DLIoAga-_l7yN3H2AMOFSVaH4lh2', png: '1ZHtNgFy1ZW5_FWGyWMP_WvAWMAiZ5fYZ' },
    'simbol-mono-crem': { svg: '1r9hBQVWs3u1LRCAwB9yfqn9ynhM-XUtG', png: '14D9nJs5J8SeEtCekoWi5c0DMziTqfLSu' },
    'simbol-gradient': { svg: '17v_318LSC7RS7depTOFK1-Oa6D8bkRNQ', png: '1zjpqrAZB2ckuP5rQEOoilIRvJssTrmnM' }
  };

  function driveDownloadUrl(id) {
    return 'https://drive.google.com/uc?export=download&id=' + id;
  }

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
    var driveKey = realLockup + '-' + realVariant;
    var fileStem = 'emilia-' + driveKey;
    document.getElementById('file-stem').textContent = fileStem;

    var driveFiles = DRIVE_FILES[driveKey];
    var svgLink = document.getElementById('download-svg');
    var pngLink = document.getElementById('download-png');
    if (driveFiles) {
      svgLink.href = driveDownloadUrl(driveFiles.svg);
      pngLink.href = driveDownloadUrl(driveFiles.png);
    } else {
      svgLink.href = 'export/svg/' + fileStem + '.svg';
      pngLink.href = 'export/png/' + fileStem + '.png';
    }
    svgLink.setAttribute('download', fileStem + '.svg');
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
