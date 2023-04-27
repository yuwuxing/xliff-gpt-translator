/**
 * The function translates text from a source language to a target language while keeping HTML code
 * intact and maintaining original website links.
 * @param text - The text that needs to be translated from the source language to the target language.
 * @param sourceLang - The source language of the text to be translated.
 * @param targetLang - The targetLang parameter is the language that the text will be translated to.
 * @returns The `translate` function is returning the translated text as a string.
 */
const axiosInstance = require('../axiosInstance');
const config = require('../config.json');

async function translate(text, sourceLang, targetLang) {
    const messages = [
        { role: 'system', content: `Translate the following text from ${sourceLang} to ${targetLang}, keeping any HTML code intact and "<|->". If the text contains website links, please maintain the original links without translating them.` },
        { role: 'user', content: text },
    ];

    try {
        const response = await axiosInstance.post('', {
            messages,
            max_tokens: 2000,
            temperature: 0.8,
            model: config.openai_model,
        });

        const translatedText = response.data.choices[0].message.content;
        console.log(`"${text}" => "${translatedText}"`);

        return translatedText;
    } catch (error) {
        console.error(`Error translating "${text}":`, error);
        throw error;
    }
}

module.exports = translate;
