let handlekurv = document.querySelectorAll('.addKurv');

let produkter = [
  {
    navn: "Sort hoodie",
    tag: "sorthoodie",
    pris: 600,
    iKurv: 0,
  },
  {
    navn: "T-skjorte",
    tag: "t-skjorte",
    pris: 150,
    iKurv: 0,
  },
  {
    navn: "Dadcap",
    tag: "dadcap",
    pris: 150,
    iKurv: 0,
  },
  {
    navn: "Wu-Tang skjerf",
    tag: "wu-tangskjerf",
    pris: 200,
    iKurv: 0,
  },
  {
    navn: "Legend of the Wu-Tang",
    tag: "legendofthewu-tang",
    pris: 300,
    iKurv: 0,
  },
  {
    navn: "Wu-Tang is forever",
    tag: "wu-tangisforever",
    pris: 300,
    iKurv: 0,
  },
  {
    navn: "Enter the Wu-Tang (36 chambers)",
    tag: "enterthewu-tang(36chambers)",
    pris: 300,
    iKurv: 0
  },
  {
    navn: "Munnbind",
    tag: "munnbind",
    pris: 100,
    iKurv: 0,
  }

];

for (let i = 0; i < handlekurv.length; i++) {
  handlekurv[i].addEventListener('click', () => {
    produkterKurv(produkter[i]);
    totalPris(produkter[i]);
  }) 
};

function onLoadKurvAntall () {
  let produktNummer = localStorage.getItem('produkterKurv');

  if(produktNummer) {
    document.querySelector('.handlekurv span').textContent = produktNummer;
  }
};

function produkterKurv(produkter) {
  let produktNummer = localStorage.getItem('produkterKurv');
  produktNummer = parseInt(produktNummer);
  
  if (produktNummer) {
    localStorage.setItem('produkterKurv', produktNummer + 1);
    document.querySelector('.handlekurv span').textContent = produktNummer + 1;
  } else {
    localStorage.setItem('produkterKurv', 1);
    document.querySelector('.handlekurv span').textContent = 1;
  }

  setItems(produkter);

};

function setItems(produkter) {
  let kurvProdukter = localStorage.getItem('produkterIkurv');
  kurvProdukter = JSON.parse(kurvProdukter);
  
  if(kurvProdukter != null) {

    if(kurvProdukter[produkter.tag] == undefined) {
      kurvProdukter = {
        ...kurvProdukter,
        [produkter.tag]: produkter
      }
    }
    kurvProdukter[produkter.tag].iKurv += 1;
  } else {
    produkter.iKurv = 1;
    kurvProdukter = {
    [produkter.tag]: produkter
    }
  }
  localStorage.setItem('produkterIkurv', JSON.stringify(kurvProdukter));
};

function totalPris(produkter) {
  let kurvPris = localStorage.getItem('totalPris');
 
  if(kurvPris != null) {
    kurvPris = parseInt(kurvPris);
    localStorage.setItem('totalPris', kurvPris + produkter.pris);
  } else {
    localStorage.setItem('totalPris', produkter.pris);
  }

};

function visHandlekurv() {
  let kurvProdukter = localStorage.getItem('produkterIkurv');
  kurvProdukter = JSON.parse(kurvProdukter);
  let produktContainer = document.querySelector('.produkter');
  let kurvPris = localStorage.getItem('totalPris');

  if(kurvProdukter && produktContainer) {
    produktContainer.innerHTML = ``;

    Object.values(kurvProdukter).map(produkter => {
      produktContainer.innerHTML += `  
      <section class="produkter-container">
        <article class="kurv-produkter">
          <input type="button" class="fjern-produkt" value="X" onclick="fjernEn()">
          <img src="./images/${produkter.tag}.png" class="kurv-img">
          <span class="produkter-navn">${produkter.navn}</span>
        </article>
          <article class="produkter-pris">${produkter.pris} NOK</article>
        <article class="produkter-antall">        
          <span>${produkter.iKurv}</span>      
        </article>
        <article class="produkter-total">
          ${produkter.iKurv * produkter.pris} NOK
        </article>
      </section>
      `
    }
    );
    produktContainer.innerHTML += `
    <article class="total-container">
      <h2 class="total-tittel">Total pris</h2>
      <h2 class="kurv-total">
      ${kurvPris},00 NOK
      </h2>
      <a href="takk.html">
      <input type="button" class="fullforkjop" value="Fullfør kjøpet">
      </a>
    </article>
    `;
  };
  fjernEn();
};


function fjernEn() {
  let fjernBtn = document.querySelectorAll('.fjern-produkt');
  let produktNavn;
  let produktNummer = localStorage.getItem('produkterKurv');
  let kurvProdukter = localStorage.getItem('produkterIkurv');
  kurvProdukter = JSON.parse(kurvProdukter);
  let kurvKostnad = localStorage.getItem('totalPris');

  for(let i = 0; i < fjernBtn.length; i++) {
    fjernBtn[i].addEventListener('click', () =>  {
      produktNavn = fjernBtn[i].parentElement.textContent.trim().toLowerCase().replace(/ /g, '');

      localStorage.setItem('produkterKurv', produktNummer - kurvProdukter [produktNavn].iKurv);

      localStorage.setItem('totalPris', kurvKostnad - (kurvProdukter [produktNavn].pris * kurvProdukter [produktNavn].iKurv));

      delete kurvProdukter[produktNavn];
      localStorage.setItem('produkterIkurv', JSON.stringify(kurvProdukter));

      visHandlekurv();
      onLoadKurvAntall();
    });
  }
}

visHandlekurv();
onLoadKurvAntall();