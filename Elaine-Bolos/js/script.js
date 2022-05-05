function abrirNav() {
    const form = document.getElementsByTagName("nav")[0];
  
    if (form.style.display == "block") {
      form.style.display = "none";
    } else {
      form.style.display = "block";
    }
  }