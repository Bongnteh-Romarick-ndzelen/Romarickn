/**
 * Test script to verify frontend-backend API connection
 * Run with: npx tsx test-api-connection.ts
 */

import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

// Load environment variables from .env.local
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '.env.local') });

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

console.log('Testing API connection...');
console.log('API Base URL:', API_BASE_URL);

async function testConnection() {
  try {
    // Test health endpoint
    const response = await fetch(`${API_BASE_URL}/api/health`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('✅ API Connection Successful!');
    console.log('Response:', data);
    return true;
  } catch (error) {
    console.error('❌ API Connection Failed!');
    console.error('Error:', error.message);
    return false;
  }
}

// Run test
testConnection().then(success => {
  process.exit(success ? 0 : 1);
});