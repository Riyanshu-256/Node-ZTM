// This function takes data but always gives back "decrypted data"
function decrypt(data) {
    return 'decrypted data';
}

// This function uses decrypt() and gives the result
function read() {
    return decrypt('data');
}

// This allows other files to use the read() function
export {
    read,
}