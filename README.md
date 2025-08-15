# NieuwpoortRP — Luxe Website

Luxe, donkere stijl (zwart + goud) zonder blauw. Inclusief banner en meerdere pagina's:
- `index.html` (uitgebreide homepage)
- `about.html` (over ons)
- `vacatures.html` (3 formulieren: Pechhulp, Ambulance, Politie)
- `voertuigen.html`
- `contact.html`

## Banner
De hero gebruikt jouw banner GIF: `https://files.catbox.moe/lnyo69.gif`

## Discord webhooks
De formulieren posten JSON naar de opgegeven webhooks via `fetch`.
**Browsers blokkeren dit vaak door CORS.** Werkt het niet, gebruik dan de meegeleverde proxy:

```bash
cd server
npm init -y
npm i express node-fetch
node proxy.js
```

Verander in `vacatures.html` (of in je hosting) de form-handler zodat je naar je eigen server of serverless functie post.
De proxy luistert op `http://localhost:8787/hook/{pechhulp|ambulance|politie}` en forwardt naar Discord.

## Deploy
- Voor statisch hosten (bijv. Vercel/Netlify): upload de map.
- Voor serverless: maak een endpoint dat de JSON doorstuurt naar de Discord-webhook.
