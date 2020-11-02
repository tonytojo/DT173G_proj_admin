# Kursen Webbutveckling III(DT173G), Projekt REST-webbtjänster

## Syfte

Syftet med denna admin page är att kunna hantera förändringar som man vill kunna göra
De förändringar som man kan göra är lägga till ny utbildningar, uppdatera utbildning samt radera utbildning
Denna tjänst kan anropas om man vill få information om utbildning,erfarenhet eller webbsidor.
Denna tjänst använder JSON format genomgående dvs alla data som man skickar in är json och lika så returerad data är också i json. 

### Description

Detta packet kallar jag för admin modulen eftersom denna modul består av flera delar. Denna
del konsumererar ett REST-API
De viktigaste php sidorna är login.php, logout.php, admin.php, education.php, experience.php och webbsite.php.
Sedan har jag några andra sidor som footer.php, header.php, mainmenu.php,config.php och user.php.
Sidan config.php hanteras connection information mot databasen
Sidan user.php innehåller sql för att accessa databasen

Alla sidor anknutna till admin är skyddade sidor och kräver inloggning. Dessa sidor är: 
admin.php, education.php, experience.php och webbsite.php. Om man anger någon av dessa sidor i urlen sker en redirect till login.php om man inte har en session key. 
En session key får man vid en lyckad inlogging. 
Felaktiga credentials i login.php ger ett felmeddelandet "Felatig användarnamn eller lösenord"
Om man anger en skyddad sida i url utan session key ges felmeddelandet "Inloggning krävs"

Vid en lyckad inlogging sker en redirect to admin.php.
När DOM är klar för admin.php körs 
$(function ()
{
   getEducations(); //Denna listar alla utbildningar
   getWebbsites(); //Denna listar alla webbplatser
   getExperiences(); //Denna listar alla erferenheter
});

Admin.php är presentationssidan där man listar utbildningar, webbplatser och erfarenheter som tabeller. Admin.php är readonly. Jag använder thead för att skapa kolumner med en titel.
Alla rader inleder med tbody.

I denna admin.php finns en meny med fyra stycken items vilka är:
1. Hem leder till admin.php
2. Utbildning leder till sidan education.php
3. Webbplatser leder till sidan webbplatser.php
4. Erfarenhet leder till sidan experience.php
5. LogOut raderar session key och ger en redirect tillbaka till login.php

Sidan education.php är sidan som du använder för att förändra innehållet för utbildning.
Jag använder en tabell för att visa alla data för utbildning där de två sista kolumnerna är "Delete" och "Update" Alla rader som visas i tabellen har ett id. 
Det finna också ett formulär som används för uppdatering samt lägga till en ny utbildning

Beskrivning av Delete
=======================
När jag klickar på knappen "Delete" anropas funktionen deleteEducation.
Som man kan se här <button class="btn" onclick="deleteEducation(51)">Delete</button>
skickar jag med utbildningen id vid anrop till funktionen deleteEducation.
Denna deleteEducation funktion gör ett fetch anrop med metoden DELETE och query string ?id=51.

fetch(API + "education" + '?id=' + id, {
      method: 'DELETE',
   })

För att säkerställa att delete fungerade görs också en refresh genom getEducations() som uppdaterar skärmen.


Beskrivning av Update
======================
Om jag istället klickar på knappen Update anropas funktionen prepareUpdateEducation
Som man kan se här <button class="btn btn-update" onclick="prepareUpdateEducation(74)">Update</button>
skickar jag med utbildningen id som argument vid anrop av funktionen.
Denna prepareUpdateEducation läser ut från DOM vilka data som finns på raden med id = 74
Funktionen gör sedan följande 
1. Ladda formuläret med de data som fanns för raden med id=74
2. Tilldela id till hidden field educationId i formuläret
3. Ändra texten "Lägg till utbildning" till "Uppdatera utbildning" eftersom vi ska uppdatera en 
   utbildning.
