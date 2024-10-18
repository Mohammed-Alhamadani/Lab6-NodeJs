const fs = require('fs').promises;
const path = require('path');
const { JSDOM } = require('jsdom');

async function loadLibraryBranches() {
    const filePath = path.join(__dirname, 'public', 'library-data.kml');
    const xmlData = await fs.readFile(filePath, 'utf-8');
    const dom = new JSDOM(xmlData, { contentType: 'text/xml' });
    const doc = dom.window.document;

    const branches = Array.from(doc.querySelectorAll('Placemark')).map(
        (placemark) => {
            const name = placemark.querySelector('name').textContent;
            const description =
                placemark.querySelector('description').textContent;
            const address = placemark.querySelector('address').textContent;
            const phone = placemark.querySelector('phoneNumber').textContent;
            const id = placemark.getAttribute('id');
            return { id, name, description, address, phone };
        }
    );

    return branches;
}

module.exports = { loadLibraryBranches };
