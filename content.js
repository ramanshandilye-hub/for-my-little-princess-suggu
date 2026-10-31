/* ================= EDIT HERE ================= */
const CONFIG = {
  question: "Tu bhai ko pyaar se kya bulati hai? 😏",   // password ka sawaal
  answers: ["beldara", "beldaara"],                      // sahi jawab (chhote akshar mein)
  hint: "Wahi naam jisse tu mujhe gusse mein chidhaati hai 😜",     // 3 galat jawab ke baad dikhega
  photoCount: 29                                         // photos: assets/photos/photo1.jpg ... photo29.jpg
};

// Photo ke captions: number = photoN.jpg. Jo nahi likha, uska default caption aayega.
const CAPTIONS = {
  // 1: "Yahan photo1.jpg ka caption likh",
  // 2: "Ye wali yaad hai na? 😄",
};

// 18 surprise cards (apni inside jokes se badal sakta hai)
const CARDS = [
  "Suggu, teri smile ka brightness level galaxy se bhi zyada hai. ✨",
  "Officially 19, but bhai ke liye thodi si chhoti bachchi abhi bhi. 🧸",
  "Teri random baatein aur funny reactions: priceless.",
  "Tu apne dreams ko seriously lena; main hamesha cheer karunga.",
  "Humari nok-jhok bhi apni alag love language hai. 😜❤️",
  "Reminder: tu capable hai, even on days jab tujhe khud par doubt ho.",
  "Teri happiness genuinely matters.",
  "Ek din apne saare dreams achieve karna, aur bhai ko party dena. 🥳",
  "Tere saath ki photos meri favourite memories mein se hain.",
  "Tu room mein aaye toh energy automatically change ho jaati hai.",
  "Be kind to yourself; har cheez ek hi din mein figure out karna zaroori nahi.",
  "Tere silly jokes par hasna meri majboori nahi, family duty hai. 😂",
  "Keep your kind heart, but never be afraid to set boundaries.",
  "Tujhe duniya ke saare achhe chances milen.",
  "Jab bhi low feel ho, yaad rakh: tu akeli nahi hai.",
  "Teri next chapter ki story abhi likhi ja rahi hai. Make it yours.",
  "Bhai ka lifetime subscription: support, teasing, and random advice. ❤️",
  "Last wish: hamesha khush reh, Suggu. Happy 19th Birthday! 🎂💜"
];
const SECRET = "🎁 Secret wish #19: Level 19 mubarak, Suggu! Ab teri next chapter shuru. Ye card sirf tere liye tha. 💜";

// Suggu stats: [naam, jo likha dikhe, bar kitni bhari (0-100), optional "glitch"]
const STATS = [
  ["Cuteness", "0%", 0],
  ["Drama", "100%", 100],
  ["Anger", "∞", 100],
  ["Bhai ke liye care", "1/0 (undefined)", 100, "glitch"],
  ["Patience", "12%", 12]
];

// Bhai ka letter (yahan edit kar; nayi line = Enter)
const LETTER = `Hey, my little princess! 👸🏻💜

Happy 19th Birthday, Suggu! 🎂🎉❤️

I still can't believe you're 19 now! 😭😂 Pata hi nahi chala kab tu itni badi ho gayi.

Waise jokes apart, life mein chahe kitne bhi changes aayein, I hope you never lose that beautiful smile of yours. Hamesha apne dreams ke liye stand lena, khud pe believe karna, aur kabhi bhi apni worth kisi aur se compare mat karna. You deserve all the beautiful things life has to offer. 🫶🏻✨

Aur haan, humari ladai hoti rahegi, main tujhe tease karta rahunga, aur tu mujhe irritate karti rehna. 😂🤌🏻 But no matter how much we fight, you'll always have a special place in my heart that nobody can ever take. 💗

May this new chapter bring you endless happiness, exciting memories, new achievements, and plenty of reasons to laugh. Aaj ke din saari tension side mein rakh aur apna birthday full enjoy kar 🥳🎊

Janmdin ki dher saari shubhkamnayein, meri Suggu! Hamesha khush reh, healthy reh, aur apni life ko apne tareeke se jee. ❤️🧿

Lots of love, hugs, and unlimited teasing from your forever annoying but always loving big brother. 🤗💖

Always your bhai,
# Beldaara 😅😅 ❤️`;

// Music: har stage ka apna gaana. Files assets/music/ mein rakh. Jo file nahi milegi, pichla gaana chalta rahega.
const MUSIC = {
  gate:   "assets/music/01-unlock.mp3",     // password unlock hote hi: dreamy / space ambient
  hero:   "assets/music/02-galaxy.mp3",     // Enter ke baad, level + photos: soft nostalgic piano
  cards:  "assets/music/03-playful.mp3",    // cards aur stats: light, playful, upbeat
  letter: "assets/music/04-emotional.mp3",  // letter: soft emotional instrumental
  cake:   "assets/music/05-birthday.mp3"    // cake: happy birthday / celebration
};

// Cake ke messages (Celebrate dabane pe 3 step mein aate hain)
const CAKE = {
  joke: "It’s a special cow dung cake for you 😅😅🐄",
  wish: "Wishing you a great career ahead ✨",
  final: "Happy Birthday, meri Suggu! 🎂💜 Chahe tu kitni bhi badi ho jaaye, mere liye hamesha meri little princess rahegi. Always your bhai. ❤️"
};
/* ============== EDIT ENDS HERE ============== */
