const API_URL = "https://script.google.com/macros/s/AKfycbx3CyHFeXROi5abohpYr8DP07se5Kj-ZuHiPq3nbA10pF7z_0xfZDNednjMDr4UhBUR/exec"; // Ganti dengan URL Apps Script Web App

fetch(API_URL)
  .then(response => response.json())
  .then(data => {
    const headers = data[0].map(h => h.toLowerCase().trim());

    const idxTanggal = headers.indexOf("tanggal surat");
    const idxJenis = headers.indexOf("jenis surat");
    const idxNomor = headers.indexOf("nomor surat");
    const idxPihak = headers.indexOf("pengirim/penerima");
    const idxPerihal = headers.indexOf("perihal");
    const idxLink = headers.findIndex(h => h.includes("file") || h.includes("link"));

    data.shift(); // hapus header

    let tbody = document.querySelector("#arsipTable tbody");
    data.forEach(row => {
      // Format tanggal
      let tgl = row[idxTanggal] ? new Date(row[idxTanggal]).toLocaleDateString('id-ID', {
        day: '2-digit', month: 'long', year: 'numeric'
      }) : "";

      tbody.innerHTML += `
        <tr>
          <td>${tgl}</td>
          <td>${row[idxJenis] || ""}</td>
          <td>${row[idxNomor] || ""}</td>
          <td>${row[idxPihak] || ""}</td>
          <td>${row[idxPerihal] || ""}</td>
          <td>${row[idxLink] ? `<a class="btn-view" href="${row[idxLink]}" target="_blank">Lihat</a>` : ""}</td>
        </tr>`;
    });

    $('#arsipTable').DataTable({
      language: {
        url: '//cdn.datatables.net/plug-ins/1.13.1/i18n/id.json'
      }
    });
  })
  .catch(err => console.error("Gagal memuat data:", err));
