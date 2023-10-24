import { Bot } from "mineflayer";

type ExpressionHandler = [RegExp, (client: Bot, message: string) => void]

export const expressions: ExpressionHandler[] = [
    [/^!help$/, handleHelp],
    [/^!sleep$/, handleSleep],
    [/^!fun-fact$/, handleFunFact],
    [/^!items$/, handleItems]
]

function handleHelp(client: Bot, message: string) {
    client.chat("Available commands: !help, !sleep, !fun-fact & !items");
}

function handleSleep(client: Bot, message: string) {
    client.end();
} 

function handleFunFact(client: Bot, message: string) {
    const facts = [
        "Bigman (Coarsadie) is what we could call \"puto\", in Spanish!",
        "The best way to get a girlfriend is to be a simp!",
        "Hunor's kinda cute ngl",
        "Ur gay",
        "Headphones can increase the bacteria in your ears",
        "Coarsadie has 0 bitches to date",
        "JayK is a milf",
        "I am GOD !!!!!"
    ];

    const randomFact = facts[Math.floor(Math.random() * facts.length)];
    client.chat(`Fun Fact: ${randomFact}`);
}

function handleItems(client: Bot, message: string) {
    const items =  client.inventory.items();

    client.chat(`I currently have ${items.length} items!`)
    for (const item of items) {
        client.chat(`${item.name} (id: ${item.type}) -> ${item.count}`);
    }
}