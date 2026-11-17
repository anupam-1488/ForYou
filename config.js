// ============================================================
//  THIS IS THE ONLY FILE YOU NEED TO EDIT.
//  Change the words between the quote marks, save, and refresh.
// ============================================================

window.SITE = {
  // Shown on the first screen
  title: "A few questions for you",
  from: "Anupam",                      // your name, shown as "from ..."
  intro:
    "I would love to know you a little better. There are just a few questions — answer as much or as little as you like. It takes about 3 minutes.",

  // Get a free key at https://web3forms.com (see README, Step 1).
  // Paste it between the quotes. Leave it as-is to try the site in "test mode"
  // (answers are only shown on screen and go nowhere).
  accessKey: "PASTE-YOUR-WEB3FORMS-KEY-HERE",

  // Shown before people start, so they know what happens to their answers.
  privacyNote:
    "Your answers are sent only to Anupam by email. Nothing is posted publicly. You can skip any question.",

  thankYou: "Thank you! Your answers are on their way to me. 💛",

  // Ask for a name so you know who answered? (they can leave it blank)
  askName: true,

  // ---------- THE QUESTIONS ----------
  // type: "text"    -> a free text box
  // type: "choice"  -> tap one option (add  options: ["A", "B", "C"] )
  // required: true  -> they must answer it (leave out to make it skippable)
  questions: [
    { type: "text",   text: "What is a favourite memory we share?" },
    { type: "text",   text: "What is something small that always makes you smile?" },
    { type: "choice", text: "Which sounds like your perfect weekend?",
      options: ["Quiet at home", "Time with family", "A trip somewhere", "Meeting friends"] },
    { type: "text",   text: "What is one thing you are looking forward to this year?" },
    { type: "text",   text: "Is there anything you have always wanted to tell me?" }
  ]
};
