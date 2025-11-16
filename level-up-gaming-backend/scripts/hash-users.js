const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;
const dbPath = path.join(__dirname, '..', 'src', 'db', 'users.json');

function backupFile(filePath) {
  const backupPath = `${filePath}.bak.${Date.now()}`;
  fs.copyFileSync(filePath, backupPath);
  return backupPath;
}

function isHashed(pw) {
  return typeof pw === 'string' && pw.startsWith('$2');
}

function main() {
  if (!fs.existsSync(dbPath)) {
    console.error('No se encontró users.json en', dbPath);
    process.exit(1);
  }

  const raw = fs.readFileSync(dbPath, 'utf8');
  let users;
  try {
    users = JSON.parse(raw);
  } catch (err) {
    console.error('Error parseando users.json:', err);
    process.exit(1);
  }

  const backup = backupFile(dbPath);
  console.log('Backup creado en:', backup);

  let changed = 0;
  for (let u of users) {
    if (u.password && !isHashed(u.password)) {
      const hashed = bcrypt.hashSync(u.password, SALT_ROUNDS);
      u.password = hashed;
      changed++;
    }
  }

  fs.writeFileSync(dbPath, JSON.stringify(users, null, 2), 'utf8');
  console.log(`Proceso completado. ${changed} contraseña(s) han sido hasheadas y actualizadas en users.json`);
}

main();
