const ID_DAFTAR_BELUM = "daftarBelum";
const ID_DAFTAR_SUDAH = "daftarSudah";
const ID_BUKU = "idBuku";

function buatListBaca(judulB, tahunB, PenerbitB, targetB, waktuB, selesai) {
    const judulBuku = document.createElement("h4");
    const judul = document.createElement("span");
    judul.classList.add("judul-Buku");
    judul.innerText = judulB;
    judulBuku.append(judul);

    const tahunBuku = document.createElement("p");
    tahunBuku.innerText = "Tahun Terbit Buku : ";
    const tahun = document.createElement("span");
    tahun.classList.add("tahun-Buku");
    tahun.innerText = tahunB;
    tahunBuku.append(tahun);

    const penerbitBuku = document.createElement("p");
    penerbitBuku.innerText = "Penerbit : ";
    const penerbit = document.createElement("span");
    penerbit.classList.add("penerbit-Buku");
    penerbit.innerText = penerbitB;
    penerbitBuku.append(penerbit);

    const targetBuku = document.createElement("p");
    targetBuku.innerText = "Target Buku : ";
    const target = document.createElement("span");
    target.classList.add("target-Buku");
    target.innerText = targetB;
    targetBuku.append(target);
    
    const waktuBuku = document.createElement("p");
    waktuBuku.innerText = "Waktu Isi : ";
    const waktu = document.createElement("span");
    waktu.classList.add("waktu-Buku");
    waktu.innerText = waktuB;
    waktuBuku.append(waktu);

    const infoBuku = document.createElement("div");
    infoBuku.classList.add("Info");
    infoBuku.append(judulBuku, tahunBuku, penerbitBuku, targetBuku, waktuBuku);

    const aksiBuku = document.createElement("div");
    aksiBuku.classList.add("Aksi");

    const container = document.createElement("article");
    container.classList.add("item-Buku");
    container.append(infoBuku, aksiBuku);

    if (selesai) {
        aksiBuku.append(
            buatTombolEdit(),
            buatTombolUndo(),
            buatTombolSampah()
        );
    } else {
        aksiBuku.append(buatTombolEdit(), buatTombolCek(), buatTombolSampah());
    }

    return container;
}

function tambahBuku() {
    const daftarBelumBaca = document.getElementById(ID_DAFTAR_BELUM);
    const daftarSudahBaca = document.getElementById(ID_DAFTAR_SUDAH);
    const checkType = document.getElementById("input_Selesai");

    const judul = document.getElementById("input_Judul").value;
    const tahun = document.getElementById("input_Tahun").value;
    const penerbit = document.getElementById("input_Penerbit").value;
    const target = document.getElementById("input_Target").value;
    const waktu = document.getElementById("input_Waktu").value;
    
    if (!checkType.checked) {
        const listBaca = buatListBaca(judul, tahun, penerbit, target, waktu, false);
        const objekBuku = buatObjekBuku(judul, tahun, penerbit, target, waktu, false);
        listBaca[ID_BUKU] = objekBuku.id;
        list.push(objekBuku);
        listBelumBaca.append(listBaca);
    } else {
        const listBaca = buatListBaca(judul, tahun, penerbit, target, waktu, true);
        const objekBuku = buatObjekBuku(judul, tahun, penerbit, target, waktu, true);
        listBaca[ID_BUKU] = objekBuku.id;
        list.push(objekBuku);
        listSudahBaca.append(listBaca);
    }
    updateDataToStorage();
}

function hapusForm() {
    document.getElementById("input_Judul").value = "";
    document.getElementById("input_Tahun").value = "";
    document.getElementById("input_Penerbit").value = "";
    document.getElementById("input_Target").value = "";
    document.getElementById("input_Waktu").value = "";
    document.getElementById("inputBukuSelesai").checked = false;
}

function buatTombol(buttonTypeClass, eventListener) {
    const tombol = document.createElement("button");
    tombol.classList.add(buttonTypeClass);
    tombol.addEventListener("click", function(event) {
        eventListener(event);
    });
    return tombol;
}

function tambahBukuSelesai(elemenBuku) {
    const judulBuku = elemenBuku.querySelector(".judul-Buku").innerText;
    const tahunBuku = elemenBuku.querySelector(".tahun_Buku").innerText;
    const penerbitBuku = elemenBuku.querySelector(".penerbit_buku").innerText;
    const targetBuku = elemenBuku.querySelector(".target_buku").innerText;
    const waktuBuku = elemenBuku.querySelector(".waktu_buku").innerText;

    const bukuBaru = buatListBaca(judulBuku, tahunBuku, penerbitBuku, targetBuku, waktuBuku, true);
    const listSelesai = document.getElementById(ID_LIST_SUDAH);
    const book = cariBuku(elemenBuku[ID_BUKU]);
    book.selesai = true;
    bukuBaru[ID_BUKU] = book.id;
    listSelesai.append(bukuBaru);
    elemenBuku.remove();
    updateDataToStorage();
}

