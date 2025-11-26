// js/admin.js
const tableBody = document.querySelector('#feedback-table tbody');
const searchInput = document.getElementById('search-input');
const statusFilter = document.getElementById('status-filter');
const API_URL = 'http://localhost:3001/api/feedback'; // Sesuaikan port

// --- 1. READ: Ambil dan Tampilkan Data ---
async function fetchFeedback() {
    const status = statusFilter.value;
    const search = searchInput.value;
    // Tambahkan query string ke URL
    let url = `${API_URL}?status=${status}&search=${search}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        renderFeedback(data);
    } catch (error) {
        console.error("Gagal mengambil data:", error);
        tableBody.innerHTML = '<tr><td colspan="6">Gagal memuat data. Pastikan Backend berjalan.</td></tr>';
    }
}

function renderFeedback(feedbackList) {
    tableBody.innerHTML = ''; // Kosongkan tabel
    
    if (feedbackList.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="6">Tidak ada feedback ditemukan.</td></tr>';
        return;
    }

    feedbackList.forEach(f => {
        const row = tableBody.insertRow();
        row.insertCell().textContent = f.id.substring(0, 8) + '...';
        row.insertCell().textContent = f.name;
        row.insertCell().textContent = f.eventName;
        row.insertCell().textContent = `${f.rating}/5`;
        row.insertCell().textContent = f.status;

        const actionsCell = row.insertCell();
        
        // Tombol DELETE
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Hapus';
        deleteBtn.onclick = () => handleDelete(f.id);
        
        // Dropdown/Tombol UPDATE Status sederhana
        const updateSelect = document.createElement('select');
        ['open', 'in-review', 'resolved'].forEach(s => {
            const option = document.createElement('option');
            option.value = s;
            option.textContent = s;
            if (s === f.status) option.selected = true;
            updateSelect.appendChild(option);
        });
        updateSelect.onchange = (e) => handleUpdateStatus(f.id, e.target.value);
        
        actionsCell.appendChild(updateSelect);
        actionsCell.appendChild(deleteBtn);
    });
}

// --- 2. DELETE: Hapus Data ---
async function handleDelete(id) {
    if (!confirm(`Yakin ingin menghapus feedback ${id.substring(0, 8)}...?`)) return;

    try {
        await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });
        alert('Feedback berhasil dihapus!');
        fetchFeedback(); // Refresh data
    } catch (error) {
        alert('Gagal menghapus feedback.');
    }
}

// --- 3. UPDATE: Ubah Status ---
async function handleUpdateStatus(id, newStatus) {
    try {
        await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: newStatus }),
        });
        // Tidak perlu alert, karena perubahan langsung terlihat di dropdown
        fetchFeedback(); // Refresh data (Opsional, tapi aman)
    } catch (error) {
        alert('Gagal mengupdate status.');
    }
}

// --- Event Listener untuk Filter dan Search ---
searchInput.addEventListener('input', fetchFeedback);
statusFilter.addEventListener('change', fetchFeedback);

// Panggil pertama kali saat halaman dimuat
document.addEventListener('DOMContentLoaded', fetchFeedback);
