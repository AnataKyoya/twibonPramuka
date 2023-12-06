function download(url, fullName) {
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.style.display = 'none';
    anchor.setAttribute('download', fullName);
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
}

function screenshot(imgNode, format = 'png', quality = 0.97, callback) {
    const canvas = document.createElement('canvas');
    canvas.width = imgNode.width;
    canvas.height = imgNode.height;

    const context = canvas.getContext('2d');

    // Tambahkan properti filter jika diperlukan
    const filterValue = getComputedStyle(imgNode).filter;
    context.filter = filterValue;

    imgNode.setAttribute('crossOrigin', 'anonymous');

    context.drawImage(imgNode, 0, 0, canvas.width, canvas.height);
    const url = canvas.toDataURL(`image/${format}`, quality);

    if (callback && typeof callback === 'function') {
        callback(url);
    }

    return {
        url,
        download: (name = 'image') => {
            download(url, `${name}.${format}`);
        }
    };
}

// Ganti selektor dengan ID atau kelas yang lebih spesifik
let node = document.getElementById("zoomed-image");

if (node) {
    screenshot(node, 'png', 0.97, (url) => {
        // Lakukan sesuatu dengan URL jika diperlukan
        console.log(url);
    }).download();
} else {
    console.error("Elemen tidak ditemukan.");
}