const fs = require('fs');
const path = require('path');

const appJs = fs.readFileSync(path.join(__dirname, 'app.js'), 'utf8');

function scramble(str, key) {
  let result = '';
  for (let i = 0; i < str.length; i++) {
    result += String.fromCharCode(str.charCodeAt(i) ^ key.charCodeAt(i % key.length));
  }
  return Buffer.from(result, 'binary').toString('base64');
}

const key = 'MontaUI#Enterprise@2026';
const encryptedPayload = scramble(appJs, key);

const protectedCode = `/**
 * @license Monta UI Protected Runtime Bundle
 * (c) 2026 Monta UI. All rights reserved.
 * Protected against unauthorized inspection, decompilation, and reproduction.
 */
(function(global, doc) {
  'use strict';

  // 1. Anti-Inspection & DevTools Blockers
  doc.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    return false;
  }, { capture: true });

  doc.addEventListener('keydown', function(e) {
    // Block F12
    if (e.keyCode === 123 || e.key === 'F12') {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
    // Block Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C, Ctrl+U, Ctrl+S
    if ((e.ctrlKey || e.metaKey) && (
      e.key === 'I' || e.key === 'i' ||
      e.key === 'J' || e.key === 'j' ||
      e.key === 'C' || e.key === 'c' ||
      e.key === 'U' || e.key === 'u' ||
      e.key === 'S' || e.key === 's'
    )) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  }, { capture: true });

  // 2. Anti-Debugging Trap
  function _trap() {
    try {
      (function() {}).constructor('debugger')();
    } catch(e) {}
  }

  // 3. DevTools Open Detection
  var _devToolsOpen = false;
  var _threshold = 160;
  setInterval(function() {
    var widthThreshold = window.outerWidth - window.innerWidth > _threshold;
    var heightThreshold = window.outerHeight - window.innerHeight > _threshold;
    if (widthThreshold || heightThreshold) {
      if (!_devToolsOpen) {
        _devToolsOpen = true;
        try { console.clear(); } catch(e) {}
      }
      _trap();
    } else {
      _devToolsOpen = false;
    }
  }, 1000);

  // 4. Decrypt and Execute Runtime Payload in Memory
  try {
    var _key = "${key}";
    var _rawB64 = "${encryptedPayload}";
    var _binary = atob(_rawB64);
    var _out = '';
    for (var i = 0; i < _binary.length; i++) {
      _out += String.fromCharCode(_binary.charCodeAt(i) ^ _key.charCodeAt(i % _key.length));
    }
    
    // Execute decoded application
    var _exec = new Function(_out);
    _exec.call(global);
  } catch (err) {
    console.warn("Protected runtime initialization error");
  }
})(typeof window !== 'undefined' ? window : this, typeof document !== 'undefined' ? document : {});
`;

fs.writeFileSync(path.join(__dirname, 'app.min.js'), protectedCode, 'utf8');
console.log('Successfully generated protected app.min.js: ' + protectedCode.length + ' bytes');
