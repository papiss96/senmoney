var tabNumeros = ["770000001", "770000002", "770000003", "770000004", "770000005"];
var tabSoldes = [5000000, 1000000, 20000, 3000000, 5000000];
var tabCodes = ["0001", "0002", "0003", "0004", "0005"];
var tabNumeroDeCompteur = ["0000001", "0000002", "0000003", "0000004", "0000005"];
var numCourant;

function menu() {
  var textMenu =
    "" +
    "1 : Solde du compte\n" +
    "2 : Transfert d'arent\n" +
    "3 : Paiement facture\n" +
    "4 : Option";

  var rep = window.prompt(textMenu);
  return rep;
}

function afficheSolde(num) {
  var indice = tabNumeros.indexOf(num);
  if (indice != -1) {
    var code = window.prompt("Donnez votre code: ");
    if (code == tabCodes[indice]) {
      alert("Votre solde est de : " + tabSoldes[indice]);
    }else{
      alert("votre code est incorrect !")
    }
  } else {
    alert("Votre numéro est n'existe pas!");
  }
}

function transfereSolde(num) {
  var indice1 = tabNumeros.indexOf(num);
  if (indice1 != -1) {
    var numeroDestinataire = window.prompt("Numero du destinataire :");
    var indice2 = tabNumeros.indexOf(numeroDestinataire);
    while (indice2 == -1) {
      if (numeroDestinataire === null) break;
      alert("Ce numero n'existe pas !");
      numeroDestinataire = window.prompt("Numero du destinataire :");
      indice2 = tabNumeros.indexOf(numeroDestinataire);
    }
    if (numeroDestinataire !== null) {
      var montant = window.prompt("Montant du transfere :") * 1;
      while (montant < 0 || `${montant}` === "NaN") {
        if (montant === null) break;
        montant = parseInt(window.prompt("Montant du transfere :"));
      }
      if (montant !== null && montant !== 0) {
        var code = window.prompt("Votre code secret :");
        while (code !== tabCodes[indice1]) {
          if (code === null) break;
          alert("votre mot de pass est incorect !");
          code = window.prompt("Votre code secret :");
        }
        if (code !== null) {
          if (tabSoldes[indice1] - montant < 0) {
            alert("votre solde est insufisant !");
          } else {
            tabSoldes[indice1] -= montant;
            tabSoldes[indice2] += montant;
            alert(`votre transfere de ${montant} vers ${numeroDestinataire} a reussi !`);
          }
        }
      }
    }
  } else {
    alert("ce numero de n'existe pas !");
  }
}

function paymentFacture(num) {
  var indice1 = tabNumeros.indexOf(num);
  if (indice1 != -1) {
    var textMenu = "" + "1 : Senelec\n" + "2 : Seneau\n" + "3 : Netflix \n" + "4 : Canal+";
    var rep = window.prompt(textMenu);
    switch (rep) {
      case "1":
        senelec(indice1);
        break;
    }
  } else {
    alert("ce numero de n'existe pas !");
  }
}

function senelec(indice) {
  var numeroConteur = window.prompt("Votre numero de conteur :");
  var indexNumeroConteur = tabNumeroDeCompteur.indexOf(numeroConteur);
  while (indexNumeroConteur == -1) {
    if (numeroConteur === null) break;
    alert("ce numero de conteur n'existe pas !");
    numeroConteur = window.prompt("Votre numero de conteur :");
    indexNumeroConteur = tabNumeroDeCompteur.indexOf(numeroConteur);
  }
  if (numeroConteur !== null) {
    var code = window.prompt("Votre code secret :");
    while (tabCodes[indice] !== code) {
      if (code === null) break;
      alert("votre code est incorrect !");
      code = window.prompt("Votre code secret :");
    }
    if (code !== null) {
      var motantDeLaFacture = Math.floor(Math.random() * 50000);
      tabSoldes[indice] -= motantDeLaFacture;
      alert(`votre fature de ${motantDeLaFacture} euro a etait payé !`);
    }
  }
}

function options(num) {
  var textMenu = "" + "1 : changer de code secret\n";
  var rep = window.prompt(textMenu);
  switch (rep) {
    case "1":
      changerDeCode(num);
      break;
  }
}

function changerDeCode(num) {
  var code = window.prompt("Votre ancien code :");
  var index = tabNumeros.indexOf(num);
  var ancienCode = tabCodes[index];
  while (ancienCode !== code) {
    if (code === null) break;
    alert("votre code est incorrect !");
    code = window.prompt("Votre ancien code :");
  }
  if (code !== null) {
    var nouveauCode = window.prompt("Nouveau code secret :") * 1;
    while (nouveauCode < 0 || nouveauCode > 9999 || `${nouveauCode}` === "NaN") {
      if (nouveauCode === null) break;
      alert("code invalid !");
      nouveauCode = window.prompt("Nouveau code secret :") * 1;
    }
    if (nouveauCode !== null) {
      if (nouveauCode < 9) {
        nouveauCode = "000" + nouveauCode;
      }
      tabCodes[index] = `${nouveauCode}`;
      alert(`votre nouveau code secret est ${nouveauCode}`);
    }
  }
}

function main() {
  var rep = menu();
  var numCourant = document.getElementById("num").value;
  switch (rep) {
    case "1":
      afficheSolde(numCourant);
      break;
    case "2":
      transfereSolde(numCourant);
      break;
    case "3":
      paymentFacture(numCourant);
    case "4":
      options(numCourant);
      break;
  }
}
