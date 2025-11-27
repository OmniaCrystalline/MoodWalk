# Інструкції для завантаження на GitHub

## Крок 1: Завантаження коду на GitHub

Всі зміни вже закомічені. Тепер потрібно завантажити на GitHub:

### Варіант 1: Через командний рядок (якщо налаштована автентифікація)

```bash
git push -u origin main
```

### Варіант 2: Через GitHub Desktop або інший GUI клієнт

1. Відкрийте GitHub Desktop (або інший клієнт)
2. Відкрийте репозиторій `/Users/apple/Downloads/MoodRouteGuide`
3. Натисніть "Push origin" або "Publish branch"

### Варіант 3: Через веб-інтерфейс GitHub

Якщо репозиторій порожній на GitHub:

1. Перейдіть на https://github.com/OmniaCrystalline/MoodWalk
2. Натисніть "uploading an existing file"
3. Або використайте команди з терміналу:

```bash
# Якщо потрібна автентифікація через токен:
git remote set-url origin https://YOUR_TOKEN@github.com/OmniaCrystalline/MoodWalk.git
git push -u origin main
```

## Крок 2: Деплой на Render.com

Після завантаження на GitHub:

1. Перейдіть на [render.com](https://render.com)
2. Створіть новий Web Service
3. Підключіть репозиторій `OmniaCrystalline/MoodWalk`
4. Налаштуйте:
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
5. Додайте змінну оточення: `OPENROUTER_API_KEY`
6. Натисніть "Create Web Service"

## Поточний стан

✅ Всі файли закомічені
✅ Remote налаштовано: `https://github.com/OmniaCrystalline/MoodWalk.git`
✅ Готово до push

Залишилось тільки завантажити на GitHub!

