// ============================================================
//  THIS IS THE ONLY FILE YOU NEED TO EDIT.
//  Change the words between the quote marks, save, and refresh.
//  Use {name} for their name, and \n to start a new line (poem style).
// ============================================================

window.SITE = {
  title: "Just for you",
  from: "Anupam",

  // Answers are emailed here (through the free service formsubmit.co).
  sendTo: "naninoyal55@gmail.com",

  // How many questions each person gets (picked at random from the bank below)
  howMany: 10,

  welcomeEyebrow: "A LITTLE SOMETHING, JUST FOR YOU",
  welcomeTitle: "Hello, you",
  welcomeText: "Before the story begins,\nwhisper me your name.",

  greetingTitle: "I know you, {name}.",
  greetingText:
    "I knew you'd come.\nThis little door was made\nfor you, and only you.\n\nPick what feels like home.\nThere are no wrong answers here.",
  privacyNote:
    "Your words travel only to Anupam,\nsoftly, by email. Never shown to anyone else.",

  // After every answer, one of these appears (never the same twice in a row)
  warmReplies: [
    "Like sunlight on a window,\nthat is so you, {name}. 💛",
    "Soft and bright and true,\nthe way you always are. ✨",
    "{name}, that answer\nmade my whole day smile. 😊",
    "Your heart is showing,\nand it is beautiful. 🥰",
    "Just what I hoped you'd say,\nlike a song I knew by heart. 🌸",
    "Some people are like flowers.\nYou, {name}, are a garden. 💫",
    "A gentle choice, a gentle soul,\nthe world needs more of you. 🌈",
    "Thank you for being here, {name},\nthe days are warmer with you. 🤗",
    "Kind and real and glowing,\nthat is you. 🌻",
    "One small answer,\none big smile on my face. ☀️"
  ],

  // After the video, one of these closes the page (picked at random)
  closings: [
    { title: "Thank you, {name}", text: "You wandered through my questions\nand left the whole place golden.\nI am lucky to know you." },
    { title: "Stay shining, {name}", text: "Every answer sounded like you,\nsoft as morning light.\nI'm always cheering for you." },
    { title: "Love you, {name}", text: "Thank you for your time,\nyour words, your heart.\nYou mean more than I can say." },
    { title: "Until next time, {name}", text: "The day is brighter now,\nbecause you passed through it.\nTalk soon." },
    { title: "A big hug, {name}", text: "You shared a little of yourself,\nand it was a gift.\nStay happy, stay you." },
    { title: "You did it, {name}", text: "Be exactly who you are,\nthe world is better for it.\nSee you very soon." },
    { title: "Always with you, {name}", text: "Near or far,\nyou live in my heart.\nThank you for this." }
  ],

  // ---------- THE QUESTION BANK (all about our relationship) ----------
  // Every option is a happy one. type: "text" lets people type instead.
  // Add as many as you like; each person gets `howMany` of them, at random.
  questions: [
    // what it is
    { text: "If our relationship were a place, it would be:", options: ["A cosy home", "A sunny beach", "A quiet garden", "A mountain view"] },
    { text: "If our relationship were a season, it would be:", options: ["Spring, always new", "Summer, bright and warm", "Monsoon, soft and dreamy", "Winter, snug and calm"] },
    { text: "If our relationship were a song, it would be:", options: ["A gentle lullaby", "A happy dance tune", "An old favourite", "A song that never ends"] },
    { text: "What is our relationship most like?", options: ["A warm blanket", "A quiet river", "Sunshine after rain", "A light in the dark"] },
    { text: "What word fits us best?", options: ["Trust", "Care", "Laughter", "Home"] },
    { text: "What is the heart of our relationship?", options: ["Understanding", "Memories", "Being there", "Honesty"] },
    // how it feels
    { text: "How do you feel when we spend time together?", options: ["Light and happy", "Calm and safe", "Like myself", "Like time goes too fast"] },
    { text: "When you think of us, what do you feel first?", options: ["A smile", "Warmth", "Gratitude", "Peace"] },
    { text: "How does it feel to know I am in your life?", options: ["Comforting", "Happy", "Lucky", "Supported"] },
    { text: "How do you feel after we talk?", options: ["Lighter", "Cheerful", "Cared for", "Recharged"] },
    { text: "Where do you feel our bond the most?", options: ["In my heart", "In small moments", "In shared laughter", "In silence that feels easy"] },
    { text: "What feeling do we share the most?", options: ["Joy", "Comfort", "Trust", "Love"] },
    // what is wished for
    { text: "What do you wish for us?", options: ["More laughter together", "More time together", "To always stay close", "Many more memories"] },
    { text: "What do you wish we did more often?", options: ["Talk for hours", "Meet and travel", "Laugh till we cry", "Make small plans together"] },
    { text: "What do you wish for our future?", options: ["To grow closer", "To stay as we are", "To share big moments", "To never lose touch"] },
    { text: "What would make our bond even stronger?", options: ["More calls and messages", "More meetups", "More honest sharing", "More small surprises"] },
    { text: "What is your biggest wish for the people you love?", options: ["Good health", "Peace of mind", "Big happiness", "Every dream coming true"] },
    { text: "If you could give us one gift, it would be:", options: ["More time", "A shared trip", "Endless laughter", "A promise to stay close"] },
    // what you value, how you love
    { text: "What do you value most in our relationship?", options: ["Trust", "Honest talks", "Laughing together", "Knowing I can count on you"] },
    { text: "How do you like to show love?", options: ["Words", "Time", "Little gifts", "Helping when it matters"] },
    { text: "When do you feel most loved?", options: ["When someone listens", "When someone remembers me", "When we are together", "When someone checks in"] },
    { text: "What do you love most about the way we are?", options: ["We can be ourselves", "We laugh easily", "We understand each other", "We stand by each other"] },
    // typed, from the heart
    { type: "text", text: "What is our relationship to you, in your own words?" },
    { type: "text", text: "How does it feel to have me in your life?" },
    { type: "text", text: "What do you wish for us?" },
    { type: "text", text: "What is something you have always appreciated about me?" },
    { type: "text", text: "Finish this sentence: I feel most loved when..." },
    { type: "text", text: "What is a moment with me you will never forget?" },
    { type: "text", text: "What do you wish we did together more often?" },
    { type: "text", text: "What is one dream you would love to share with me?" },
    { type: "text", text: "What is one thing you have never told me but would like to?" }
  ]
};
