/* global chrome */
function chromeStore() {
    return new Promise((resolve) => {
        chrome.storage.sync.get('keyStore', (result) => {
            console.log(result);
            resolve(result);
        });
    });
}
async function getStorageData() {
    var x = await chromeStore();
    console.log(await chromeStore());
    return x;
}

export default getStorageData;