function buatTombolCek() {
    return buatTombol("checklist", function(event) {
        const parent = event.target.parentElement;
        tambahBukuSelesai(parent.parentElement);
    });
}

function hapusBukuSelesai(elemenBuku) {
    const posisiBuku = cariIndeksBuku(elemenBuku[ID_BUKU]);
    list.splice(posisiBuku, 1);
    elemenBuku.remove();
    updateDataToStorage();
}

function buatTombolSampah() {
    return buatTombol("trash", function(event) {
        const parent = event.target.parentElement;
        hapusBukuSelesai(parent.parentElement);
    });
}

function buatTombolUndo() {
    return buatTombol("undo", function(event) {
        const parent = event.target.parentElement;
        undoBukuSelesai(parent.parentElement);
    });
}

function buatTombolEdit() {
    return buatTombol("edit", function(event) {
        const parent = event.target.parentElement;
        editInfoBuku(parent.parentElement);
    });
}

function undoBukuSelesai(elemenBuku) {
    const judulBuku = elemenBuku.querySelector(".judul-Buku").innerText;
    const tahunBuku = elemenBuku.querySelector(".tahun-Buku").innerText;
    const penerbitBuku = elemenBuku.querySelector(".penerbit-Buku").innerText;
    const targetBuku = elemenBuku.querySelector(".target-Buku").innerText;
    const waktuBuku = elemenBuku.querySelector(".waktu-Buku").innerText;

    const bukuBaru = buatListBaca(judulBuku, tahunBuku, penerbitBuku, targetBuku, waktuBuku, false);
    const listBelumBaca = document.getElementById(ID_LIST_BELUM);

    const book = cariBuku(elemenBuku[ID_BUKU]);
    book.selesai = false;
    bukuBaru[ID_BUKU] = book.id;
    listBelumBaca.append(bukuBaru);
    elemenBuku.remove();

    updateDataToStorage();
}

function editInfoBuku(elemenBuku) {
    document.getElementById("submitBuku").style.display = "none";
    const editButton = document.getElementById("editBuku");
    editButton.style.display = "block";
    document.getElementById("input_Judul").value = elemenBuku.querySelector(".judul-Buku").innerText;
    document.getElementById("input_Tahun").value = elemenBuku.querySelector(".tahun-Buku").innerText;
    document.getElementById("input_Penerbit").value = elemenBuku.querySelector(".penerbit-buku").innerText;
    document.getElementById("input_Target").value = elemenBuku.querySelector(".target-Buku").innerText;
    document.getElementById("input_Waktu").value = elemenBuku.querySelector(".waktu-Buku").innerText;

    editButton.addEventListener("click", function(event) {
        event.preventDefault();
        tambahBukuEdit(elemenBuku);
    });
}

function tambahBukuEdit(elemenBuku) {
    elemenBuku.remove();
    hapusBukuSelesai(elemenBuku);
    const listBelumBaca = document.getElementById(ID_LIST_BELUM);
    const listSudahBaca = document.getElementById(ID_LIST_SUDAH);
    const checkType = document.getElementById("inputBukuSelesai");

    const judul = document.getElementById("input_Judul").value;
    const tahun = document.getElementById("input_Tahun").value;
    const penerbit = document.getElementById("input_Penerbit").value;
    const target = document.getElementById("input_Target").value;
    const waktu = document.getElementById("input_Waktu").value;

    if (!checkType.checked) {
        const listBaca = buatListBaca(judul, tahun, penerbit, target, waktu, false);
        const objekBuku = buatObjekBuku(judul, tahun, penerbit, target, waktu, false);
        listBaca[ID_BUKU] = objekBuku.id;
        list.push(objekBuku);
        listBelumBaca.append(listBaca);
    } else {
        const listBaca = buatListBaca(judul, tahun, penerbit, target, waktu, true);
        const objekBuku = buatObjekBuku(judul, tahun, penerbit, target, waktu, true);
        listBaca[ID_BUKU] = objekBuku.id;
        list.push(objekBuku);
        listSudahBaca.append(listBaca);
    }
    updateDataToStorage();
    hapusForm();
    tombolKembali();
}

function tombolKembali() {
    document.getElementById("submit").style.display = "block";
    document.getElementById("edit").style.display = "none";
}