"use strict"

//Define some variable
let experienceEl = $("#experience")[0];
let API;

//Get element for mainmenu
var mainMenu = document.getElementById("mainmenu");

//Code that support to toggle the menu
$("#toggle-menu").click(function ()
{
   if (mainMenu.style.display === "block")
      mainMenu.style.display = "none";
   else
      mainMenu.style.display = "block";
})

//Event handler for update and add
$('#addExperience')[0].addEventListener("click", updateExperience);
$('#addExperience')[0].addEventListener("click", addExperience);

//This function take care handling the reset. Remove id and change the button text
$('#reset')[0].addEventListener("click", () =>
{
   $("#addExperience").val("Lägg till erfarenhet");
   $('#experienceId').val('');
});

//Check which devmode you have
if (devMode)
   API = "http://localhost:8080/DT173G_PRJ_RESTAPI/"; //address to local server REST-API
else
   API = "https://studenter.miun.se/~tojo8500/dt173g/projekt/restapi/";   //address to server REST-API


//This function getExperiences will consume a REST-API by using the fetch API function with the default
//method GET. It will fill some divs with the data received from the REST-API.
function getExperiences(action)
{
   fetch(API + "experience.php")
      .then(response => response.json())
      .then(data =>
      {
         if (data.message !== "No educations found")
         {
            experienceEl.innerHTML = "<thead> <tr><th>Arbetsplats</th><th>Titel</th> <th>Start</th><th>Slut</th> <th>Beskrivning</th><th>Delete</th> <th>Update</th></tr></thead>";

            data.forEach(item =>
            {
               experienceEl.innerHTML += `<tr id=${item.id}>
               <td>${item.workplace}</td>
               <td>${item.title}</td>
               <td class="year-month">${item.start.substring(0, 7)}</td>
               <td class="year-month">${item.end.substring(0, 7)}</td>
               <td>${item.description}</td>
               <td><button class="btn" onclick="deleteExperience(${item.id})">Delete</button></td>
               <td><button class="btn btn-update" onclick="prepareUpdateExperience(${item.id})">Update</button></td>
               </tr>`;
            });
         }
      }).catch(error =>
      {
         console.log('Error:', error);
         //alert("An error occured with getExperiences: " + error);
      })

      setTimeout(function()
      {
         $("#myform").css("display", "block");
      }, 400);
}

//This function deleteExperience will consume a REST-API by using the fetch api function with the DELETE 
//method. It will delete the experience with the selected id and call getExperiences to refresh the screen.
function deleteExperience(id)
{
   //Remove hidden id if you have removed the row with this id
   if (id == $('#experienceId').val())
   {
      $('#experienceId').val('');
   }

   fetch(API + "experience" + '?id=' + id, {
      method: 'DELETE',
   })
      .then(response => response.json())
      .then(data =>
      {
         getExperiences();
      })
      .catch(error =>
      {
         console.log('Error:', error);
         //alert("An error occured when deleteCourse:" + error);
      })
}

//This function just prepare for update which mean just load the values from the table
//into the form
function prepareUpdateExperience(id)
{
   //Read the values from the row you clicked on into an array
   let arrExperience = [];
   $('#' + id).find("td").each(function ()
   {
      arrExperience.push($(this).text().trim())
   });

   //Load the form with values
   $("#workplace").val(arrExperience[0]);
   $("#title").val(arrExperience[1]);
   $("#start").val(arrExperience[2]);
   $("#end").val(arrExperience[3]);

   //Add id as a hidden fied
   $('#experienceId').val(id);

   //Change the text for update
   $("#addExperience").val("Uppdatera erfarenhet");

   document.getElementById("scroll-to-here").scrollIntoView();
}

