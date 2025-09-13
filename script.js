const generateBtn = document.getElementById("generate");
const output = document.getElementById("output");

generateBtn.addEventListener("click", () => {
    const username = document.getElementById("username").value.trim();
    const hwid = document.getElementById("hwid").value.trim();
    const key = document.getElementById("key").value.trim();

    if (!username || !hwid || !key) {
        alert("Preencha todos os campos!");
        return;
    }

    // Formata a raw
    const raw = `"${username}" = "${hwid}" // Key: ${key}`;
    output.value = raw;
});
