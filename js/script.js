// URL dari data JSON
let urldata = './dispatcher/data.json';

// mengakses DOM
let direktori = document.querySelector("#direktori");

// Fungsi mengambil data JSON dari server
function getJSON(url) {
    fetch(url)
        .then((resp) => resp.json()) // Mengubah text json jadi obyek (pada javascript)
        .then(function(data) {
            buatObyek(data, direktori); // membuat obyek
        })
        .catch(function(error) {
            console.log(JSON.stringify(error));
        });
}

// Fungsi membuat obyek informasi kupu-kupu
function buatObyek(kupukupu, dir) {
    for (let i = 0; i < kupukupu.length; i++) {
        let kupu = `
        <div class="kupu">
                                <ul>
                                    <li>
                                        <ul class="gambarkupu">
                                            <li>
                                            ${for (const gbr of gambar) {`<img src="${gbr}" alt="">`}}
                                                </li >
                                        </ul >
                                    </li >
                                    <li>Nama Lokal: <strong>${nama_lokal}</strong></li>
                                    <li>Nama Latin: <strong>${nama_latin}</strong></li>
                                    <li>Kecepatan Terbang: <strong>${kecepatan_terbang}</strong></li>
                                    <li>Ukuran Sayap: <strong>${ukuran_sayap}</strong></li>
                                    <li>warna: <strong>${warna}</strong></li>
                                    <li>Pakan Ulat: <strong>${pakan_ulat}</strong></li>
                                    <li>Deskripsi: <strong>${deskripsi}</strong></li>
                                </ul >
                            </div > `
            `< a - marker type = "barcode" value = "${i}" >
        <a-text
            value="${ruang[i].nama} sedang ${ruang[i].dipakai}"
            rotation="-90 0 0"
            color="green"
            align="center">
        </a-text>
                </a - marker >
        `;
        dir.insertAdjacentHTML('beforeend', kupu);
    }
}

// Melakukan filter atas nama class kupu
function filterSelection(c) {
    var x, i;
    x = document.getElementsByClassName("kupu");
    if (c == "all") c = "";
    for (i = 0; i < x.length; i++) {
        w3RemoveClass(x[i], "show");
        if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
    }
}

// fungsi menambahkan class
function w3AddClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        if (arr1.indexOf(arr2[i]) == -1) { element.className += " " + arr2[i]; }
    }
}

// fungsi mengurangi class
function w3RemoveClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        while (arr1.indexOf(arr2[i]) > -1) {
            arr1.splice(arr1.indexOf(arr2[i]), 1);
        }
    }
    element.className = arr1.join(" ");
}

// Mengambil data
getJSON(urldata);

// Melakukan filter
filterSelection("all");