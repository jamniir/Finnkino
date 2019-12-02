// JQuery toggle-nappi trailereille
$(document).ready(function(){
   $(".toggle-btn").click(function() {
     $(".carousel").toggle(1000);
  });
});

function haeElokuvat() {
  var teatteri = document.getElementById("teatteri_id").value; // Haetaan halutun teatterin ID ja syötetään se teatteri-muuttujaan
  // Perus XML request
  xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", "https://www.finnkino.fi/xml/Schedule/?area=" + teatteri, true); // Haetaan finnkino xml ja syötetään sen perään aiemmin tehty muuttuja
  xmlhttp.send();
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
    var xml = xmlhttp.responseXML;
    var nimi = xml.getElementsByTagName("Title"); // Elokuvan nimi
    var kuva_landscape = xml.getElementsByTagName("EventLargeImageLandscape"); // Leveä, parempi resoluutioinen kuva. NOTE-TO-SELF: kokeile vielä, jos saat pystykuvan (EventLargeImagePortrait) kanssa näyttämään hyvältä.
    var teatteri_sali = xml.getElementsByTagName("TheatreAndAuditorium"); // Teatteri ja sali
    var rating = xml.getElementsByTagName("RatingImageUrl"); // Elokuvan rating
    var kesto = xml.getElementsByTagName("LengthInMinutes"); // Elokuvan kesto minuutteina -- lisää alotusajan ja päättymisajan loppuun
    var aloitusaika = xml.getElementsByTagName("dttmShowStart"); // Elokuvan aloitusaika
    var paattymisaika = xml.getElementsByTagName("dttmShowEnd"); // Elokuvan paattymisaika
    var kieli = xml.getElementsByTagName("PresentationMethodAndLanguage"); // Elokuvan kieli ja onko 2D vai 3D
    var genret = xml.getElementsByTagName("Genres"); // Elokuvan genret

    // Luodaan elementit, joiden mukaan elokuvalista kasataan
    var lista = '<div class="grid_system"><div class="row">'; // Muuttuja lista, johon lisätään muut elementit. Tätä ei haluta tehdä useaan kertaan, joten jätetään for-loopin ulkopuolelle
    for (var i = 0; i < nimi.length; i++) { // Perus for-looppi, jota pyöritetään niin kauan, kuin elokuvia löytyy nimeltä (title)
      // Lisätään tarvittavat divit ja sitten aletaan kasaamaan sisältöä. Käytetään Bootstrapin cardeja, jotta sisältö pysyy kuosissa ja mahdollisimman yhtenäisesti.
      // Childnodes tuntui olevan ainoa keino, jolla sisällön sai kunnolla kasaan. Firstchild toimi myös, mutta ei pysty lataamaan uutta sisältöä, jos kertaalleen ladattu.

      lista += '<div class="col-lg-4 col-md-6"><img width="100%" src="' + kuva_landscape[i].childNodes[0].nodeValue + '" alt="elokuva"><div class="card-body"><h4 align="left">' + nimi[i].childNodes[0].nodeValue + '</h4><h6 align="left">' + teatteri_sali[i].childNodes[0].nodeValue + '</h6><p class="tiedot" align="left">' + aloitusaika[i].innerHTML.slice(11, 16) + '-' +  paattymisaika[i].innerHTML.slice(11, 16) + ' (' + kesto[i].childNodes[0].nodeValue + ' minuuttia)' + '<br>' + kieli[i].childNodes[0].nodeValue + '<br>' + genret[i].childNodes[0].nodeValue + '</p><img src="' + rating[i].childNodes[0].nodeValue + '" alt="rating" align="right" style="margin-top: -110px"></div></div>';
    }
      lista += '</div></div>'; // For-looppi kun on pyöritetty, suljetaan aiemmin tehty grid systeemi ja row
      document.getElementById("lista").innerHTML = lista; // Lisätään HTML-tiedostoon tehty sisältö (lista-diviin)
    }
  }
};
