// ============================================================
//  THIS IS THE ONLY FILE YOU NEED TO EDIT.
//  Change the words between the quote marks, save, and refresh.
//  Use {name} for their name, and \n to start a new line (poem style).
// ============================================================

window.SITE = {
  title: "Just for you",
  from: "Anupam",

  // Get a free key at https://web3forms.com (see README). Leave as-is for test mode.
  accessKey: "PASTE-YOUR-WEB3FORMS-KEY-HERE",

  // How many questions each person gets (picked at random from the bank below)
  howMany: 10,

  welcomeTitle: "Hello, you 💛",
  welcomeText: "Before the story begins,\nwhisper me your name.",

  greetingTitle: "I know you, {name}. 🥰",
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
    { title: "Thank you, {name} 💛", text: "You wandered through my questions\nand left the whole place golden.\nI am lucky to know you." },
    { title: "Stay shining, {name} ✨", text: "Every answer sounded like you,\nsoft as morning light.\nI'm always cheering for you." },
    { title: "Love you, {name} 🥰", text: "Thank you for your time,\nyour words, your heart.\nYou mean more than I can say." },
    { title: "Until next time, {name} 🌸", text: "The day is brighter now,\nbecause you passed through it.\nTalk soon." },
    { title: "A big hug, {name} 🤗", text: "You shared a little of yourself,\nand it was a gift.\nStay happy, stay you." },
    { title: "You did it, {name} 🌈", text: "Be exactly who you are,\nthe world is better for it.\nSee you very soon." },
    { title: "Always with you, {name} 🌻", text: "Near or far,\nyou live in my heart.\nThank you for this." }
  ],

  // ---------- THE QUESTION BANK ----------
  // Every option should be a happy one. A few questions let people type instead
  // (type: "text"). Add as many as you like; each person gets `howMany` of them.
  questions: [
    { text: "What kind of morning feels the best?", options: ["Slow with hot tea or coffee", "Sunshine and a walk", "Waking up to a nice message", "A long lazy sleep-in"] },
    { text: "Which treat would make you happiest right now?", options: ["Something sweet", "Hot street food", "Home-cooked food", "A cold drink in the sun"] },
    { text: "What is your kind of perfect evening?", options: ["Sunset and quiet", "Music and dancing", "Family dinner", "A good movie at home"] },
    { text: "Pick a feeling you love the most:", options: ["Peace", "Excitement", "Being loved", "Laughing until it hurts"] },
    { text: "If you could travel anywhere tomorrow, you'd choose:", options: ["Mountains", "A beach", "A new city", "Back to my hometown"] },
    { text: "Which colour matches your mood today?", options: ["Sunny yellow", "Calm blue", "Warm orange", "Fresh green"] },
    { text: "What makes a day feel special?", options: ["A call from someone I love", "Time to myself", "Good food", "Doing something kind"] },
    { text: "Which superpower would you pick?", options: ["Make everyone smile", "Fly anywhere", "Pause time", "Always know the right words"] },
    { text: "What is your favourite way to relax?", options: ["Music", "Sleep", "Chatting with friends", "Being out in nature"] },
    { text: "Which season feels like you?", options: ["Spring: fresh starts", "Summer: bright and warm", "Monsoon: cosy and dreamy", "Winter: calm and snug"] },
    { text: "What do you want more of this year?", options: ["Laughter", "Adventures", "Rest", "Time with loved ones"] },
    { text: "A gift that would make you happy:", options: ["A handwritten note", "A surprise outing", "Your favourite food", "A hug that lasts a bit longer"] },
    { text: "How do you like to celebrate good news?", options: ["Tell everyone", "A quiet smile to myself", "Treat the family", "A little dance"] },
    { text: "What is the best sound in the world?", options: ["Laughter", "Rain", "Music I love", "A familiar voice saying my name"] },
    { text: "Which one sounds like a great weekend?", options: ["A short trip", "Friends over", "Family time", "Doing nothing at all"] },
    { text: "What do you appreciate most in people?", options: ["Kindness", "Honesty", "A good sense of humour", "Being there when it counts"] },
    { text: "Pick a little joy:", options: ["Fresh flowers", "A favourite song on repeat", "A warm blanket", "A message from an old friend"] },
    { text: "What gives you energy?", options: ["Good company", "Quiet time", "Moving around", "Something delicious"] },
    { type: "text", text: "Tell me one small thing that makes you smile." },
    { type: "text", text: "What is a happy memory you love?" },
    { type: "text", text: "What is one thing you are looking forward to?" },
    { type: "text", text: "If you could say one kind thing to your younger self, what would it be?" },
    { type: "text", text: "What is a tiny thing someone did that you never forgot?" }
  ]
};
