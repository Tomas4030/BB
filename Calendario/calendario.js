document.addEventListener('DOMContentLoaded', () => {
    const startDate = new Date(2024, 0, 1, 0, 0, 0); 

    const anosElement = document.getElementById('anos');
    const mesesElement = document.getElementById('meses');
    const diasElement = document.getElementById('dias');
    const horasElement = document.getElementById('horas');
    const minutosElement = document.getElementById('minutos');
    const segundosElement = document.getElementById('segundos');

    function updateTimeCounter() {
        const now = new Date();
        const diff = now - startDate; 
        const totalSeconds = Math.floor(diff / 1000);

        let years = now.getFullYear() - startDate.getFullYear();
        let months = now.getMonth() - startDate.getMonth();
        let days = now.getDate() - startDate.getDate();

        if (days < 0) {
            months--;
            days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
        }

        if (months < 0) {
            years--;
            months += 12;
        }

        const segundosRestantes = totalSeconds % (24 * 60 * 60);

        const horasRestantes = Math.floor(segundosRestantes / (60 * 60)) % 24;
        const minutosRestantes = Math.floor(segundosRestantes / 60) % 60;
        const segundosApenas = totalSeconds % 60;

        anosElement.textContent = years;
        mesesElement.textContent = months;
        diasElement.textContent = days;
        
        horasElement.textContent = String(horasRestantes).padStart(2, '0');
        minutosElement.textContent = String(minutosRestantes).padStart(2, '0');
        segundosElement.textContent = String(segundosApenas).padStart(2, '0');
    }

    updateTimeCounter();
    setInterval(updateTimeCounter, 1000); 
});