function login() {
    var username = document.getElementById('ip').value;
    var password = document.getElementById('ip1').value;
  
    // Check if username and password match
    if (username === 'Aditya' && password === '0356') {
      // Redirect to the desired page
      window.location.href = 'FirstPage.html';
    } else {
      alert('Invalid username or password. Please try again.');
    }
  }
  