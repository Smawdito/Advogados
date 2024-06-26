let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');


        if(top >= offset && top < offset + height){
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active')
            })
        }
    })
}

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

//parte de envio do formulario

document.getElementById("form").addEventListener("submit", function (e) {
    e.preventDefault(); // Impedir o envio do formulário padrão
    document.getElementById("message").textContent = "Enviando seus dados...";
    document.getElementById("message").style.display = "block";
    document.getElementById("submit-button").disabled = true;

    // Colete os dados do formulário
    var formData = new FormData(this);
    var keyValuePairs = [];
    for (var pair of formData.entries()) {
        keyValuePairs.push(encodeURIComponent(pair[0]) + "=" + encodeURIComponent(pair[1]));
    }

    var formDataString = keyValuePairs.join("&");

    // Envie uma solicitação POST para seu script do Google Apps
    fetch(
        "https://script.google.com/macros/s/AKfycbx3JPwOsYOB4WfM7ijVlkIRw2qY9C2ggmxlarcoL08n3pH8A--aWq3HQ-5gNmNXlY_G/exec",
        {
            redirect: "follow",
            method: "POST",
            body: formDataString,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            },
        }
    )
    .then(function (response) {
        if (response.ok) {
            return response.json(); // Supondo que seu script retorne uma resposta JSON
        } else {
            throw new Error("Erro ao enviar os dados, tente novamente mais tarde");
        }
    })
    .then(function (data) {
        // Exibir uma mensagem de sucesso
        document.getElementById("message").textContent = "Dados enviados, aguarde nosso contato";
        document.getElementById("message").style.backgroundColor = "green";
        document.getElementById("message").style.color = "beige";
        document.getElementById("submit-button").disabled = false;
        document.getElementById("form").reset();

        setTimeout(function () {
            document.getElementById("message").textContent = "";
            document.getElementById("message").style.display = "none";
        }, 2600);
    })
    .catch(function (error) {
        // Lidar com erros, você pode exibir uma mensagem de erro aqui
        console.error(error);
        document.getElementById("message").textContent = "Ocorreu um erro ao enviar o formulário.";
        document.getElementById("message").style.display = "block";
        document.getElementById("message").style.backgroundColor = "red";
        document.getElementById("message").style.color = "white";
        document.getElementById("submit-button").disabled = false;
    });
});
