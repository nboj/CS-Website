const setClock = () => {
    let date = new Date();
    let element = document.querySelector("#date-time");
    let fullHours = date.getHours()
    let hours = fullHours;
    let suffix; 
    if (fullHours > 12) {
        hours = fullHours - 12;
        suffix = 'pm';
    } else {
        suffix = 'am';
    }
    let seconds = date.getSeconds().toString().padStart(2);
    let minutes = date.getMinutes().toString().padStart(2); 
    element.innerHTML = `<p style="display: inline-block; float: left; margin-right: 20px;">Date - ${date.toDateString()}</p><p display: inline-block; float-right; margin-right: 20px;>Time:300 ${hours}:${minutes}:${seconds + suffix}</p>`;
}

window.onload = function() {  
    setInterval(setClock, 1000);
}