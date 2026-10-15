function rotuloStatus(status) {
    if (status === 'assistido') {
        return 'Assistido'
    }
    if (status === 'assistindo') {
        return 'Assistindo'
    }
    if (status === 'quero') {
        return 'Quero assistir'
    }
    else {
        return status
    }
}

const estrelas = (nota) => {
    let resultado = ''
    for (let i = 1; i <= 5; i++) {
        resultado += i <= nota ? '★' : '☆';
        
    }
    return resultado
}

let badge = document.querySelector('#origem .badge')
badge.textContent = rotuloStatus(badge.textContent)

let nota = document.querySelector('#notaorigem')
nota.textContent = estrelas(5)

const total = 6;
const textofooter = document.querySelector('footer small')
textofooter.textContent = `CineTrack © 2026 · ${total} filmes cadastrados.`;