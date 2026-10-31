# My Little Suggu 💜

## Local test (VS Code)
1. VS Code mein is folder ko kholo, `index.html` pe click karo.
2. Neeche right mein **Go Live** daba do (Live Server extension chahiye).
3. Chrome mein `http://127.0.0.1:5500` khulega.

## Kya kahan edit karna hai (sab `content.js` mein)
- **Password ka sawaal aur jawab:** `CONFIG.question`, `CONFIG.answers`
- **Photo captions:** `CAPTIONS` (1 = photo1.jpg, 2 = photo2.jpg ...)
- **Photo ki sankhya:** `CONFIG.photoCount`
- **18 cards ke messages + secret card:** `CARDS`, `SECRET`
- **Stats:** `STATS`
- **Letter:** `LETTER`
- **Music:** 5 gaane `assets/music/` mein: 01-unlock, 02-galaxy, 03-playful, 04-emotional, 05-birthday (.mp3). Naam `content.js` ke `MUSIC` mein badal sakta hai. Jo file na ho woh skip ho jaati hai.

## Photos
`assets/photos/photo1.jpg`, `photo2.jpg` ... Koi photo missing ho toh site usko chhod deti hai, crash nahi hoti.

## Publish (GitHub Pages)
GitHub pe naya repo banao (naam guess karne layak na ho, Suggu ka poora naam mat rakho), files upload/push karo, phir **Settings → Pages → Deploy from a branch → main / (root)**. Link: `https://USERNAME.github.io/REPO-NAME/`.

Dhyan: public repo ki photos link wale koi bhi dekh sakte hain. Password gate sirf ek fun lock hai, asli security nahi.
