document.addEventListener("DOMContentLoaded", function() {

    const submitForm = document.getElementById("submit");
    submitForm.addEventListener("click", function(event) {
        event.preventDefault();
        tambahBuku();
        hapusForm();
    });

    if (isStorageExist()) {
        loadDataFromStorage();
    }
});

document.addEventListener("ondatasaved", () => {
    console.log("Data berhasil disimpan");
});
document.addEventListener("ondataloaded", () => {
    refreshDataFromList();
});

const checkType = document.getElementById("inputBukuSelesai");
checkType.addEventListener("click", () => {
    if (checkType.checked) {
        document.getElementById("JenisBuku").innerHTML = "<strong>Selesai Dibaca</strong>";
        document.getElementById("type").innerHTML = "<strong>Selesai Dibaca</strong>";
    } else {
        document.getElementById("jenisBuku").innerHTML = "<strong>Belum Dibaca</strong>";
        document.getElementById("editjenisBuku").innerHTML = "<strong>Belum Dibaca</strong>";
    }
});