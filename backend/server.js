const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid'); // Library untuk membuat ID unik

const app = express();
const PORT = 3001; // Sesuai dengan konfigurasi di JS Frontend Anda

// Middleware
app.use(cors()); // Mengizinkan frontend mengakses backend ini
app.use(express.json()); // Agar bisa membaca data JSON dari body request

// --- DATABASE SEMENTARA (In-Memory) ---
// Data akan hilang jika server dimatikan. 
// Untuk produksi, ganti ini dengan database sungguhan (MySQL/MongoDB).
let feedbacks = [
    
];

// --- ROUTES (Endpoints) ---

// 1. READ (GET): Ambil data dengan fitur Search & Filter
app.get('/api/feedback', (req, res) => {
    const { status, search } = req.query;
    
    let result = feedbacks;

    // Filter by Status
    if (status) {
        result = result.filter(item => item.status === status);
    }

    // Filter by Search (Name or EventName)
    if (search) {
        const lowerSearch = search.toLowerCase();
        result = result.filter(item => 
            item.name.toLowerCase().includes(lowerSearch) || 
            item.eventName.toLowerCase().includes(lowerSearch)
        );
    }

    res.json(result);
});

// 2. CREATE (POST): Tambah Feedback baru
app.post('/api/feedback', (req, res) => {
    const { name, eventName, division, rating, comment } = req.body;

    // Validasi sederhana
    if (!name || !eventName || !rating) {
        return res.status(400).json({ message: "Nama, Event, dan Rating wajib diisi!" });
    }

    const newFeedback = {
        id: uuidv4(), // Generate ID unik string
        name,
        eventName,
        division,
        rating: parseInt(rating),
        comment: comment || "",
        status: "open" // Default status
    };

    feedbacks.push(newFeedback);
    console.log(`[POST] Feedback baru diterima dari: ${name}`);
    
    res.status(201).json(newFeedback);
});

// 3. UPDATE (PUT): Ubah Status Feedback
app.put('/api/feedback/:id', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const index = feedbacks.findIndex(item => item.id === id);

    if (index !== -1) {
        feedbacks[index].status = status;
        console.log(`[PUT] Status update id ${id} menjadi ${status}`);
        res.json(feedbacks[index]);
    } else {
        res.status(404).json({ message: "Feedback tidak ditemukan" });
    }
});

// 4. DELETE (DELETE): Hapus Feedback
app.delete('/api/feedback/:id', (req, res) => {
    const { id } = req.params;
    const initialLength = feedbacks.length;

    feedbacks = feedbacks.filter(item => item.id !== id);

    if (feedbacks.length < initialLength) {
        console.log(`[DELETE] Feedback id ${id} dihapus`);
        res.json({ message: "Berhasil dihapus" });
    } else {
        res.status(404).json({ message: "Feedback tidak ditemukan" });
    }
});

// Jalankan Server
app.listen(PORT, () => {
    console.log(`Server Backend berjalan di http://localhost:${PORT}/api/feedback`);
});