4. Scrolla skärmen till formulär. Detta är en smidig och bra funktion eftersom vid klick på update   
   kommer skärmen automatiskt att scrollas till formuläret där alla data visas. Detta är en smidig och bra funktion som underlättar förståelsen för användaren hur update fungerar. Om jag inte hade använd denna scroll funktion skulle kanske användaren bli konfunderad när inte form visas. Han skulle då bli tvungen att scrolla ned som skulle kunna vara många sidor.
   Nu kan användaren ändra i formuläret som han vill och sedan klicka på knappen Uppdatera utbildning
   Denna knappen Uppdatera utbildning har följande utseende
   <input class="submit-btn" id="addEducation" type="submit" value="Uppdatera utbildning">
   
   Jag har följande två event hanterare för samma click event
   $('#addEducation')[0].addEventListener("click", updateEducation); 
   $('#addEducation')[0].addEventListener("click", addEducation);
   Som man kan se kommer båda dessa eventhantera updateEducation och addEducation att anropas när man klickar på knappen med id=addEducation.
   
   Eftersom båda eventhanterarna anropas måste jag har kontroller så jag inte kör en addEducation fullt ut när jag egentligen vill göra en update och omvänt
   I början på funktionen addEducation kontrollerar jag värdet på hidden field educationId.
   Om detta värde är > 0 så innebär detta att jag har en pending update på gång och gör därför en return från dennas funktion.
   function addEducation()
   {
    if ( $('#educationId').val() > 0)  //Har jag en pending update på gång?
       return; 
    . . .
   Om hidden field inte är > 0 ladda ett objekt med värden från formuläret och gör en fetch med metoden POST.

   I funktionen updateEducation hämtar jag först educationId från hidden field i formuläret.
   Om värdet på detta är tomt dvs "" har jag ingen pending update på gång utan gör return
   function updateEducation()
   {
      let id = $('#educationId').val();
      if (id === '') return //Om tomt då har jag ingen pending update på gång utan gör return

      Ladda ett objekt med värden från formuläret och gör en fetch med metoden PUT med query string educationId från hidden field.

       För att säkerställa att Update fungerade görs också en refresh genom getEducations() som uppdaterar skärmen.

Beskrivning av ADD
==================
    Om jag vill skapa en ny post matar jag in nya värden i formuläret och klickar på knappen 
    Lägg till utbildning. Knappen ser nu ut så här.
    <input class="submit-btn" id="addEducation" type="submit" value="Lägg till utbildning">
    Återigen anropar jag båda eventhanterarna updateEducation och addEducation för samma click event.
    Både eventhanterarna anropas och kontroller görs i början på båda för att undersöka
    vilken av de både eventhanterarna som ska användas.

    För att säkerställa att Update fungerade görs också en refresh genom getEducations() som uppdaterar skärmen.

   Reset knapp
   ===========
    I formuläret har jag också en Reset knapp som rensar gamla värden från formuläret.
    Denna knapp ser ut så här <input id="reset" class="reset" type="reset" value="Reset">
    Till denna reset knapp har jag en eventhanterare som ser ut så här.
    $('#reset')[0].addEventListener("click", function() {
         $("#addEducation").val("Lägg till utbildning");
         $('#educationId').val('');
   });

   När man klickar på reset knappen händer följande.
   1. Alla värden som finns i formuläret tas bort
   2. Jag återställer texten på knappen addEducation till "Lägg till utbildning"
   3. Jag nollställer hidden field educationId till ""

Hamburgarmenyn fungerar så här.
1. Har en button med detta utseende <button id="toggle-menu">Visa/dölj</button>
2. Denna har display:none
3. Vid klick på knappen med id="toggle-menu" på små skärmar sker en toggle
   $("#toggle-menu" ).click(function() {
      if (mainMenu.style.display === "block") 
         mainMenu.style.display = "none";
   else 
      mainMenu.style.display = "block";
   })
Vid responsive design får jag använda ganska omfattande css för att få varje rad att fungera som
en kolumn i stället.

Alla JavaScript filerna education.js, experience.js och webbsite.js är uppbyggda på samma sätt.
Så det som jag har beskrivit här gäller också för de andra två. Det är en sak som emellertid
skiljer och det är att webbplatser har en anchor tag med en href. För att hämta den och senare visa den i form gör jag så här.
$('#' + id).find("a").each(function ()
{
   a_href = $(this).attr('href').split('=');
}); 

## Installation

En installation av remote repository går till på följande sätt.

1. git clone https://github.com/tonytojo/DT173G_proj_admin.git DT173G_proj_admin
2. cd DT173G_proj_admin

