require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Supabase Client ───
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Export agar bisa dipakai di routes
module.exports.supabase = supabase;

// ─── Middleware ───
app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000' }));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Routes ───
// app.use('/api/auth',  require('./routes/auth'));
// app.use('/api/karya', require('./routes/karya'));
// app.use('/api/admin', require('./routes/admin'));
// app.use('/api/prodi', require('./routes/prodi'));

// Health check
app.get('/api/health', async (req, res) => {
  // Test koneksi Supabase
  const { error } = await supabase.from('program_studi').select('id').limit(1);
  res.json({
    status: 'ok',
    service: 'DIGILAB Repository API',
    version: '1.0.0',
    database: error ? 'error: ' + error.message : 'supabase connected',
    timestamp: new Date().toISOString()
  });
});

// ─── 404 & Error handler ───
app.use((req, res) => res.status(404).json({ error: 'Route tidak ditemukan' }));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error', message: err.message });
});

app.listen(PORT, () => {
  console.log(`\n🚀 DIGILAB Repository API  →  http://localhost:${PORT}`);
  console.log(`📋 Health check            →  http://localhost:${PORT}/api/health`);
  console.log(`🗄️  Database               →  Supabase\n`);
});
