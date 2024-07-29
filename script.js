// script.js

// Função principal que será executada quando o botão "Calculate" for clicado
document.querySelector('.calculate-age-button').addEventListener('click', function() {
  // Captura a data de nascimento fornecida pelo usuário
  const dateInput = document.getElementById('date-input').value;

  // Verifica se a data de nascimento foi fornecida
  if (!dateInput) {
      alert('Please enter your date of birth.');
      return;
  }

  // Calcula a idade com base na data de nascimento fornecida
  const birthDate = new Date(dateInput);
  const age = calculateAge(birthDate);
  const daysUntilNextBirthday = calculateDaysUntilNextBirthday(birthDate);

  // Exibe os resultados no HTML
  document.getElementById('years').textContent = age.years;
  document.getElementById('months').textContent = age.months;
  document.getElementById('days').textContent = age.days;
  document.getElementById('days-until-birthday').textContent = daysUntilNextBirthday;
});

/**
 * Função que calcula a idade em anos, meses e dias com base na data de nascimento fornecida.
 * @param {Date} birthDate - A data de nascimento.
 * @returns {Object} Um objeto contendo a idade em anos, meses e dias.
 */
function calculateAge(birthDate) {
  const today = new Date();
  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  if (months < 0 || (months === 0 && days < 0)) {
      years--;
      months += 12;
  }

  if (days < 0) {
      months--;
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += lastMonth.getDate();
  }

  return { years, months, days };
}

/**
 * Função que calcula quantos dias faltam para o próximo aniversário.
 * @param {Date} birthDate - A data de nascimento.
 * @returns {number} Número de dias até o próximo aniversário.
 */
function calculateDaysUntilNextBirthday(birthDate) {
  const today = new Date();
  let nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());

  if (today > nextBirthday) {
    nextBirthday.setFullYear(today.getFullYear() + 1);
  }

  const timeDiff = nextBirthday - today;
  return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
}

/**
 * Função que cria um link para adicionar um evento no Google Agenda.
 * @param {Date} birthDate - A data de nascimento.
 * @returns {string} URL do evento no Google Agenda.
 */
function createGoogleCalendarLink(birthDate) {
  const nextBirthday = new Date(new Date().getFullYear(), birthDate.getMonth(), birthDate.getDate());
  if (new Date() > nextBirthday) {
    nextBirthday.setFullYear(new Date().getFullYear() + 1);
  }

  const dateString = nextBirthday.toISOString().split('T')[0].replace(/-/g, '');
  return `https://www.google.com/calendar/render?action=TEMPLATE&text=Meu+Aniversário&dates=${dateString}/${dateString}`;
}

// Evento de clique para o botão do Google Calendar
document.getElementById('google-calendar-button').addEventListener('click', function() {
  const dateInput = document.getElementById('date-input').value;
  if (!dateInput) {
    alert('Please enter your date of birth.');
    return;
  }
  
  const birthDate = new Date(dateInput);
  const googleCalendarLink = createGoogleCalendarLink(birthDate);
  window.open(googleCalendarLink, '_blank');
});
