const { Telegraf } = require('telegraf');
const { array } = require('./data');
const bot = new Telegraf('API TOKEN');

const longReply = (message, ctx)=>{
    if(message == '/sb 2:10' || message == '/rb 2:10'){
       return ctx.replyWithHTML('<i>This commentary is too long to be displayed. Sorry for the inconvenience</i>')
    }
}

const checkAuthor = (array, author)=>{
    const translationshsshhs = array.filter(item=>{
        if(item.author_name == author){
            return item;
        }
    });
    return translationshsshhs[0].description;
}

bot.start((ctx)=>{
    try {
        console.log(ctx.from)
            const welcomeText = `𝗝𝗔𝗜 𝗦𝗛𝗥𝗘𝗘 𝗞𝗥𝗜𝗦𝗛𝗡 🙏🕉 

Namaskaram <b>${ctx.from.first_name}</b> (<code>${ctx.from.id}</code>)

I am here to present the Shlok (श्लोक) of Srimad Bhagwad Geeta (श्रीमद्भगवद्गीता).

Affiliated with @CrackCodes 🇮🇳

Use /help for basic usage commands and other Info.

Status and Updates at: @ShrimadBhagwadGeeta_Status.`
            ctx.replyWithHTML(welcomeText);  
    } catch (error) {
        return error;
    }
});

const validateChapter = (message, ctx)=>{
    let format = message.text.slice(4).split(':');
    if(!format){format = message.text.slice(4).split('.');}
    const [chapter, verse] = format
    const chapterCondition = chapter > 0 && chapter <= 18
    const chapterArray = array.filter(element=>{
        if(element.chapter_number == chapter){
            return element
        }
    });
    const verseCondition = verse > 0 && verse <= chapterArray.length
    if(!chapterCondition || !verseCondition){
        return ctx.reply('Kindly verify the Adhyāy (अध्याय) and Shlok Sankhya (श्लोक संख्या).')
    }
    else if(!chapterCondition && !verseCondition){
        return ctx.reply('Kindly verify the Adhyāy (अध्याय) and Shlok Sankhya (श्लोक संख्या).')
    }
    else{
        // give the result
        const returnthing = array.filter((item)=>{
        if(item.chapter_number == chapter && item.verse_number == verse){
            return item;
        }
        })
        const formattedVerse = `𝗦𝗥𝗜𝗠𝗔𝗗 𝗕𝗛𝗔𝗚𝗔𝗪𝗔𝗗 𝗚𝗜𝗧𝗔 🕉

<b>अध्याय: ${returnthing[0].chapter_number} श्लोक: ${returnthing[0].verse_number}</b>

🔰 <b>VERSE / श्लोक</b> 🔰

<b>${returnthing[0].text}</b>

🔺 <b>PRONUNCIATION / उच्चारण</b> 🔺

${returnthing[0].transliteration}

🔺 <b>WORD MEANINGS / शब्द अर्थ</b> 🔺

${returnthing[0].word_meanings}

🔺 <b>HINDI MEANING / हिंदी अर्थ</b> 🔺

${checkAuthor(returnthing[0].translations, 'Swami Tejomayananda')}

🔺<b>ENGLISH MEANING / अंग्रेजी अर्थ</b> 🔺

${checkAuthor(returnthing[0].translations, 'Swami Adidevananda')}`
        ctx.replyWithHTML(formattedVerse)
    }
}

bot.command('get', (ctx)=>{
    try {
        validateChapter(ctx.message, ctx)
    } catch (error) {
        return error
    }
});

bot.command('help', (ctx)=>{
    try {
        ctx.replyWithHTML(`Use <code>/get</code> chapter number:verse number
eg.
🔸 <code>/get 1:1</code> to know the first Shlok (श्लोक) of first Chapter (अध्याय) of Srimad Bhagwad Geeta (श्रीमद्भगवद्गीता).

🔸 <code>/sb</code> chapter:verse for Shankarāchāry Bhāshy (शंकराचार्य भाष्य)

🔸 <code>/rb</code> chapter:verse for Rāmānujāchāry Bhāshy (रामानुजाचार्य भाष्य)
`)
    } catch (error) {
        return error
    }
});

