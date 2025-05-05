// Load navbar
fetch('navbar.html')
.then(response => response.text())
.then(data => {
    document.getElementById('navbar').innerHTML = data;
});

// Load home content
fetch('home.html')
.then(response => response.text())
.then(data => {
    document.getElementById('home').innerHTML = data;
});

// Load footer
fetch('footer.html')
.then(response => response.text())
.then(data => {
    document.getElementById('footer').innerHTML = data;
});
