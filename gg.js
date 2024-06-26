let etudiants = [
  { id: 1, prenom: "Papa Mbissane", nom: "Kassé", note: [12], age: 23 },
  { id: 2, prenom: "Magui", nom: "Niang", note: [13], age: 22 },
  { id: 3, prenom: "Issa", nom: "Diatta", note: [15], age: 27 },
  { id: 4, prenom: "Bira", nom: "Seck", note: [18], age: 21 },
  { id: 5, prenom: "Abdou", nom: "Gueye", note: [13], age: 26 }
];

let currentPage = 1;
const rowsPerPage = 2;

function afficherEtudiants(tableau, page = 1) {
  let start = (page - 1) * rowsPerPage;
  let end = start + rowsPerPage;
  let paginatedItems = tableau.slice(start, end);

  let affichage = "";
  paginatedItems.forEach(({ id, prenom, nom, note, age }) => {
    affichage += `<tr> 
      <td>${id}</td> 
      <td>${prenom}</td> 
      <td>${nom}</td> 
      <td>${note[0]}</td> 
      <td>${age}</td> 
      <td class="actions">
        <button class="delete" onclick="supprimerEtudiant(${id})">
          <i class="fa-solid fa-trash"></i>
        </button>
        <button class="edit" onclick="modifierEtudiant(${id})">
          <i class="fa-solid fa-pen"></i>
        </button>
      </td> 
    </tr>`;
  });
  document.querySelector(".tab").innerHTML = affichage;

  afficherPagination(tableau.length, page);
}

function afficherPagination(totalItems, currentPage) {
  const totalPages = Math.ceil(totalItems / rowsPerPage);
  const pagination = document.getElementById('pagination');

  let paginationHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    paginationHTML += `<button class="${i === currentPage ? 'active' : ''}" onclick="changerPage(${i})">${i}</button>`;
  }

  pagination.innerHTML = paginationHTML;
}

function changerPage(page) {
  currentPage = page;
  afficherEtudiants(etudiants, currentPage);
}

function calculTotal(tableau) {
  return tableau.reduce((total, current) => total + current, 0);
}

function afficherTotaux(etudiants) {
  let notes = etudiants.map(etudiant => etudiant.note[0]);
  let ages = etudiants.map(etudiant => etudiant.age);

  let totalNotes = calculTotal(notes);
  let totalAges = calculTotal(ages);

  document.getElementById("sumNotes").textContent = totalNotes;
  document.getElementById("sumAges").textContent = totalAges;

  const numNotes = notes.length;
  const numAges = etudiants.length;

  document.getElementById('numNotes').textContent = numNotes;
  document.getElementById('numAges').textContent = numAges;
}

function supprimerEtudiant(id) {
  etudiants = etudiants.filter(etudiant => etudiant.id !== id);
  afficherEtudiants(etudiants, currentPage);
  afficherTotaux(etudiants);
}

function modifierEtudiant(id) {
  const etudiant = etudiants.find(etudiant => etudiant.id === id);
  if (etudiant) {
    document.getElementById('nom').value = etudiant.nom;
    document.getElementById('prenom').value = etudiant.prenom;
    document.getElementById('note').value = etudiant.note[0];
    document.getElementById('age').value = etudiant.age;

    supprimerEtudiant(id);
    modal.style.display = "block";
  }
}

afficherEtudiants(etudiants, currentPage);
afficherTotaux(etudiants);

const form = document.getElementById('form');
const tableBody = document.getElementById('tableBody');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const nom = document.getElementById('nom').value;
    const prenom = document.getElementById('prenom').value;
    const note = document.getElementById('note').value;
    const age = document.getElementById('age').value;

    const data = {
        id: etudiants.length ? etudiants[etudiants.length - 1].id + 1 : 1,
        prenom: prenom,
        nom: nom,
        note: [parseInt(note)],
        age: parseInt(age)
    };

    etudiants.push(data);

    form.reset();

    afficherEtudiants(etudiants, currentPage);
    afficherTotaux(etudiants);

    modal.style.display = "none";
});

let modal = document.getElementById("myModal");
let btn = document.getElementById("myBtn");
let span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
