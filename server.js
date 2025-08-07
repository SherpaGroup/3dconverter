import express from 'express';
import multer from 'multer';
import cors from 'cors';
import { exec } from 'child_process';
import { promises as fs } from 'fs';
import path from 'path';

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.')); // Serve static files from the root directory

// Set up multer for file storage
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({ storage: storage });

// Ensure uploads directory exists
fs.mkdir('uploads', { recursive: true }).catch(console.error);

// Conversion endpoint
app.post('/convert', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const format = req.body.format;
    if (!format) {
        return res.status(400).send('No format specified.');
    }

    const inputFile = req.file.path;
    const outputFilename = `converted-${Date.now()}.${format}`;
    const outputFile = path.join('uploads', outputFilename);

    // Assimp command: assimp export <input> <output>
    const command = `assimp export ${inputFile} ${outputFile}`;

    console.log(`Executing: ${command}`);

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            // Clean up uploaded file
            fs.unlink(inputFile).catch(console.error);
            return res.status(500).json({
                message: 'Conversion failed.',
                error: stderr || error.message
            });
        }

        console.log(`stdout: ${stdout}`);
        if (stderr) {
            console.error(`stderr: ${stderr}`);
        }

        console.log(`File converted successfully: ${outputFile}`);
        res.json({
            message: 'Conversion successful!',
            downloadUrl: `/${outputFile}`
        });

        // Optional: Clean up the original uploaded file after conversion
        fs.unlink(inputFile).catch(console.error);
    });
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
