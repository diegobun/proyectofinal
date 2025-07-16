
function validateForm (){
    const name = document.getElementById('nombre').value;
    const surname = document.getElementById('apellido').value;
    const mail = document.getElementById('email').value;
    const age = document.getElementById('edad').value;
    const message = document.getElementById('mensajeusuario').value;
    let isValid = true;

    if(name.trim() === '') {
    showError('empty-name', 'El nombre es obligatorio');
    isValid = false;
    } else {
     hideError('empty-name');   
    }

    if(surname.trim() === '') {
    showError('empty-surname', 'El apellido es obligatorio');
    isValid = false;
    } else {
     hideError('empty-surname');   
    }

    if(age.trim() === '') {
    showError('empty-age', 'La edad es obligatoria');
    isValid = false;
   } else {
    hideError('empty-age');
   }

    if(age.trim() !== '' && age < 18) {
    showError('min-age', 'Usted es menor de edad');
    isValid = false;
   } else {
    hideError('min-age');
   }

  if(name.trim() !== '' && name.length <= 1) {
    showError('min-name', 'El nombre tiene que tener 2 caracteres o más');
    isValid = false;
   } else {
    hideError('min-name');
   }


    return isValid;
}

function showError(fieldId, message){
    const errorElement = document.getElementById(fieldId + '-error');
    errorElement.textContent = "X " + message;
    errorElement.style.display = 'block';
}

function hideError(fieldId){
    const errorElement = document.getElementById(fieldId + '-error');
    errorElement.style.display = 'none';
}

const btnEnviar = document.getElementById('enviar');
btnEnviar.addEventListener('click' , function(event) {
    event.preventDefault ();
if(validateForm()) {
    window.location.href = "validaForm.html";
}
});