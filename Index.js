const { Telegraf } = require('telegraf');
const fs = require('fs');
const DATA_FILE = './rekap.json';

const token = process.env.BOT_TOKEN;
const bot = new Telegraf(token);

function bacaData() {
  if (!fs.existsSync(DATA_FILE)) return { data: [] };
  return JSON.parse(fs.readFileSync(DATA_FILE));
}
function tulisData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

bot.start((ctx) => ctx.reply('Halo! Kirim format: Nama | Alamat | Catatan'));

bot.on('text', (ctx) => {
  const text = ctx.message.text;
  if (!text.includes('|')) return ctx.reply('Format salah. Contoh: Budi | Cirebon | Lunas');
  
  const [nama, alamat, catatan] = text.split('|').map(s => s.trim());
  const data = bacaData();
  data.data.push({ nama, alamat, catatan, tanggal: new Date().toLocaleString('id-ID') });
  tulisData(data);
  ctx.reply(`Tersimpan: ${nama}`);
});

bot.launch();
