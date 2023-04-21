const findJsonMimeType = function (header) {
  const { name, value } = header;
  return name && name.toLowerCase() === 'content-type' && value.includes('css');
};

const overrideJsonHeader = function (request) {
  return new Promise((resolve) => {
    const { responseHeaders } = request;
    if (responseHeaders.find(findJsonMimeType)) {
      const jsonHeader = {
        name: 'Content-Type', value: 'application/json'
      };
      responseHeaders.push(jsonHeader);
    }

    resolve({ responseHeaders });
  });
};

browser.webRequest.onHeadersReceived.addListener(overrideJsonHeader, {
  urls: ['<all_urls>']
}, ['blocking', 'responseHeaders']);

exports = { findJsonMimeType, overrideJsonHeader };
