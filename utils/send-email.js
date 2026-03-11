const nodemailer = require("nodemailer")
const CustomErrorHandler = require("../error/custom-error.handler")

async function sendMessage(code, email) {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.GOOGLE_PASS
            }
        })

        await transporter.sendMail({
            subject: "Car Marketplace - Tasdiqlash kodi",
            from: process.env.EMAIL_USER,
            to: email,
            html: `
<!DOCTYPE html>
<html lang="uz">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Car Marketplace</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: Arial, Helvetica, sans-serif; background-color: #0f172a; color: #f8fafc; }
    header { display: flex; justify-content: space-between; align-items: center; padding: 20px 60px; background-color: #111827; }
    header h1 { font-size: 22px; letter-spacing: 2px; color: #6366f1; }
    .hero { text-align: center; padding: 80px 20px; background: linear-gradient(135deg, #1e293b, #0f172a); }
    .hero h2 { font-size: 36px; margin-bottom: 20px; }
    .hero p { color: #94a3b8; max-width: 600px; margin: auto; line-height: 26px; }
    .code-box { margin: 40px auto; width: fit-content; background-color: #1e293b; border-radius: 15px; padding: 30px 60px; text-align: center; }
    .code-box p { color: #94a3b8; margin-bottom: 15px; font-size: 16px; }
    .code-box h1 { font-size: 52px; letter-spacing: 12px; color: #6366f1; }
    .code-box small { color: #64748b; font-size: 13px; margin-top: 10px; display: block; }
    footer { text-align: center; padding: 30px; background-color: #111827; color: #64748b; font-size: 13px; margin-top: 60px; }
  </style>
</head>
<body>
  <header>
    <h1>CAR MARKETPLACE</h1>
  </header>
  <section class="hero">
    <h2>Tasdiqlash kodingiz</h2>
    <p>Hisobingizni tasdiqlash uchun quyidagi kodni kiriting.</p>
  </section>
  <div class="code-box">
    <p>Sizning kodingiz:</p>
    <h1>${code}</h1>
    <small>Kod 2 daqiqa davomida amal qiladi.</small>
  </div>
  <footer>
    &copy; 2025 Car Marketplace. Barcha huquqlar himoyalangan.
  </footer>
</body>
</html>
            `
        })
    } catch (error) {
        throw CustomErrorHandler.InternalServerError("Email yuborishda xato")
    }
}

module.exports = sendMessage