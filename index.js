import makeWASocket, { useMultiFileAuthState } from "@whiskeysockets/baileys";
import { Boom } from "@hapi/boom";

const { state, saveCreds } = await useMultiFileAuthState("auth_info");

const sock = makeWASocket({
    auth: state,
    printQRInTerminal: true
});

sock.ev.on("creds.update", saveCreds);

sock.ev.on("messages.upsert", async ({ messages }) => {
    const msg = messages[0];
    if (!msg.message) return;

    const from = msg.key.remoteJid;
    const text = msg.message.conversation || msg.message.extendedTextMessage?.text;

    console.log("📩 پیام دریافت شد:", text);

    if (text === "سلام") {
        await sock.sendMessage(from, { text: "سلام! چطوری؟" });
    }
});