bot.command('info', (ctx)=>{
    try {
        console.log(ctx)
            const infoText = 
                `<b>Name</b>: ${ctx.message.from.first_name} 
<b>User ID</b>: <code>${ctx.message.from.id}</code>`
            ctx.replyWithHTML(infoText)
    } catch (error) {
        return error
    }
})

bot.command('sb', (ctx)=>{
    try {
        if(ctx.message.text == '/sb 2:10' || ctx.message.text == '/rb 2:10'){
               return ctx.replyWithHTML('<i>This commentary is too long to be displayed. Sorry for the inconvenience</i>')
            }
            else{
                let format = ctx.message.text.slice(3).split(':');
                    if(!format){format = message.text.slice(4).split('.');}
                    const [chapter, verse] = format
                    const chapterCondition = chapter > 0 && chapter <= 18
                    const chapterArray = array.filter(element=>{
                        if(element.chapter_number == chapter){
                            return element
                        }
                    });
                    const verseCondition = verse > 0 && verse <= chapterArray.length
                    if(!chapterCondition || !verseCondition){
                        return ctx.reply('Kindly verify the Adhyāy (अध्याय) and Shlok Sankhya (श्लोक संख्या).')
                    }
                    else if(!chapterCondition && !verseCondition){
                        return ctx.reply('Kindly verify the Adhyāy (अध्याय) and Shlok Sankhya (श्लोक संख्या).')
                    }
                    else{
                        // give the result
                        const returnthing = array.filter((item)=>{
                        if(item.chapter_number == chapter && item.verse_number == verse){
                            return item;
                        }
                        })
                        const returnComment = `𝗦𝗥𝗜𝗠𝗔𝗗 𝗕𝗛𝗔𝗚𝗔𝗪𝗔𝗗 𝗚𝗜𝗧𝗔 🕉

<b>अध्याय: ${returnthing[0].chapter_number} श्लोक: ${returnthing[0].verse_number}</b>

🔰 <b>VERSE / श्लोक</b> 🔰

<b>${returnthing[0].text}</b>

🔺<b>SHANKĀRA BHĀSHYA / शंकराचार्य भाष्य</b> 🔺

${checkAuthor(returnthing[0].commentaries, 'Sri Shankaracharya')}`
                        ctx.replyWithHTML(returnComment)
                    }
            }
    } catch (error) {
        return error
    }
});

bot.command('rb', (ctx)=>{
    try {
        longReply(ctx.message.text, ctx)
            let format = ctx.message.text.slice(3).split(':');
            if(!format){format = message.text.slice(4).split('.');}
            const [chapter, verse] = format
            const chapterCondition = chapter > 0 && chapter <= 18
            const chapterArray = array.filter(element=>{
                if(element.chapter_number == chapter){
                    return element
                }
            });
            const verseCondition = verse > 0 && verse <= chapterArray.length
            if(!chapterCondition || !verseCondition){
                return ctx.reply('Kindly verify the Adhyāy (अध्याय) and Shlok Sankhya (श्लोक संख्या).')
            }
            else if(!chapterCondition && !verseCondition){
                return ctx.reply('Kindly verify the Adhyāy (अध्याय) and Shlok Sankhya (श्लोक संख्या).')
            }
            else{
                // give the result
                const returnthing = array.filter((item)=>{
                if(item.chapter_number == chapter && item.verse_number == verse){
                    return item;
                }
                })
                const returnComment = `𝗦𝗥𝗜𝗠𝗔𝗗 𝗕𝗛𝗔𝗚𝗔𝗪𝗔𝗗 𝗚𝗜𝗧𝗔 🕉

<b>अध्याय: ${returnthing[0].chapter_number} श्लोक: ${returnthing[0].verse_number}</b>

🔰 <b>VERSE / श्लोक</b> 🔰

<b>${returnthing[0].text}</b>

🔺<b>RĀMĀNUJĀCHĀRYA BHĀSHYA / रामानुजाचार्य भाष्य</b> 🔺

${checkAuthor(returnthing[0].commentaries, 'Sri Ramanujacharya')}`
                ctx.replyWithHTML(returnComment)
            }
    } catch (error) {
        return error
    }
});

bot.launch()

// Console log
console.log('Bot is running');

// Stop the bot
process.once('SIGINT', ()=> bot.stop('SIGINT'));
process.once('SIGTERM', ()=> bot.stop('SIGTERM'));