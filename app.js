(function () {
  var S = window.SITE, app = document.getElementById("app");
  var qs = S.questions, answers = {}, name = "", i = -1; // -1 = intro, qs.length = final screen
  var DRAFT = "loq-draft";
  var TEST = !S.accessKey || S.accessKey.indexOf("PASTE-") === 0;

  try { var d = JSON.parse(sessionStorage.getItem(DRAFT) || "null"); if (d) { answers = d.a || {}; name = d.n || ""; } } catch (e) {}
  function save() { try { sessionStorage.setItem(DRAFT, JSON.stringify({ a: answers, n: name })); } catch (e) {} }
  function esc(s) { var d = document.createElement("div"); d.textContent = s; return d.innerHTML; }
  function render(html) { app.innerHTML = html; window.scrollTo(0, 0); }
  document.title = S.title;

  function intro() {
    render(
      '<div class="emoji">💌</div><h1>' + esc(S.title) + '</h1>' +
      '<p class="from">from ' + esc(S.from) + '</p><p>' + esc(S.intro) + '</p>' +
      '<p class="note">🔒 ' + esc(S.privacyNote) + '</p>' +
      '<div class="row"><button class="btn" id="go">Let’s start</button></div>'
    );
    document.getElementById("go").onclick = function () { i = 0; question(); };
  }

  function question() {
    var q = qs[i], pct = Math.round((i / qs.length) * 100), cur = answers[i] || "";
    var body;
    if (q.type === "choice") {
      body = '<div class="opts">' + q.options.map(function (o, k) {
        return '<button type="button" class="opt' + (cur === o ? " sel" : "") + '" data-k="' + k + '">' + esc(o) + '</button>';
      }).join("") + '</div>';
    } else {
      body = '<textarea id="ans" placeholder="Type your answer here…" maxlength="2000"></textarea>';
    }
    render(
      '<div class="progress"><div style="width:' + pct + '%"></div></div>' +
      '<div class="count">Question ' + (i + 1) + ' of ' + qs.length + '</div>' +
      '<h2>' + esc(q.text) + '</h2>' + body + '<div class="err" id="err"></div>' +
      '<div class="row">' + (i > 0 ? '<button class="btn ghost" id="back">Back</button>' : '') +
      '<button class="btn" id="next">' + (i === qs.length - 1 ? "Finish" : "Next") + '</button></div>' +
      (q.required ? "" : '<button class="skip" id="skip">Skip this one</button>')
    );
    var ta = document.getElementById("ans");
    if (ta) ta.value = cur;
    Array.prototype.forEach.call(app.querySelectorAll(".opt"), function (b) {
      b.onclick = function () {
        answers[i] = q.options[+b.dataset.k]; save();
        Array.prototype.forEach.call(app.querySelectorAll(".opt"), function (x) { x.classList.remove("sel"); });
        b.classList.add("sel");
      };
    });
    function store() { if (ta) { answers[i] = ta.value.trim(); save(); } }
    function go(n) { i = n; if (i >= qs.length) final(); else question(); }
    document.getElementById("next").onclick = function () {
      store();
      if (q.required && !answers[i]) { document.getElementById("err").textContent = "Please answer this one."; return; }
      go(i + 1);
    };
    var sk = document.getElementById("skip"); if (sk) sk.onclick = function () { answers[i] = ""; save(); go(i + 1); };
    var bk = document.getElementById("back"); if (bk) bk.onclick = function () { store(); go(i - 1); };
  }

  function final() {
    render(
      '<div class="progress"><div style="width:100%"></div></div>' +
      '<h2>Almost done 🎉</h2>' +
      (S.askName ? '<p>Who is this from? <span class="from">(optional)</span></p><input type="text" id="nm" maxlength="80" placeholder="Your name" autocomplete="given-name">' : '') +
      '<p class="note" style="margin-top:16px">🔒 ' + esc(S.privacyNote) + '</p>' +
      (TEST ? '<div class="testmode">Test mode: no access key set yet, so nothing is sent anywhere.</div>' : '') +
      '<input class="hp" type="text" id="hp" tabindex="-1" autocomplete="off" aria-hidden="true">' +
      '<div class="err" id="err"></div>' +
      '<div class="row"><button class="btn ghost" id="back">Back</button><button class="btn" id="send">Send my answers</button></div>'
    );
    var nm = document.getElementById("nm"); if (nm) nm.value = name;
    document.getElementById("back").onclick = function () { if (nm) name = nm.value.trim(); i = qs.length - 1; question(); };
    document.getElementById("send").onclick = function () {
      if (nm) name = nm.value.trim(); save(); submit();
    };
  }

  function submit() {
    var btn = document.getElementById("send"), err = document.getElementById("err");
    if (document.getElementById("hp").value) return; // bot
    var lines = qs.map(function (q, k) { return (k + 1) + ". " + q.text + "\n   " + (answers[k] || "(skipped)"); }).join("\n\n");
    if (!Object.keys(answers).some(function (k) { return answers[k]; })) { err.textContent = "Please answer at least one question."; return; }
    if (TEST) { console.log(lines); return done(lines); }
    btn.disabled = true; btn.textContent = "Sending…";
    fetch("https://api.web3forms.com/submit", {
      method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: S.accessKey, subject: "Answers from " + (name || "someone") + " — " + S.title,
        from_name: name || "Anonymous", name: name || "Anonymous", message: lines
      })
    }).then(function (r) { return r.json(); }).then(function (j) {
      if (j && j.success) done(); else throw new Error((j && j.message) || "failed");
    }).catch(function () {
      btn.disabled = false; btn.textContent = "Send my answers";
      err.textContent = "Sorry, that didn’t send. Please check your internet and tap again — your answers are kept.";
    });
  }

  function done(preview) {
    try { sessionStorage.removeItem(DRAFT); } catch (e) {}
    render('<div class="emoji">💛</div><h1>' + esc(S.thankYou) + '</h1>' +
      (preview ? '<p class="testmode">Test mode — here is what would have been sent:</p><dl class="review"><dd>' + esc(preview) + '</dd></dl>' : ''));
  }

  intro();
})();
