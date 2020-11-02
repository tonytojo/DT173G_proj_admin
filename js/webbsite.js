"use strict"

//Define some variable
let webbsiteEl = $("#webbsite")[0];
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
$('#addWebbsite')[0].addEventListener("click", updateWebbsite);
$('#addWebbsite')[0].addEventListener("click", addWebbsite);

//This function take care handling the reset. Remove id and change the button text
$('#reset')[0].addEventListener("click", function ()
{
   $("#addWebbsite").val("Lägg till webbplats");
   $('#webbsiteId').val('');
});

//Check which devmode you have
if (devMode)
   API = "http://localhost:8080/DT173G_PRJ_RESTAPI/"; //address to server REST-API
else
   API = "https://studenter.miun.se/~tojo8500/dt173g/projekt/restapi/"; //address to server REST-API

//This function getWebbsites will consume a REST-API by using the fetch API function with the default
//method GET. It will fill some divs with the data received from the REST-API.
function getWebbsites()
{
   fetch(API + "webbsite.php")
      .then(response => response.json())
      .then(data =>
      {
         if (data.message !== "No educations found")
         {
            webbsiteEl.innerHTML = "<thead><tr><th>Titel</th> <th>Url</th> <th>Beskrivning</th> <th>Delete</th> <th>Update</th></tr></thead>";

            data.forEach(item =>
            {
               webbsiteEl.innerHTML += `<tr id=${item.id}>
               <td>${item.title}</td>
               <td> <a target="_blank" href=${item.url}>Webbsidan</a></td>
               <td>${item.description}</td> 
               <td><button class="btn" onclick="deleteWebbsite(${item.id})">Delete</button></td>
               <td> <button class="btn btn-update" onclick="prepareUpdateWebbsite(${item.id})">Update</button></td>`;
            });
         }

      }).catch(error =>
      {
         console.log('Error:', error);
         alert("An error occured with getWebbsites: " + error);
      })

      setTimeout(function()
      {
         $("#myform").css("display", "block");
      }, 400);
}

//This function deleteWebbsite will consume a REST-API by using the fetch api function with the DELETE 
//method. It will delete the webbsite with the selected id and call getWebbsites to refresh the screen.
function deleteWebbsite(id)
{
    //Remove hidden id if you have removed the row with this id
    if (id == $('#webbsiteId').val())
    {
       $('#webbsiteId').val('');
    }

   fetch(API + "webbsite" + '?id=' + id, {
      method: 'DELETE',
   })
      .then(response => response.json())
      .then(data =>
      {
         getWebbsites();
      })
      .catch(error =>
      {
         console.log('Error:', error);
         //alert("An error occured when deleteCourse:" + error);
      })
}

//This function just prepare for update which mean just load the values from the table
//into the form
function prepareUpdateWebbsite(id)
{
   //Read the values from the row you clicked on into an array
   let arrWebbsites = [];
   let a_href;

   //Get all paragraph from selected row
   $('#' + id).find("td").each(function ()
   {
      arrWebbsites.push($(this).text().trim())
   });

   //Get the href from selected row
   $('#' + id).find("a").each(function ()
   {
      a_href = $(this).attr('href').split('=');
   });

   //Load the form with values
   $("#title").val(arrWebbsites[0]);
   $("#url").val(a_href);
   $("#description").val(arrWebbsites[2]);

   //Add id to the form as a hidden field
   $('#webbsiteId').val(id);

   //Change the text for update
   $("#addWebbsite").val("Uppdatera webbplatsen");

   //Scroll to the form start
   document.getElementById("scroll-to-here").scrollIntoView();
}

//This function updateWebbsite will consume a REST-API by using the fetch api function with 
//the PUT method. It will update the webbsite with the selected id and call getWebbsites 
//to refresh the screen.
function updateWebbsite(ev)
{
   //Prevent formload
   ev.preventDefault();

   let arrWebbsite = [];
   let id = $('#webbsiteId').val(); //Get id from hidden field in form

   //If the id is noll or '' it means that we have cleared the fields så it's invalid to update
   if (id === '') return;

   if (isFormValid())
   {
      //Load value from form into array
      arrWebbsite.push($("#title").val());
      arrWebbsite.push($("#url").val());
      arrWebbsite.push($("#description").val());

      let webbsite = { "title": arrWebbsite[0], "url": arrWebbsite[1], "description": arrWebbsite[2] }

      fetch(API + "webbsite" + '?id=' + id, {
         method: 'PUT',
         body: JSON.stringify(webbsite)
      })
         .then(response => response.json())
         .then(data =>
         {
            getWebbsites();
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
   return $('#title').val() === "" || $('#url').val() === "" || $('#description').val() === "" ? false : true;
}

//This function addWebbsite will consume a REST-API by using the fetch api function with 
//the POST method. It will create a new webbsite and call getWebbsites to refresh the screen.
function addWebbsite(ev)
{
   //Prevent formload
   ev.preventDefault();

   //If I click on update I get the row id so only function update is valid which
   //mean if I have an id that > 0 return
   //I get id from hidden field in form
   if ($('#webbsiteId').val() > 0) return;

   if (isFormValid())
   {
      let webbsite = { 'title': $('#title').val(), 'url': $('#url').val(), 'description': $('#description').val() };

      fetch(API + "webbsite", {
         method: 'POST',
         body: JSON.stringify(webbsite),
      })
         .then(response => response.json())
         .then(data =>
         {
            getWebbsites();
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
   getWebbsites();
});