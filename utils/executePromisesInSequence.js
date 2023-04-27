/**
 * This function executes an array of promises in sequence with a specified interval time between each
 * execution.
 * @param promises - An array of functions that return promises. These promises will be executed in
 * sequence.
 * @param intervalTime - The interval time is the time (in milliseconds) to wait between executing each
 * promise in the sequence. It is used to control the rate at which the promises are executed.
 */
const executePromisesInSequence = async (promises, intervalTime) => {
    for (let i = 0; i < promises.length; i++) {
        console.log(`Translating batch ${i + 1}.`);
        await promises[i]();
        await new Promise((resolve) => setTimeout(resolve, intervalTime));
    }
};

module.exports = executePromisesInSequence;
