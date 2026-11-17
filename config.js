// ============================================================
//  THIS IS THE ONLY FILE YOU NEED TO EDIT.
//  Change the words between the quote marks, save, and refresh.
//  Use {name} anywhere in a message and it becomes their name.
// ============================================================

window.SITE = {
  title: "Just for you",
  from: "Anupam",

  // Get a free key at https://web3forms.com (see README). Leave as-is for test mode.
  accessKey: "PASTE-YOUR-WEB3FORMS-KEY-HERE",

  // How many questions each person gets (picked at random from the bank below)
  howMany: 10,

  welcomeTitle: "Hello you 💛",
  welcomeText: "Before we begin, what is your name?",

  // Shown after they type their name and tap "Get in"
  greetingTitle: "Hey {name}, I knew you'd be here 🥰",
  greetingText:
    "This link was made only for you. A few little questions, and every answer you pick is a good one. There is no wrong answer here.",
  privacyNote:
    "Your answers go only to Anupam, by email. Nothing is posted publicly. You can skip the typed ones.",

  // After every answer, one of these appears (never the same twice in a row)
  warmReplies: [
    "I love that, {name}. That is so you. 💛",
    "Beautiful answer. You always make things brighter. ✨",
    "That made me smile, {name}. 😊",
    "Your heart really shows in this one. 🥰",
    "Exactly what I hoped you'd say. 🌸",
    "{name}, you are such a lovely soul. 💫",
    "That is such a good choice, and a good way to be. 🌈",
    "I'm so glad you're in my life, {name}. 🤗",
    "Warm, kind and real. That's you. 🌻",
    "You just made my day a little better. ☀️"
  ],

  // After the video, one of these closes the page (picked at random)
  closings: [
    { title: "Thank you, {name} 💛", text: "You made me smile all the way through. I'm lucky to have you." },
    { title: "You're a gem, {name} ✨", text: "Every answer felt like you. Keep shining, I'm always cheering for you." },
    { title: "Love you, {name} 🥰", text: "Thanks for taking the time. You mean more to me than you know." },
    { title: "That's all, {name} 🌸", text: "My day is brighter because of you. Talk soon!" },
    { title: "Big hug, {name} 🤗", text: "Thank you for sharing a little of yourself with me. Take care and stay happy." },
    { title: "You did it, {name} 🌈", text: "Thank you for being exactly who you are. See you very soon!" },
    { title: "Always with you, {name} 🌻", text: "Near or far, you are in my heart. Thank you for this." }
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
