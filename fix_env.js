const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const envPath = path.join(__dirname, '.env.local');
const secret = crypto.randomBytes(32).toString('hex');

try {
    let content = '';
    if (fs.existsSync(envPath)) {
        content = fs.readFileSync(envPath, 'utf8');
    }

    if (content.includes('NEXTAUTH_SECRET=')) {
        console.log('NEXTAUTH_SECRET already exists in .env.local');
    } else {
        const secretEntry = `\nNEXTAUTH_SECRET="${secret}"\n`;
        fs.appendFileSync(envPath, secretEntry);
        console.log('Added NEXTAUTH_SECRET to .env.local');
        console.log(`Generated Secret: ${secret}`);
    }
} catch (error) {
    console.error('Error updating .env.local:', error);
}
