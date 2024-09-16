const crypto = require('crypto');

function calculateHash(blockData, nonce) {
  return crypto.createHash('sha256')
    .update(blockData + nonce)
    .digest('hex');
}

function isValidHash(hash, difficulty) {
  return hash.startsWith('0'.repeat(difficulty));
}

function mineBlock(blockData, difficulty) {
  let nonce = 0;
  const startTime = Date.now();

  while (true) {
    const hash = calculateHash(blockData, nonce);
    if (isValidHash(hash, difficulty)) {
      const endTime = Date.now();
      return {
        nonce,
        hash,
        time: (endTime - startTime) / 1000  // Tiempo en segundos
      };
    }
    nonce++;
  }
}

function main() {
  const blockData = "example_block_data";
  
  for (let difficulty = 1; difficulty <= 3; difficulty++) {
    console.log(`Probando dificultad: ${difficulty}`);
    const result = mineBlock(blockData, difficulty);
    console.log(`Nonce encontrado: ${result.nonce}`);
    console.log(`Hash válido: ${result.hash}`);
    console.log(`Tiempo de minería: ${result.time.toFixed(2)} segundos`);
    console.log("-".repeat(30));
  }
}

main();
