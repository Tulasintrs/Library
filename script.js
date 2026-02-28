/* PAGE NAVIGATION */
function showPage(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(page).classList.add('active');
}

/* USER AUTH */
function signup() {
    if (spass.value !== scpass.value) {
        smsg.innerText = "Passwords do not match!";
        return;
    }
    localStorage.setItem("user",
        JSON.stringify({ email: semail.value, pass: spass.value })
    );
    smsg.innerText = "Signup successful!";
}

function login() {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user && user.email === lemail.value && user.pass === lpass.value) {
        localStorage.setItem("login", "true");
        loginLink.style.display = "none";
        logoutBtn.style.display = "inline";
        showPage('home');
    } else {
        lmsg.innerText = "Invalid login!";
    }
}

function logout() {
    localStorage.removeItem("login");
    loginLink.style.display = "inline";
    logoutBtn.style.display = "none";
}

/* BOOK DATA */
let books = JSON.parse(localStorage.getItem("books")) || [
    { title: "Atomic Habits", author: "James Clear", available: true },
    { title: "Wings of Fire", author: "A.P.J Abdul Kalam", available: true },
    { title: "The Alchemist", author: "Paulo Coelho", available: true }
];

function loadBooks() {
    bookList.innerHTML = "";
    books.forEach((b, i) => {
        bookList.innerHTML += `
        <div class="card">
            <h4>${b.title}</h4>
            <p>${b.author}</p>
            <p>${b.available ? "Available" : "Issued"}</p>
            <button onclick="issueBook(${i})" ${!b.available && "disabled"}>Issue</button>
        </div>`;
    });
    localStorage.setItem("books", JSON.stringify(books));
}

/* ISSUE & RETURN */
let issued = JSON.parse(localStorage.getItem("issued")) || [];

function issueBook(i) {
    books[i].available = false;
    issued.push({ ...books[i], date: new Date().toDateString() });
    saveData();
}

function returnBook(i) {
    let book = issued[i];
    books.find(b => b.title === book.title).available = true;
    issued.splice(i, 1);
    saveData();
}

function saveData() {
    localStorage.setItem("books", JSON.stringify(books));
    localStorage.setItem("issued", JSON.stringify(issued));
    loadBooks();
    loadIssued();
}

function loadIssued() {
    issuedList.innerHTML = issued.length === 0 ? "No books issued" : "";
    issued.forEach((b, i) => {
        issuedList.innerHTML += `
        <p>${b.title} - ${b.date}
        <button onclick="returnBook(${i})">Return</button></p>`;
    });
}

/* SEARCH */
function searchBooks(value) {
    let filtered = books.filter(b =>
        b.title.toLowerCase().includes(value.toLowerCase()) ||
        b.author.toLowerCase().includes(value.toLowerCase())
    );
    bookList.innerHTML = "";
    filtered.forEach(b => {
        bookList.innerHTML += `<div class="card">
        <h4>${b.title}</h4><p>${b.author}</p></div>`;
    });
}

/* CONTACT */
function contact() {
    cstatus.innerText = "Message sent successfully!";
}

/* LOAD DATA */
loadBooks();
loadIssued();
