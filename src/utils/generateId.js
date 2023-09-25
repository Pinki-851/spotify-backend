function generateUniqueId() {
  const prefix = "SPOT-";
  const randomPart = generateRandomPart();
  return `${prefix}${randomPart}`;
}

// Function to generate a random part of the unique ID
function generateRandomPart() {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let password = "";

  for (let i = 0; i < 7; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }

  return password;
}

module.exports = generateUniqueId;
