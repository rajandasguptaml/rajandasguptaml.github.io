// publications.js: adds "Abstract" and "BibTeX" buttons to each paper on the Publications page.
// The text comes from hidden blocks inside the paper's <li>:
//   <div data-publication-abstract hidden>...</div>
//   <pre data-publication-bibtex hidden>...</pre>

document.addEventListener('DOMContentLoaded', function () {
  var items = document.querySelectorAll('.core-section ol > li');

  items.forEach(function (item, index) {
    var abstractSource = item.querySelector('[data-publication-abstract]');
    var bibtexSource = item.querySelector('[data-publication-bibtex]');
    if (!abstractSource && !bibtexSource) return;

    // Buttons go in the same row as the PDF / DOI / arXiv links.
    var actions = item.querySelector('.publication-actions');
    if (!actions) {
      actions = document.createElement('div');
      actions.className = 'publication-actions';
      var entry = item.querySelector('p.single-paper-f');
      entry.parentNode.insertBefore(actions, entry.nextSibling);
    }

    var details = document.createElement('div');
    details.className = 'publication-details';
    actions.parentNode.insertBefore(details, actions.nextSibling);

    var toggles = [];

    function addPanel(label, panel) {
      panel.id = 'publication-' + label.toLowerCase() + '-' + index;
      panel.hidden = true;
      details.appendChild(panel);

      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'publication-action-button';
      button.textContent = label;
      button.setAttribute('aria-expanded', 'false');
      button.setAttribute('aria-controls', panel.id);
      actions.appendChild(button);
      toggles.push({ button: button, panel: panel });

      button.addEventListener('click', function () {
        var opening = panel.hidden;
        // Only one panel per paper is open at a time.
        toggles.forEach(function (t) {
          t.panel.hidden = true;
          t.button.setAttribute('aria-expanded', 'false');
        });
        if (opening) {
          panel.hidden = false;
          button.setAttribute('aria-expanded', 'true');
        }
      });
    }

    if (abstractSource) {
      var abstractBox = document.createElement('div');
      abstractBox.className = 'publication-box';
      abstractBox.textContent = abstractSource.textContent.trim();
      addPanel('Abstract', abstractBox);
    }

    if (bibtexSource) {
      var bibtexText = bibtexSource.textContent.trim();
      var bibtexBox = document.createElement('div');
      bibtexBox.className = 'publication-box';

      var pre = document.createElement('pre');
      pre.className = 'publication-bibtex';
      pre.textContent = bibtexText;
      bibtexBox.appendChild(pre);

      var copyButton = document.createElement('button');
      copyButton.type = 'button';
      copyButton.className = 'publication-copy-button';
      copyButton.textContent = 'Copy BibTeX';
      bibtexBox.appendChild(copyButton);

      copyButton.addEventListener('click', function () {
        function done(ok) {
          copyButton.textContent = ok ? 'Copied' : 'Copy failed';
          setTimeout(function () { copyButton.textContent = 'Copy BibTeX'; }, 1600);
        }
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(bibtexText).then(function () { done(true); }, function () { done(false); });
          return;
        }
        // Fallback for browsers without the clipboard API.
        var area = document.createElement('textarea');
        area.value = bibtexText;
        area.setAttribute('readonly', '');
        area.style.position = 'fixed';
        area.style.opacity = '0';
        document.body.appendChild(area);
        area.select();
        var ok = false;
        try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
        document.body.removeChild(area);
        done(ok);
      });

      addPanel('BibTeX', bibtexBox);
    }
  });
});
