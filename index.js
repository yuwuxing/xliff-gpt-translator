const cheerio = require('cheerio');
const fs = require('fs');
const config = require('./config.json');

const checkAndCreateDir = require('./utils/checkAndCreateDir');
const executePromisesInSequence = require('./utils/executePromisesInSequence');
const translate = require('./utils/translate');
const getLanguageName = require('./utils/getLanguageName');

const inputDir = config.inputDir || './xliff';
const outputDir = config.outputDir || './output';
const finishedDir = config.finishedDir || './finished';

const rateLimit = config.rateLimit || 3;
const intervalTime = (60 / rateLimit) * 1000;
const nodesPerRequest = config.nodesPerRequest || 5;

checkAndCreateDir(inputDir);
checkAndCreateDir(outputDir);
checkAndCreateDir(finishedDir);

const files = fs.readdirSync(inputDir).filter(file => file.endsWith('.xliff'));


// Create translation tasks for each file
const translationTasks = files.map(file => {
    return async () => {
        console.log(`Starting to translate file ${file}`);
        const filePath = `${inputDir}/${file}`;
        const outPath = `${outputDir}/${file}`;

        const xmlData = fs.readFileSync(filePath, 'utf8');
        
        const $ = cheerio.load(xmlData, { 
            xmlMode: true,
            decodeEntities: false
        });
        const sourceLang = getLanguageName($('file').attr('source-language'));
        const targetLang = getLanguageName($('file').attr('target-language'));
        console.log(`Source language: ${sourceLang}, Target language: ${targetLang}`);

        // Split $("trans-unit") into subarrays of size nodesPerRequest
        const chunkedNodes = [];
        $("trans-unit").each(function (index) {
            if (index % nodesPerRequest === 0) {
                chunkedNodes.push([]);
            }
            chunkedNodes[chunkedNodes.length - 1].push(this);
        });

        // Define an array to store translation operation Promises
        const translationPromises = [];
        console.log(`There are ${$("trans-unit").length} items to translate`);

        chunkedNodes.forEach((nodes, index) => {
            translationPromises.push(() => {
                // Combine node content, using a special symbol "<|->" as a separator
                const combinedText = nodes
                    .map((node) => {
                        const text = $(node).find('source').html();
                        const isCdata = text.startsWith('<![CDATA[') && text.endsWith(']]>');
                        const textToTranslate = isCdata ? text.slice(9, -3) : text;
                        return textToTranslate;
                    })
                    .join('<|->');

                return translate(combinedText, sourceLang, targetLang)
                    .then((translatedText) => {
                        // Fill in the corresponding positions after splitting in the same way
                        const translatedTexts = translatedText.split('<|->');
                        nodes.forEach((node, i) => {
                            const text = $(node).find('source').html();
                            const isCdata = text.startsWith('<![CDATA[') && text.endsWith(']]>');
                            const targetlatedText = isCdata
                                ? `<![CDATA[${translatedTexts[i]}]]>`
                                : `${translatedTexts[i]}`;
                            var target = $(node).find('target');
                            target.html(targetlatedText);
                        });
                        fs.writeFileSync(outPath, $.xml());
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            });
        });

        // Wait for all translation operations to complete
        await executePromisesInSequence(translationPromises, intervalTime).then(() => {
            // Write the translated result to the file
            fs.writeFileSync(outPath, $.xml());
            // Move the original file to the "finished" folder
            fs.renameSync(filePath, `${finishedDir}/${file}`);
        }).catch((error) => {
            console.error(error);
        });
    };
});

(async () => {
    for (const task of translationTasks) {
        await task();
    }
})();