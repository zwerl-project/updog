import { Bot } from 'mineflayer';

declare module 'mineflayer' {
    interface Bot {
        noChatReports: {
            enabled: boolean;
            enable: () => void;
            disable: () => void;
        };
    }
}

export function plugin(bot: Bot) {
    bot.noChatReports = {
        enabled: false,
        enable() { this.enabled = false; },
        disable() { this.enabled = true; }
    };

    bot.on('message', (message) => {
        if (bot.noChatReports.enabled) return;
        const chat = message.toString();

        bot.emit('chat', 'unknown', chat, null, message, null);
    });
}