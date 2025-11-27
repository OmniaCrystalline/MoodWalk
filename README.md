# MoodWalk - Personalized Walking Route Generator

AI-powered walking route generator that creates personalized routes based on your mood and emotional state.

## Features

- 🧠 AI-powered route generation using OpenRouter
- 🗺️ Interactive map with waypoints
- 📍 Address autocomplete with Nominatim
- 🎨 Beautiful, responsive UI
- 🌙 Dark mode support
- 📱 Mobile-friendly design

## Tech Stack

- **Frontend**: React, TypeScript, Vite, Tailwind CSS
- **Backend**: Express, Node.js
- **AI**: OpenRouter API
- **Maps**: Leaflet, OpenStreetMap

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```
OPENROUTER_API_KEY=your_api_key_here
PORT=5000
```

3. Run development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

5. Start production server:
```bash
npm start
```

## Deployment

### Render.com (Рекомендовано) ✅

**Чому Render.com:**
- ✅ Безкоштовний план для початку
- ✅ Підтримка Node.js та Express
- ✅ Автоматичний деплой з GitHub
- ✅ Просте налаштування

**Кроки деплою:**

1. **Підготуйте репозиторій:**
   ```bash
   git push -u origin main
   ```

2. **Створіть акаунт на Render.com:**
   - Перейдіть на [render.com](https://render.com)
   - Зареєструйтеся через GitHub

3. **Створіть новий Web Service:**
   - Натисніть "New +" → "Web Service"
   - Підключіть ваш GitHub репозиторій
   - Виберіть репозиторій `MoodWalk`

4. **Налаштуйте сервіс:**
   - **Name**: `moodwalk` (або будь-яка назва)
   - **Environment**: `Node`
   - **Region**: `Oregon` (або найближчий до вас)
   - **Branch**: `main`
   - **Root Directory**: `.` (залиште порожнім)
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: `Free` (для початку)

5. **Додайте змінні оточення:**
   - Натисніть "Environment" в налаштуваннях сервісу
   - Додайте:
     - `OPENROUTER_API_KEY` = ваш API ключ
     - `NODE_ENV` = `production`
   - `PORT` встановлюється автоматично Render

6. **Деплой:**
   - Натисніть "Create Web Service"
   - Render автоматично почне білд та деплой
   - Зачекайте 5-10 хвилин
   - Ваш сайт буде доступний за адресою: `https://moodwalk.onrender.com`

**Альтернатива: Використання render.yaml:**
- Якщо ви додали `render.yaml` до репозиторію, Render автоматично використає ці налаштування
- Просто створіть "New Blueprint Instance" замість Web Service

### Netlify ❌ (Не рекомендовано)

**Чому НЕ Netlify:**
- ❌ Netlify призначений для статичних сайтів та serverless функцій
- ❌ Ваш проект потребує постійно працюючого Express сервера
- ❌ Netlify Functions мають обмеження по часу виконання (10 секунд)
- ❌ Складніше налаштувати для full-stack додатків

### Railway (Альтернатива)

1. Перейдіть на [railway.app](https://railway.app)
2. Створіть новий проект з GitHub
3. Додайте змінні оточення в dashboard
4. Railway автоматично визначить Node.js проект

## Environment Variables

- `OPENROUTER_API_KEY` - Required. Get your key from [OpenRouter](https://openrouter.ai/keys)
- `PORT` - Optional. Defaults to 5000 (Render sets this automatically)
- `NODE_ENV` - Set to `production` for production builds

## License

MIT