//This function updateExperience will consume a REST-API by using the fetch api function with 
//the PUT method. It will update the education with the selected id and call getExperiences 
//to refresh the screen.
function updateExperience(ev)
{
   //Prevent formload
   ev.preventDefault();

   let arrExperience = [];
   let id = $('#experienceId').val(); //Get id from hidden field in form

   //If you don't have a valid id return
   if (id === '') return;

   //Every field must be filled in
   if (isFormValid())
   {
      let obj = handleDate($("#start").val(), $("#end").val());

      //Load value from form into array
      arrExperience.push($("#workplace").val());
      arrExperience.push($("#title").val());
      arrExperience.push($("#description").val());

      let experience = { "workplace": arrExperience[0], "title": arrExperience[1], "start": obj.start, "end": obj.end, "description": arrExperience[2] }

      fetch(API + "experience" + '?id=' + id, {
         method: 'PUT',
         body: JSON.stringify(experience)
      })
         .then(response => response.json())
         .then(data =>
         {
            getExperiences();
            //$('#' + id).css('background-color', 'green');
         })
         .catch(error =>
         {
            console.log('Error:', error);
            //alert("An error occured when updateEducation: " + error);
         })
   }
   else
   {
      alert("Du har tomma fält i funktionen formuläret");
   }
}

//Make sure that every field has beeb filled in
function isFormValid()
{
   return $('#workplace').val() === "" || $('#title').val() === "" || $('#start').val() === "" ||  $('#end').val() === "" ||  $('#description').val() === "" ? false : true;
}

//This function addExperience will consume a REST-API by using the fetch api function with 
//the POST method. It will create a new experience and call addExperience to refresh the screen.
function addExperience(ev)
{
   //Prevent formload
   ev.preventDefault();

   //Get id from hidden field in form
   //Because I use two event handler for the same event. Add is invalid if id > 0  
   if ($('#experienceId').val() > 0) 
      return;

   //Handle date with validation and error message
   let obj = handleDate($("#start").val(), $("#end").val());

   if (isFormValid())
   {
      let experience = { 'workplace': $('#workplace').val(), 'title': $('#title').val(), 'start': obj.start, 'end': obj.end, 'description': $('#description').val() };

      fetch(API + "experience", {
         method: 'POST',
         body: JSON.stringify(experience),
      })
         .then(response => response.json())
         .then(data =>
         {
            getExperiences();
         })
         .catch(error =>
         {
            console.log('Error:', error);
            //alert("An error occured when addCourse:"+ error);
         })
   }
   else
   {
      alert("Du har tomma fält i funktionen formuläret");
   }
}

//I can pass in either YYYY-MM or YYYY-MM-DD
//If I pass in YYYY-MM-DD I replace DD with 01
function validateDate(dateString)
{
   if (dateString.length > 7)
   {
      dateString = dateString.substring(0, 7);
   }
   dateString = dateString + '-01';

   // Date format: YYYY-MM-DD
   var datePattern = /^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;

   // Check if the date string format is a match
   var matchArray = dateString.match(datePattern);
   if (matchArray == null)
   {
      return false;
   }

   // Remove any non digit characters
   var cleanDateString = dateString.replace(/\D/g, '');

   // Parse integer values from date string
   var year = parseInt(cleanDateString.substr(0, 4));
   var month = parseInt(cleanDateString.substr(4, 2));
   var day = parseInt(cleanDateString.substr(6, 2));

   // Define number of days per month
   var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

   // Adjust for leap years
   if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
   {
      daysInMonth[1] = 29;
   }

   // check month and day range
   if (month < 1 || month > 12 || day < 1 || day > daysInMonth[month - 1])
   {
      return false;
   }

   // You made it through!
   return true;
}

// This is the engine for handling and validating both start and end date
function handleDate(start, end)
{
   //Validate start date
   if (!validateDate(start))
   {
      alert("Felaktigt startdatum Format:YYYY-MM");
      return;
   }

   start = start.length > 7 ? start.substring(0, 7) + '-01' : start + '-01';

   //Validate end date
   if (!validateDate(end))
   {
      alert("Felaktigt slutdatum:Format:YYYY-MM");
      return;
   }
   end = end.length > 7 ? end.substring(0, 7) + '-01' : end + '-01';

   if (Date.parse(start) > Date.parse(end))
   {
      alert("Start datum måste ligga före i tiden");
      return;
   }
   return { start: start, end: end }
}

/* Make the menu visible if it's hidden when screen is wider then 600px */
$(window).resize(function () 
{
   var width = $(window).width();
   var x = document.getElementById("mainmenu");
   if (window.getComputedStyle(x).display === "none" && width > 600) 
   {
      $("#mainmenu").removeAttr("style");
   }
});

//Is called when the DOM is loaded
$(function ()
{
   getExperiences();
});