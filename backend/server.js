    const express = require('express');
    const cors = require('cors');
    const { v4: uuidv4 } = require('uuid');

    const app = express();
    const PORT = 3001;

    // Middleware
    app.use(cors());
    app.use(express.json()); 

    let feedbacks = [
    {
    "id": "e4718914-78cd-4af1-abab-c0ec2e8b06ae",
    "name": "Calvin Wu",
    "eventName": "BNCC REELS",
    "division": "PR",
    "rating": 5,
    "comment": "This was crayz",
    "status": "resolved"
  },
  {
    "id": "aa5d7af1-ffb1-457e-9744-38ffed9c1198",
    "name": "Jason Alexander S.",
    "eventName": "BNCC RnD Workshop",
    "division": "RnD",
    "rating": 5,
    "comment": "I'm a smart guy from Monash University Blah Blah Blah with a GPA of 4.0",
    "status": "open"
  }
    ];
    // --- ROUTES (Endpoints) ---
    // 1. READ (GET):
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
    // 2. CREATE (POST)
    app.post('/api/feedback', (req, res) => {
        const { name, eventName, division, rating, comment } = req.body;

        // Validation
        if (!name || !eventName || !rating) {
            return res.status(400).json({ message: "Nama, Event, dan Rating wajib diisi!" });
        }

        const newFeedback = {
            id: uuidv4(), // Generate Unique ID
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

    // 3. UPDATE (PUT)
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
