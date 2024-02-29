// Form ve input elementlerine ID'leri kullanarak referans alınıyor
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const repassword = document.getElementById('repassword');

// Bir input elementi için hata mesajı gösteren fonksiyon
function error(input, message) {
    // Input'un class'ını hatayı gösterecek şekilde ayarla
    input.className = 'form-control is-invalid';
    // Bir sonraki kardeş elementi al (hata mesajlarını göstermek için varsayılan olarak bir <div> kullanılıyor)
    const div = input.nextElementSibling;
    // Hata mesajını ayarla ve stil için class'ı güncelle
    div.innerText = message;
    div.className = 'invalid-feedback';
}

// Bir input elementi için başarı durumunu gösteren fonksiyon
function success(input) {
    // Input'un class'ını başarılı gösterecek şekilde ayarla
    input.className = 'form-control is-valid';
}

// Email formatını kontrol eden fonksiyon
function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    // Email formatı doğruysa başarı durumunu göster
    if(re.test(input.value)){
        success(input);
    } else {
        // Email formatı hatalıysa hata mesajını göster
        error(input, 'Hatalı Email Alanı Gerekli')
    }
}

// Zorunlu alanları kontrol eden fonksiyon
function checkRequired(inputs){
    inputs.forEach(function(input){
        if(input.value === ''){
            // Eğer alan boşsa hata mesajını göster
            error(input, `${input.id} Alanlar Gereklidir.`);
        }
        else{
            // Alan doluysa başarı durumunu göster
            success(input);
        }
    });   
}

// Karakter uzunluğunu kontrol eden fonksiyon
function checkLength(input, min, max){
    if(input.value.length < min){
        // Minimum uzunluktan kısa ise hata mesajını göster
        error(input, `${input.id} en az ${min} karakter olmalıdır.`)
    } else if(input.value.length > max){
        // Maximum uzunluktan uzun ise hata mesajını göster
        error(input, `${input.id} en fazla ${max} karakter olmalıdır.`)
    } else {
        // Uzunluk uygunsa başarı durumunu göster
        success(input);
    }
}

// Parolaların eşleşip eşleşmediğini kontrol eden fonksiyon
function checkPassword(input1, input2){
    if(input1.value !== input2.value){
        // Parolalar eşleşmiyorsa hata mesajını göster
        error(input2, 'Parolalar eşleşmiyor.');
    }
}

// Telefon numarasının uzunluğunu kontrol eden fonksiyon
function checkPhone(input){
    var exp = /^\d{10}$/;
    if(!exp.test(input.value))
    // Telefon numarası 10 karakterden farklı ise hata mesajını göster
    error(input, 'Telefon 10 Karakterli Olmalıdır.');
}

// Form submit olayını dinleyen fonksiyon
form.addEventListener('submit', function(e) {
    // Sayfanın yeniden yüklenmesini engelle
    e.preventDefault();

    // Zorunlu alanları kontrol et
    checkRequired([username, email, password, repassword]);
    // Email formatını kontrol et
    checkEmail(email);
    // Karakter uzunluklarını kontrol et
    checkLength(username, 3, 15);
    checkLength(password, 7, 30);
    // Parolaların eşleşip eşleşmediğini kontrol et
    checkPassword(password, repassword);
    // Telefon numarasının uzunluğunu kontrol et
    checkPhone(phone);
});