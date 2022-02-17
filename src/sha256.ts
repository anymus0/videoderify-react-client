// built-in SHA256 function in JS,
// as described in: https://stackoverflow.com/questions/8670909/is-there-any-builtin-javascript-string-hash-function-in-newest-browsers

async function sha256(source: string) {
  const sourceBytes = new TextEncoder().encode(source);
  const digest = await crypto.subtle.digest("SHA-256", sourceBytes);
  const resultBytes = [...new Uint8Array(digest)];
  return resultBytes.map(x => x.toString(16).padStart(2, '0')).join("").toUpperCase();
}

export default sha256;
