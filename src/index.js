require("dotenv").config();

const { Telegraf, Markup } = require("telegraf");

const { listar, login } = require("./services");

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) => ctx.reply("E ae carlão"));
bot.help((ctx) => ctx.reply("Send me a sticker"));

bot.command("adicionar", (ctx) => ctx.reply("Pra já"));
bot.command("listar", async (ctx) => {
  ctx.reply("Solicitando a lista de chamados. Aguarde...");
  try {
    await login();
    const data = await listar();

    ctx.replyWithMarkdownV2(`Foram encontrados ${data.length} chamado(s).`);

    data.forEach((f) => {
      ctx.replyWithMarkdownV2(f);
    });
  } catch (e) {
    ctx.replyWithMarkdownV2(e.toString());
  }
});
bot.command("finalizar", (ctx) => ctx.reply("Calma moço"));
bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
