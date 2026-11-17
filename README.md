# Questions for loved ones 💌

A tiny phone-friendly website. A friend or family member opens your link, answers
your questions one at a time, taps **Send**, and the answers arrive in **your email**.

No server, no database, no cost. Just 4 files.

| File | What it is |
|---|---|
| `config.js` | **The only file you edit**: your name, intro, questions, email key |
| `index.html`, `style.css`, `app.js` | The site itself (no need to touch) |

---

## Your questions, answered

**Can it go live through git?** Yes. You put the folder on GitHub (free), and GitHub Pages
turns it into a public link like `https://YOURNAME.github.io/loved-ones-questions/`.
When you change a question and push again, the live site updates in about a minute.

**Is it fine to share with friends?** Yes, with common-sense care:
- Anyone with the link can open it. The page asks for no password.
- Answers go **only to your email** (through a free service called Web3Forms). They are
  **not** shown on the website and **not** stored in GitHub. Web3Forms passes the message
  on to you; see their privacy policy at web3forms.com.
- Your **email address is not visible** on the site. The "access key" you paste in
  `config.js` is designed to be public — it can only *send to* your inbox, not read it.
- The site tells every visitor, before they start and before they send, who gets their
  answers. Keep that note in `config.js` (`privacyNote`) accurate.
- It asks for nothing except answers and an optional name. No tracking, no cookies, no
  analytics. Please don't add questions about passwords, bank details or ID numbers.
- Share the link with people you know (WhatsApp, message). Don't post it publicly.
- If you share anyone's answers with others, ask them first.

---

## Step 0 — Try it on your computer (optional)

Open Terminal, then:

```bash
cd ~/Desktop/loved-ones-questions
python3 -m http.server 8000
```

Open http://localhost:8000 in your browser. Until you add a key it runs in **test mode**:
you see what *would* be sent, but nothing is sent. Press `Ctrl+C` in Terminal to stop.

## Step 1 — Get your free key (so answers reach your email)

1. Go to https://web3forms.com and enter **your email**. Click *Create Access Key*.
2. They email you a key (a long code like `a1b2c3d4-...`). Open `config.js`, replace
   `PASTE-YOUR-WEB3FORMS-KEY-HERE` with it, keep the quote marks. Save.
3. Test it: open the site, answer a question, tap Send. An email should arrive
   (check spam the first time).

*Why Web3Forms?* It's free (about 250 answers/month), needs no account or server, and works on any
static host. **Trade-off:** answers arrive as emails, not a tidy spreadsheet, and the free plan has a monthly cap.
If you later want a dashboard, Formspree or a Google Form are alternatives; this site is built so only the
`submit()` function in `app.js` would change.

## Step 2 — Edit your questions

Open `config.js` in any text editor (TextEdit works; use Plain Text mode). Change the title, intro,
and questions. Two kinds of question: `"text"` (they type) and `"choice"` (they tap an option).
Save and refresh the page to see changes.

## Step 3 — Put it on GitHub

1. Create a free account at https://github.com if you don't have one.
2. Click **+ → New repository**. Name it `loved-ones-questions`. Choose **Public**
   (free GitHub Pages needs public). Don't tick "add README". Click *Create*.
3. In Terminal:

```bash
cd ~/Desktop/loved-ones-questions
git add .
git commit -m "My questions site"
git branch -M main
git remote add origin https://github.com/YOURNAME/loved-ones-questions.git
git push -u origin main
```

(Replace `YOURNAME` with your GitHub username. It may ask you to sign in.)

> Note: your repo is public, so your **questions and the access key are public** (the key is meant to be).
> Don't write anything private in `config.js`.

## Step 4 — Go live

1. On your repo page: **Settings → Pages**.
2. Under *Build and deployment*, choose **Deploy from a branch**, branch **main**, folder **/ (root)**, then *Save*.
3. Wait ~1 minute and refresh. The page shows your link:
   `https://YOURNAME.github.io/loved-ones-questions/`

(Prefer Netlify or Vercel? Sign in with GitHub, *Import* the repo, no build command, publish directory `.`)

## Step 5 — Share it

Send the link in WhatsApp/iMessage with a short note, like:
*"Hi! I made a little questionnaire — takes 3 minutes. Only I get the answers. 💛 <link>"*

Open the link on your own phone first and do a test answer.

## Changing things later

Edit `config.js`, then:

```bash
git add .
git commit -m "Update questions"
git push
```

The live site refreshes in about a minute.

## Taking it down

Repo **Settings → Pages → Unpublish**, or delete the repo. Answers already emailed to you stay in your inbox.
