/* Reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Arial, Helvetica, sans-serif;
}

/* Navbar */
.navbar {
  background-color: #1f252b;
  color: #fff;
  padding: 14px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-brand {
  font-size: 18px;
  font-weight: bold;
}

.nav-links a {
  color: #cfd6dd;
  text-decoration: none;
  margin-left: 20px;
  font-size: 14px;
}

.nav-links a:hover {
  color: #ffffff;
}

/* Main Container */
.container {
  max-width: 900px;
  margin: 40px auto;
  padding: 0 20px;
}

h1 {
  font-size: 32px;
  margin-bottom: 10px;
}

.subtitle {
  color: #555;
  margin-bottom: 20px;
}

/* Feature List */
.features {
  margin-left: 20px;
  margin-bottom: 25px;
}

.features li {
  margin-bottom: 8px;
}

/* Note Box */
.note {
  background-color: #dff6fd;
  border: 1px solid #9ad9ee;
  padding: 14px;
  border-radius: 6px;
  color: #055160;
  margin-bottom: 25px;
  font-size: 14px;
}

.note code {
  background-color: #eef;
  padding: 2px 4px;
  border-radius: 4px;
}

/* Button */
.btn-primary {
  background-color: #0d6efd;
  color: #fff;
  border: none;
  padding: 10px 18px;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: #0b5ed7;
}
