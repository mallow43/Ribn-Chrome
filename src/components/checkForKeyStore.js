/* global chrome */
function chromeStore() {
    return new Promise((resolve) => {
        chrome.storage.sync.get('keyStore', (result) => {
            resolve(result);
        });
    });
}
async function getStorageData() {
    var x = await chromeStore();
    return x;
}

export default getStorageData;
