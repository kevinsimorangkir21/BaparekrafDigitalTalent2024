const STORAGE_KEY = "READING_LIST";

let list = [];

function isStorageExist() /* boolean */ {
    if (typeof(Storage) === undefined) {
        alert("Browser kamu tidak mendukung local storage");
        return false
    }
    return true;
}

function saveData() {
    const parsed = JSON.stringify(list);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event("Data Tersimpan"));
}

function loadDataFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    let data = JSON.parse(serializedData);
    if (data !== null)
        list = data;
    document.dispatchEvent(new Event("ondataloaded"));
}

function updateDataToStorage() {
    if (isStorageExist())
        saveData();
}

function buatObjekBuku(judul, tahun, penerbit, target, waktu, selesai) {
    return {
        id: +new Date(),
        judul,
        tahun,
        penerbit,
        target,
        waktu,
        selesai
    };
}

function cariBuku(idBuku) {
    for (book of list) {
        if (book.id === idBuku)
            return book;
    }
    return null;
}

function cariIndeksBuku(idBuku) {
    let index = 0
    for (book of list) {
        if (book.id === idBuku)
            return index;

        index++;
    }

    return -1;
}

function refreshDataFromList() {
    const listBelumSelesai = document.getElementById(ID_DAFTAR_BELUM);
    let listSelesai = document.getElementById(ID_DAFTAR_SUDAH);
    for (book of list) {
        const bukuBaru = buatListBaca(book.judul, book.tahun, book.penerbit, book.target, book.waktu, book.selesai);
        bukuBaru[ID_BUKU] = book.id;
        if (book.selesai) {
            listSelesai.append(bukuBaru);
        } else {
            listBelumSelesai.append(bukuBaru);
        }
    }
}