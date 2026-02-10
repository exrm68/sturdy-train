# 🎬 CINEFLIX - Mini App (Without Admin Panel)

## 📱 এই Version এ কি আছে:

### ✅ Features:
- 🎬 **Beautiful UI** - আগের original design ঠিক আছে
- 📺 **Movie Browsing** - Category wise movies
- 🔍 **Search** - সব movies search করা যাবে
- ⭐ **Favorites** - Watchlist save করা যাবে
- 📖 **Story Circles** - Instagram style stories
- 🎯 **Banner** - Featured movies auto-rotate
- 🎭 **Movie Details** - Full details with watch/download
- 📱 **Telegram Integration** - Bot এর সাথে connect
- 🔔 **Notice Bar** - Important announcements

### ❌ যা নেই:
- 🚫 **Admin Panel** - Remove করা হয়েছে (আপনি পরে add করবেন)

---

## 🚀 Setup করুন:

### **Step 1: Firebase Configuration**

`firebase.ts` ফাইল খুলুন এবং আপনার Firebase config দিন:

```typescript
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
```

### **Step 2: Bot Configuration**

`constants.ts` ফাইল খুলুন এবং আপনার bot username দিন:

```typescript
export const BOT_USERNAME = 'YourMovieBotUsername'; // @ ছাড়া শুধু username
```

### **Step 3: Install Dependencies**

```bash
npm install
```

### **Step 4: Run Development Server**

```bash
npm run dev
```

### **Step 5: Build for Production**

```bash
npm run build
```

---

## 📊 Firebase Firestore Structure:

আপনার Firestore এ এই collections থাকতে হবে:

### **1. movies Collection:**
```javascript
{
  id: "auto-generated",
  title: "Avengers Endgame",
  thumbnail: "https://image-url.jpg",
  category: "Exclusive",
  telegramCode: "BAACAgQAAx0...",
  downloadCode: "DOWNLOAD_CODE", // Optional
  downloadLink: "https://drive.google.com/...", // Optional
  rating: 9.5,
  views: "1.2M",
  year: "2024",
  quality: "4K HDR",
  description: "Movie description...",
  isPremium: false,
  episodes: [], // For series
  createdAt: serverTimestamp()
}
```

### **2. settings Collection:**
একটি document "config" নামে:
```javascript
{
  botUsername: "YourMovieBot",
  channelLink: "https://t.me/yourchannel",
  noticeText: "Welcome to CINEFLIX! 🎬",
  categories: ["Exclusive", "Korean Drama", "Series"]
}
```

---

## 🎯 Firebase Security Rules:

Firestore Rules এ এটা দিন (শুধু read access):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Movies - Anyone can read
    match /movies/{movieId} {
      allow read: if true;
      allow write: if false; // Admin panel দিয়ে করবেন
    }
    
    // Settings - Anyone can read
    match /settings/{settingId} {
      allow read: if true;
      allow write: if false;
    }
  }
}
```

---

## 📱 Telegram Bot Setup:

### **1. Create Bot:**
- @BotFather এ যান
- `/newbot` command দিন
- Bot name ও username দিন
- Token save করুন

### **2. Bot Commands:**
```
start - Start the bot
help - Get help
```

### **3. Bot Code (Python Example):**
```python
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import Application, CommandHandler, ContextTypes

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    # Extract code from deep link
    code = context.args[0] if context.args else None
    
    if code:
        # Send video file based on code
        await update.message.reply_video(
            video=code,  # Telegram file_id
            caption="Enjoy your movie! 🎬"
        )
    else:
        # Show mini app button
        keyboard = [[
            InlineKeyboardButton(
                "🎬 Open CINEFLIX", 
                web_app={"url": "https://your-mini-app-url.com"}
            )
        ]]
        await update.message.reply_text(
            "Welcome to CINEFLIX! 🎬",
            reply_markup=InlineKeyboardMarkup(keyboard)
        )

