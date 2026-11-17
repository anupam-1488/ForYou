(function () {
  var S = window.SITE, app = document.getElementById("app");
  var TEST = !S.accessKey || S.accessKey.indexOf("PASTE-") === 0;
  var name = "", picked = [], answers = [], i = 0, lastReply = -1;

  function fill(s) { return s.replace(/\{name\}/g, name || "friend"); }
  function esc(s) { var d = document.createElement("div"); d.textContent = s; return d.innerHTML; }
  function $(id) { return document.getElementById(id); }
  function rand(n) { return Math.floor(Math.random() * n); }
  function shuffle(a) { a = a.slice(); for (var k = a.length - 1; k > 0; k--) { var j = rand(k + 1), t = a[k]; a[k] = a[j]; a[j] = t; } return a; }
  function render(html) { app.innerHTML = '<div class="screen">' + html + '</div>'; window.scrollTo(0, 0); }
  function reply() {
    var n; do { n = rand(S.warmReplies.length); } while (n === lastReply && S.warmReplies.length > 1);
    lastReply = n; return fill(S.warmReplies[n]);
  }
  document.title = S.title;

  // floating hearts in the background
  (function hearts() {
    var box = $("hearts"), E = ["💛", "🌸", "✨", "💕", "🌻"];
    for (var k = 0; k < 14; k++) {
      var s = document.createElement("span");
      s.textContent = E[rand(E.length)];
      s.style.left = rand(100) + "%"; s.style.fontSize = (14 + rand(18)) + "px";
      s.style.animationDuration = (12 + rand(14)) + "s"; s.style.animationDelay = (-rand(20)) + "s";
      box.appendChild(s);
    }
  })();

  // 1. ask the name
  function welcome() {
    render('<div class="emoji bounce">💌</div><h1>' + esc(S.welcomeTitle) + '</h1><p>' + esc(S.welcomeText) + '</p>' +
      '<input type="text" id="nm" maxlength="40" placeholder="Your name" autocomplete="given-name">' +
      '<div class="err" id="err"></div><div class="row"><button class="btn" id="go">Get in</button></div>');
    var nm = $("nm"); nm.focus();
    function go() {
      var v = nm.value.trim();
      if (!v) { $("err").textContent = "Please type your name first 🙂"; return; }
      name = v; greeting();
    }
    $("go").onclick = go;
    nm.onkeydown = function (e) { if (e.key === "Enter") go(); };
  }

  // 2. "I know you"
  function greeting() {
    render('<div class="emoji bounce">🥰</div><h1>' + esc(fill(S.greetingTitle)) + '</h1><p>' + esc(fill(S.greetingText)) + '</p>' +
      '<p class="note">🔒 ' + esc(S.privacyNote) + '</p><div class="row"><button class="btn" id="go">Let’s begin</button></div>');
    $("go").onclick = function () {
      picked = shuffle(S.questions).slice(0, Math.min(S.howMany, S.questions.length));
      answers = []; i = 0; question();
    };
  }

  // 3. questions, each followed by a warm reply
  function question() {
    var q = picked[i], total = picked.length, answered = false, body;
    if (q.type === "text") body = '<textarea id="ans" placeholder="Type here…" maxlength="1500"></textarea>';
    else body = '<div class="opts">' + shuffle(q.options.map(function (o, k) { return k; })).map(function (k) {
      return '<button type="button" class="opt" data-k="' + k + '">' + esc(q.options[k]) + '</button>'; }).join("") + '</div>';
    render('<div class="progress"><div style="width:' + Math.round(i / total * 100) + '%"></div></div>' +
      '<div class="count">' + (i + 1) + ' of ' + total + '</div><h2>' + esc(q.text) + '</h2>' + body +
      '<div class="bubble" id="bub"></div>' +
      (q.type === "text" ? '<div class="row"><button class="btn" id="next">Share</button></div><button class="skip" id="skip">Skip this one</button>' :
        '<div class="row"><button class="btn" id="next" disabled>Next</button></div>'));
    var next = $("next"), bub = $("bub");
    function warm() { bub.textContent = reply(); bub.classList.add("show"); }
    function advance() { i++; if (i >= total) finish(); else question(); }
    if (q.type === "text") {
      next.onclick = function () {
        if (answered) return advance();
        var v = $("ans").value.trim();
        if (!v) return;
        answers[i] = v; answered = true; $("ans").readOnly = true; warm(); next.textContent = "Next";
        $("skip").style.display = "none";
      };
      $("skip").onclick = function () { answers[i] = ""; advance(); };
    } else {
      Array.prototype.forEach.call(app.querySelectorAll(".opt"), function (b) {
        b.onclick = function () {
          Array.prototype.forEach.call(app.querySelectorAll(".opt"), function (x) { x.classList.remove("sel"); });
          b.classList.add("sel"); answers[i] = q.options[+b.dataset.k]; warm(); next.disabled = false;
        };
      });
      next.onclick = advance;
    }
  }

  // 4. send, then video, then a random closing message
  function finish() {
    render('<div class="emoji bounce">💌</div><h2>Sending your answers to Anupam…</h2><div class="err" id="err"></div>');
    var lines = picked.map(function (q, k) { return (k + 1) + ". " + q.text + "\n   " + (answers[k] || "(skipped)"); }).join("\n\n");
    if (TEST) { console.log(name + "\n" + lines); return video(lines); }
    fetch("https://api.web3forms.com/submit", {
      method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ access_key: S.accessKey, subject: "Answers from " + name + " (" + S.title + ")",
        from_name: name, name: name, message: "From: " + name + "\n\n" + lines })
    }).then(function (r) { return r.json(); }).then(function (j) {
      if (j && j.success) video(); else throw 0;
    }).catch(function () {
      render('<div class="emoji">😕</div><h2>That didn’t send</h2><p>Please check your internet and try again. Your answers are kept.</p>' +
        '<div class="row"><button class="btn" id="retry">Try again</button></div>');
      $("retry").onclick = finish;
    });
  }

  function video(preview) {
    render('<video id="v" src="ending.mp4" playsinline autoplay></video><div class="row"><button class="btn ghost" id="skipv">Skip</button></div>');
    var v = $("v"), shown = false;
    function end() { if (shown) return; shown = true; closing(preview); }
    v.onended = end; v.onerror = end; $("skipv").onclick = end;
    var p = v.play(); if (p && p.catch) p.catch(function () { v.controls = true; });
  }

  function closing(preview) {
    var c = S.closings[rand(S.closings.length)];
    render('<div class="emoji bounce">💛</div><h1>' + esc(fill(c.title)) + '</h1><p>' + esc(fill(c.text)) + '</p>' +
      (preview ? '<p class="testmode">Test mode (no key yet), so nothing was sent. It would have sent:</p><pre class="review">' + esc("From: " + name + "\n\n" + preview) + '</pre>' : ''));
  }

  welcome();
})();
