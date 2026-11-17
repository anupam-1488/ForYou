(function () {
  var S = window.SITE, app = document.getElementById("app");

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
  document.body.classList.add("night");

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

  // 3D glossy heart (three.js). Falls back to a CSS heart if WebGL/CDN is unavailable.
  function heart3d(box) {
    function fallback() { box.innerHTML = '<div class="fallback-heart">❤</div>'; return function () {}; }
    if (!window.THREE) return fallback();
    var T = THREE, renderer;
    try { renderer = new T.WebGLRenderer({ antialias: true, alpha: true }); } catch (e) { return fallback(); }
    var w = box.clientWidth || 320, h = box.clientHeight || 320;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(w, h); renderer.outputEncoding = T.sRGBEncoding;
    renderer.toneMapping = T.ACESFilmicToneMapping; renderer.toneMappingExposure = 0.95;
    box.appendChild(renderer.domElement);
    var scene = new T.Scene(), camera = new T.PerspectiveCamera(35, w / h, 0.1, 100);
    camera.position.set(0, 0, 9.5);

    // studio-style reflections so the heart looks glossy and real
    var env = new T.Scene(); env.background = new T.Color(0x2a0714);
    [[0xb0a0a4, 0, 9, 3, 14, 3], [0xd0305a, -9, 1, 3, 3, 10], [0xd08040, 9, -1, 3, 3, 10], [0x6a3040, 0, -8, 4, 12, 2]].forEach(function (p) {
      var m = new T.Mesh(new T.BoxGeometry(p[3], p[4], p[5]), new T.MeshBasicMaterial({ color: p[0] }));
      m.position.set(p[1], p[2], 0); env.add(m);
    });
    var pm = new T.PMREMGenerator(renderer); scene.environment = pm.fromScene(env).texture; pm.dispose();

    var s = new T.Shape(), x = 0, y = 0;
    s.moveTo(x + 2.5, y + 2.5); s.bezierCurveTo(x + 2.5, y + 2.5, x + 2, y, x, y);
    s.bezierCurveTo(x - 3, y, x - 3, y + 3.5, x - 3, y + 3.5);
    s.bezierCurveTo(x - 3, y + 5.5, x - 1.5, y + 7.7, x + 2.5, y + 9.5);
    s.bezierCurveTo(x + 6, y + 7.7, x + 8, y + 5.5, x + 8, y + 3.5);
    s.bezierCurveTo(x + 8, y + 3.5, x + 8, y, x + 5, y);
    s.bezierCurveTo(x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5);
    var geo = new T.ExtrudeGeometry(s, { depth: 2.4, bevelEnabled: true, bevelThickness: 1.5, bevelSize: 1.3, bevelSegments: 16, curveSegments: 64 });
    geo.rotateZ(Math.PI); geo.center();
    var mat = new T.MeshPhysicalMaterial({ color: 0x6e0516, metalness: 0.05, roughness: 0.28, clearcoat: 1, clearcoatRoughness: 0.08,
      emissive: 0x28030a, emissiveIntensity: 0.4, envMapIntensity: 0.45 });
    var heart = new T.Mesh(geo, mat); heart.scale.setScalar(0.3);
    var group = new T.Group(); group.add(heart); scene.add(group);

    scene.add(new T.AmbientLight(0xff9aa8, 0.12));
    var key = new T.DirectionalLight(0xffffff, 0.9); key.position.set(3, 5, 6); scene.add(key);
    var pl1 = new T.PointLight(0xff2a5a, 0.9, 30); pl1.position.set(-5, 2, 5); scene.add(pl1);
    var pl2 = new T.PointLight(0xff8040, 0.7, 30); pl2.position.set(5, -3, 4); scene.add(pl2);

    // sparkles drifting around the heart
    var N = 70, pos = new Float32Array(N * 3), seed = [];
    for (var k = 0; k < N; k++) { var r = 2.6 + Math.random() * 2, a2 = Math.random() * 6.28;
      pos[k * 3] = Math.cos(a2) * r; pos[k * 3 + 1] = (Math.random() - 0.5) * 6; pos[k * 3 + 2] = Math.sin(a2) * r * 0.6; seed.push(Math.random() * 6); }
    var pg = new T.BufferGeometry(); pg.setAttribute("position", new T.BufferAttribute(pos, 3));
    var pts = new T.Points(pg, new T.PointsMaterial({ color: 0xffd9e6, size: 0.07, transparent: true, opacity: 0.85, blending: T.AdditiveBlending, depthWrite: false }));
    scene.add(pts);

    var px = 0, py = 0, raf, t0 = performance.now(), alive = true;
    function move(e) { var p = e.touches ? e.touches[0] : e; px = (p.clientX / innerWidth - 0.5) * 2; py = (p.clientY / innerHeight - 0.5) * 2; }
    window.addEventListener("pointermove", move); window.addEventListener("touchmove", move, { passive: true });
    function resize() { var W = box.clientWidth, H = box.clientHeight; if (!W || !H) return; renderer.setSize(W, H); camera.aspect = W / H; camera.updateProjectionMatrix(); }
    window.addEventListener("resize", resize);
    function tick() {
      if (!alive) return;
      var t = (performance.now() - t0) / 1000, p = (t % 1.3) / 1.3;
      var beat = 1 + 0.08 * (Math.exp(-Math.pow((p - 0.08) * 12, 2)) + 0.7 * Math.exp(-Math.pow((p - 0.27) * 12, 2)));
      group.scale.setScalar(beat);
      group.rotation.y += ((Math.sin(t * 0.7) * 0.75 + px * 0.6) - group.rotation.y) * 0.06;
      group.rotation.x += ((py * 0.35 + Math.sin(t * 0.5) * 0.08) - group.rotation.x) * 0.06;
      group.position.y = Math.sin(t * 1.1) * 0.12;
      pts.rotation.y = t * 0.15;
      var arr = pg.attributes.position.array;
      for (var k = 0; k < N; k++) { arr[k * 3 + 1] += 0.004 + 0.003 * Math.sin(t + seed[k]); if (arr[k * 3 + 1] > 3.2) arr[k * 3 + 1] = -3.2; }
      pg.attributes.position.needsUpdate = true;
      renderer.render(scene, camera); raf = requestAnimationFrame(tick);
    }
    tick();
    return function stop() {
      alive = false; cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move); window.removeEventListener("touchmove", move); window.removeEventListener("resize", resize);
      geo.dispose(); mat.dispose(); pg.dispose(); renderer.dispose();
      if (renderer.forceContextLoss) renderer.forceContextLoss();
    };
  }

  // 1. ask the name
  var stopHeart = function () {};
  function leaveHero() { stopHeart(); stopHeart = function () {}; document.body.classList.remove("hero"); }
  function welcome() {
    document.body.classList.add("hero");
    render('<div class="hero-wrap"><div class="eyebrow">' + esc(S.welcomeEyebrow || "") + '</div>' +
      '<div class="heart-box" id="hbox"><div class="glow"></div></div>' +
      '<h1 class="hero-title">' + esc(S.welcomeTitle) + '</h1><p class="hero-sub">' + esc(S.welcomeText) + '</p>' +
      '<div class="glass"><input type="text" id="nm" maxlength="40" placeholder="Your name" autocomplete="given-name">' +
      '<div class="err" id="err"></div><button class="btn shine" id="go">Get in <span>→</span></button></div></div>');
    stopHeart = heart3d($("hbox"));
    var nm = $("nm");
    function go() {
      var v = nm.value.trim();
      if (!v) { $("err").textContent = "Please whisper your name first ♡"; return; }
      name = v; stopHeart(); stopHeart = function () {}; greeting();
    }
    $("go").onclick = go;
    nm.onkeydown = function (e) { if (e.key === "Enter") go(); };
  }

  // 2. "I know you": a full cinematic screen
  function greeting() {
    document.body.classList.add("hero");
    var initial = esc(name.charAt(0).toUpperCase());
    var title = esc(S.greetingTitle).replace("{name}", '<span class="glowname">' + esc(name) + '</span>');
    var lines = fill(S.greetingText).split("\n").map(function (l, k) {
      return l ? '<span class="line" style="animation-delay:' + (1.1 + k * 0.45) + 's">' + esc(l) + '</span>' : '<span class="gap"></span>';
    }).join("");
    var burst = "";
    for (var k = 0; k < 22; k++) {
      var ang = (k / 22) * 6.283 + Math.random() * 0.3, dist = 110 + rand(110);
      burst += '<i style="--dx:' + Math.round(Math.cos(ang) * dist) + 'px;--dy:' + Math.round(Math.sin(ang) * dist) + 'px;font-size:' + (12 + rand(14)) + 'px;animation-delay:' + (rand(300) / 1000) + 's">' + ["❤", "✨", "💕", "🌸"][rand(4)] + '</i>';
    }
    render('<div class="hero-wrap greet">' +
      '<div class="orb-stage"><div class="ring r1"></div><div class="ring r2"></div><div class="orbit"><b>❤</b><b>✨</b><b>❤</b></div>' +
      '<div class="orb"><span>' + initial + '</span></div><div class="burst">' + burst + '</div></div>' +
      '<h1 class="greet-title">' + title + '</h1>' +
      '<div class="greet-text">' + lines + '</div>' +
      '<p class="pill" style="animation-delay:' + (1.3 + 0.45 * 7) + 's">🔒 ' + esc(S.privacyNote).replace(/\n/g, "<br>") + '</p>' +
      '<button class="btn shine begin" id="go" style="animation-delay:' + (1.6 + 0.45 * 7) + 's">Let’s begin <span>→</span></button></div>');
    $("go").onclick = function () {
      leaveHero();
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

  // 4. send in the background, play the video, then a random closing message
  var sendState = "pending", lastLines = "";
  function send(lines) {
    sendState = "pending";
    if (!S.sendTo && !S.accessKey) { sendState = "ok"; return Promise.resolve(); }
    var subject = "Answers from " + name + " (" + S.title + ")", msg = "From: " + name + "\n\n" + lines, url, payload;
    if (S.accessKey) { // Web3Forms (preferred: free key tied to your email)
      url = "https://api.web3forms.com/submit";
      payload = { access_key: S.accessKey, subject: subject, from_name: name, name: name, message: msg };
    } else {           // FormSubmit (no key, needs a one-time email activation)
      url = "https://formsubmit.co/ajax/" + encodeURIComponent(S.sendTo);
      payload = { _subject: subject, _template: "box", _captcha: "false", name: name, message: msg };
    }
    var ctl = window.AbortController ? new AbortController() : null, timer = setTimeout(function () { if (ctl) ctl.abort(); }, 12000);
    return fetch(url, { method: "POST", signal: ctl ? ctl.signal : undefined,
      headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(payload) })
      .then(function (r) { return r.json(); })
      .then(function (j) { console.log("mail service said:", j); if (!(j && (j.success === true || j.success === "true")) || /activat/i.test(j.message || "")) throw 0; sendState = "ok"; })
      .catch(function () { sendState = "fail"; })
      .then(function () { clearTimeout(timer); });
  }

  function finish() {
    lastLines = picked.map(function (q, k) { return (k + 1) + ". " + q.text + "\n   " + (answers[k] || "(skipped)"); }).join("\n\n");
    send(lastLines);   // runs while the video plays, so nobody waits
    video();
  }

  function video() {
    render('<video id="v" src="ending.mp4" playsinline autoplay></video><div class="row"><button class="btn ghost" id="skipv">Skip</button></div>');
    var v = $("v"), shown = false;
    function end() { if (shown) return; shown = true; closing(); }
    v.onended = end; v.onerror = end; $("skipv").onclick = end;
    var p = v.play(); if (p && p.catch) p.catch(function () { v.controls = true; });
  }

  function closing() {
    var c = S.closings[rand(S.closings.length)];
    render('<div class="emoji bounce">💛</div><h1>' + esc(fill(c.title)) + '</h1><p>' + esc(fill(c.text)) + '</p><div id="sendnote"></div>');
    var note = $("sendnote");
    function show() {
      if (sendState === "fail") {
        note.innerHTML = '<p class="sendfail">Your answers didn’t reach Anupam yet.</p><div class="row"><button class="btn" id="retry">Send again</button></div>';
        $("retry").onclick = function () { note.innerHTML = '<p class="sendfail">Sending…</p>'; send(lastLines).then(show); };
      } else if (sendState === "pending") { setTimeout(show, 400); }
      else note.innerHTML = '<p class="sendok">✓ Your answers were sent to Anupam.</p>';
    }
    show();
  }

  welcome();
})();