app = Application.builder().token("YOUR_BOT_TOKEN").build()
app.add_handler(CommandHandler("start", start))
app.run_polling()
```

---

## 📂 File Structure:

```
clean-mini-app/
├── App.tsx                  ← Main app (No admin)
├── components/
│   ├── Banner.tsx
│   ├── BottomNav.tsx
│   ├── Explore.tsx
│   ├── MovieCard.tsx
│   ├── MovieDetails.tsx
│   ├── MovieTile.tsx
│   ├── NoticeBar.tsx
│   ├── Sidebar.tsx
│   ├── SplashScreen.tsx
│   ├── StoryCircle.tsx
│   ├── StoryViewer.tsx
│   ├── TrendingRow.tsx
│   └── Watchlist.tsx
├── types.ts
├── constants.ts
├── firebase.ts             ← Configure this!
├── index.tsx
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 🎨 UI Features:

1. **Home Page:**
   - Notice Bar (যদি থাকে)
   - Auto-rotating Banner
   - Story Circles
   - Trending Row
   - Category Tabs
   - Movies Grid

2. **Search Page:**
   - Search box
   - Category filter
   - All movies

3. **Favorites Page:**
   - Saved movies
   - Quick access

4. **Movie Details:**
   - Full screen modal
   - Movie info
   - Watch button → Telegram bot
   - Download button (if available)
   - Episodes (for series)

---

## 💡 How to Add Content:

যেহেতু Admin Panel নেই, আপনাকে সরাসরি Firebase Console থেকে data add করতে হবে:

### **Method 1: Firebase Console**
1. Firebase Console এ যান
2. Firestore Database খুলুন
3. "movies" collection এ যান
4. "Add Document" ক্লিক করুন
5. Manual data entry করুন

### **Method 2: Script দিয়ে**
একটি Node.js script তৈরি করুন:

```javascript
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function addMovie() {
  await db.collection('movies').add({
    title: "Avengers Endgame",
    thumbnail: "https://image-url.jpg",
    category: "Exclusive",
    telegramCode: "BAACAgQAAx0...",
    rating: 9.5,
    views: "1.2M",
    year: "2024",
    quality: "4K HDR",
    description: "The epic conclusion...",
    isPremium: false,
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  });
  
  console.log("Movie added!");
}

addMovie();
```

---

## 🔧 Troubleshooting:

### **Movies দেখাচ্ছে না?**
- Firebase config ঠিক আছে কিনা চেক করুন
- Firestore rules read: true আছে কিনা দেখুন
- Browser console এ error আছে কিনা দেখুন

### **Telegram Bot কাজ করছে না?**
- Bot token ঠিক আছে কিনা চেক করুন
- Deep link format: `https://t.me/YourBot?start=FILE_ID`

### **Images লোড হচ্ছে না?**
- Image URL সঠিক আছে কিনা চেক করুন
- HTTPS URL ব্যবহার করুন

---

## 📱 Deploy Options:

### **1. Vercel:**
```bash
npm install -g vercel
vercel
```

### **2. Netlify:**
```bash
npm install -g netlify-cli
netlify deploy
```

### **3. GitHub Pages:**
```bash
npm run build
# dist folder upload করুন
```

### **4. Telegram Mini App:**
- @BotFather এ `/newapp` command
- Web App URL দিন
- Deploy করুন

---

## ✨ Next Steps:

1. ✅ Firebase configure করুন
2. ✅ Bot setup করুন
3. ✅ Firestore এ movies add করুন
4. ✅ Test করুন locally
5. ✅ Deploy করুন
6. 🔜 Admin Panel add করুন (পরে)

---

## 📞 Support:

যদি কোন সমস্যা হয়:
1. Browser Console (F12) দেখুন
2. Firebase Console এ logs চেক করুন
3. Network tab দেখুন

---

**সব কিছু আগের মত আছে, শুধু Admin Panel নেই! 🎬**

Original UI intact, clean code, ready to deploy!
