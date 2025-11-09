# 💍 Marriage Proposal Website - Setup Guide

## 🎬 Project Overview

A beautiful, romantic marriage proposal website for **Swati Shriya Mishra** with:
- 4 interactive screens (Welcome → Love Story → Proposal → Celebration)
- Romantic animations (heartbeat, floating hearts, falling rose petals)
- Confetti celebration
- Email notification when she says YES!
- Premium pink theme with Playfair Display & Poppins fonts

## 🚀 Quick Start

### 1. Install Dependencies

All dependencies are already installed! But if you need to reinstall:

```bash
npm install
```

### 2. Configure Email Settings

**IMPORTANT:** You need to set up email configuration for the proposal notification to work.

1. Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and fill in your email details:

#### For Gmail Users (Recommended):

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-16-char-app-password
BOYFRIEND_EMAIL=your-email@gmail.com
```

**How to get Gmail App Password:**
1. Go to https://myaccount.google.com/apppasswords
2. Sign in to your Google Account
3. Select "Mail" and your device
4. Click "Generate"
5. Copy the 16-character password (remove spaces)
6. Paste it in `SMTP_PASS`

#### For Other Email Providers:

**Outlook/Hotmail:**
```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_SECURE=false
```

**Yahoo:**
```env
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=587
SMTP_SECURE=false
```

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Test the Website

1. Click through all 4 screens
2. Test the proposal response
3. Fill out the form
4. Check if email is received

## 📱 User Experience Flow

### Screen 1: Welcome
- Heartbeat animation on heart icon ❤️
- Message: "Hi Swati Shriya Mishra ❤️ A surprise just for you..."
- Button: "Tap to Begin 💌"

### Screen 2: Love Story
- Romantic typewriter effect
- Beautiful Hindi + English love message
- Floating hearts animation
- Continue button appears after text completes

### Screen 3: Proposal
- Big glowing ring animation 💍
- "Will You Marry Me?" message
- Two YES buttons (both lead to acceptance!)
- Form appears after clicking YES:
  - Name (pre-filled)
  - Answer
  - Optional message
- Falling rose petals animation
- Confetti blast on YES click

### Screen 4: Celebration
- Massive confetti celebration
- Falling roses animation
- Heart frame with couple emoji
- "You just made my whole life complete ❤️"
- Replay button to start over

## 🎨 Design Features

### Colors
- Background: Soft Pink (#fff5f7)
- Primary: Rose Pink (#ff4f81)
- Accents: Light Pink (#ffe4e9)

### Fonts
- Headings: Playfair Display (serif, romantic)
- Body: Poppins (clean, modern)

### Animations
- ✅ Heartbeat animation
- ✅ Glow effect
- ✅ Floating hearts
- ✅ Falling rose petals
- ✅ Typewriter text effect
- ✅ Confetti explosion
- ✅ Smooth page transitions

## 📧 Email Notification

When Swati clicks YES and submits the form, you'll receive a beautiful HTML email with:
- Her name
- Her answer
- Her optional message
- Timestamp of acceptance
- Beautiful rose-themed design

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **Confetti:** react-confetti
- **Email:** NodeMailer
- **Language:** TypeScript

## 📁 Project Structure

```
propose/
├── app/
│   ├── api/
│   │   └── send-proposal/
│   │       └── route.ts          # Email API endpoint
│   ├── globals.css               # Custom animations & theme
│   ├── layout.tsx                # Root layout with fonts
│   └── page.tsx                  # Main proposal screens
├── .env.example                  # Environment variables template
├── .env.local                    # Your actual config (create this!)
└── SETUP.md                      # This file
```

## 🚨 Important Notes

1. **Email Configuration is Required:** The website will work without email setup, but you won't receive the notification.

2. **Test Before Sharing:** Make sure to test the entire flow and verify email delivery before sharing with Swati!

3. **Privacy:** Never commit `.env.local` to git. It contains sensitive credentials.

4. **Mobile Responsive:** The website is fully responsive and works beautifully on mobile devices.

## 🎯 Deployment (Optional)

### Deploy to Vercel (Recommended):

1. Push your code to GitHub (without .env.local!)
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables in Vercel dashboard:
   - SMTP_HOST
   - SMTP_PORT
   - SMTP_SECURE
   - SMTP_USER
   - SMTP_PASS
   - BOYFRIEND_EMAIL
5. Deploy!

### Custom Domain (Optional):
- You can add a custom domain like `marry-me-swati.com` in Vercel settings

## 💝 Customization

### Change the Love Message:
Edit the `fullText` variable in the `StoryScreen` component in `app/page.tsx`

### Change Colors:
Edit the CSS variables in `app/globals.css`

### Add Your Photo:
Replace the emoji in the celebration screen with an actual photo:
```tsx
<img src="/your-photo.jpg" alt="Us" className="w-64 h-64 rounded-full" />
```

## 🐛 Troubleshooting

### Email not sending?
- Check your `.env.local` file
- Verify App Password is correct (no spaces)
- Check console for error messages
- Try with a different email provider

### Animations not smooth?
- Clear browser cache
- Try a different browser
- Check if hardware acceleration is enabled

### Build errors?
```bash
rm -rf .next node_modules
npm install
npm run dev
```

## 📞 Support

If you encounter any issues, check:
1. Console logs in browser (F12)
2. Terminal output
3. Email provider settings

## 🎉 Good Luck!

May this proposal bring you both a lifetime of happiness! ❤️💍

---

**Made with ❤️ for Swati Shriya Mishra**

