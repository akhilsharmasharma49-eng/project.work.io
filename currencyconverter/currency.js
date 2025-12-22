let from = document.getElementById("from");
let to = document.getElementById("to");
let resultBox = document.getElementById("resultBox");
let loader = document.getElementById("loader");
let errorBox = document.getElementById("errorBox");

// Load currency list
fetch("https://api.frankfurter.app/currencies")
    .then(res => res.json())
    .then(data => {
        for (let code in data) {
            let opt1 = document.createElement("option");
            opt1.value = code;
            opt1.innerText = `${code} - ${data[code]}`;

            let opt2 = document.createElement("option");
            opt2.value = code;
            opt2.innerText = `${code} - ${data[code]}`;

            from.appendChild(opt1);
            to.appendChild(opt2);
        }

        from.value = "USD";
        to.value = "INR";

        document.getElementById("updateTime").innerText = new Date().toLocaleString();
    });

// Search filter (from)
document.getElementById("searchFrom").addEventListener("input", function () {
    let val = this.value.toLowerCase();
    for (let option of from.options) {
        option.style.display = option.text.toLowerCase().includes(val) ? "" : "none";
    }
});

// Search filter (to)
document.getElementById("searchTo").addEventListener("input", function () {
    let val = this.value.toLowerCase();
    for (let option of to.options) {
        option.style.display = option.text.toLowerCase().includes(val) ? "" : "none";
    }
});

// Swap currencies
document.getElementById("swapBtn").addEventListener("click", () => {
    let temp = from.value;
    from.value = to.value;
    to.value = temp;
});

// Convert button
document.getElementById("convertBtn").addEventListener("click", () => {
    let amount = document.getElementById("amount").value;

    if (amount === "" || amount <= 0) {
        errorBox.style.display = "block";
        errorBox.innerText = "Please enter a valid amount.";
        return;
    }

    errorBox.style.display = "none";
    loader.style.display = "block";
    resultBox.innerHTML = "";

    let f = from.value;
    let t = to.value;

    fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${f}&to=${t}`)
        .then(res => res.json())
        .then(data => {
            loader.style.display = "none";
            let rate = Object.values(data.rates)[0];

            resultBox.innerHTML = `<b>${amount} ${f}</b> = <b>${rate} ${t}</b>`;
        })
        .catch(() => {
            loader.style.display = "none";
            errorBox.style.display = "block";
            errorBox.innerText = "Something went wrong!";
        });
});
