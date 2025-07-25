const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('🤖 ربات واتساپ آماده است!');
});

client.on('message', msg => {
    if (msg.body.toLowerCase() === 'سلام') {
        msg.reply('سلام دوست عزیز 👋');
    }
});

client.initialize();
