"use strict"

//Define some variable
let educationEl = $("#education")[0];
let API;

//Get element for mainmenu
var mainMenu = document.getElementById("mainmenu");

//Code that support toggle the menu
$("#toggle-menu").click(function ()
{
   if (mainMenu.style.display === "block")
      mainMenu.style.display = "none";
   else
      mainMenu.style.display = "block";
})

//Event handler for update and add
$('#addEducation')[0].addEventListener("click", updateEducation);
$('#addEducation')[0].addEventListener("click", addEducation);

//This function take care handling the reset. Remove id and change the button text
$('#reset')[0].addEventListener("click", function ()
{
   $("#addEducation").val("Lägg till utbildning");
   $('#educationId').val('');
});

//Check which devMode you have
if (devMode)
   API = "http://localhost:8080/DT173G_PRJ_RESTAPI/"; //address to the local host server REST-API
else
   API = "https://studenter.miun.se/~tojo8500/dt173g/projekt/restapi/"; //address to server REST-API


//This function getEducation will consume a REST-API by using the fetch API function with the default
//method GET. It will fill some divs with the data received from the REST-API.
function getEducations(action)
{
   fetch(API + "education.php")
      .then(response => response.json())
      .then(data =>
      {
         if (data.message !== "No educations found")
         {
            educationEl.innerHTML = "<thead> <tr><th>Lärosäte</th> <th>Kursnamn</th> <th>Kursår</th> <th>Delete</th> <th>Update</th></tr></thead>";

            data.forEach(item => 
            {
               educationEl.innerHTML += `<tr id=${item.id}>
               <td>${item.higher_education_instution}</td>
               <td>${item.course_name}</td>
               <td>${item.start.substring(0, 4)}</td>
               <td><button class="btn" onclick="deleteEducation(${item.id})">Delete</button></td>
               <td><button class="btn btn-update" onclick="prepareUpdateEducation(${item.id})">Update</button></td>
               </tr>`;
            });
         }
      }).catch(error =>
      {
         console.log('Error:', error);
         //alert("An error occured with getCourses: " + error);
      })

       setTimeout(function()
      {
         $("#myform").css("display", "block");
      }, 200);
}

//This function deleteEducation will consume a REST-API by using the fetch api function with the DELETE method
//It will delete the education with the selected id and call getEducation to refresh the screen.
function deleteEducation(id)
{   
   //Remove hidden id if you have removed the row with this id
   if (id == $('#educationId').val())
   {
      $('#educationId').val('');
   }

   fetch(API + "education" + '?id=' + id, {
      method: 'DELETE',
   })
      .then(response => response.json())
      .then(data =>
      {
         getEducations();
      })
      .catch(error =>
      {
         console.log('Error:', error);
         //alert("An error occured when deleteCourse:" + error);
      })
}

//This function just prepare for update which mean just load the values from the table
//into the form
function prepareUpdateEducation(id)
{
   //Read the values from the row you clicked on into an array
   let arrEducation = [];
   $('#' + id).find("td").each(function ()
   {
      arrEducation.push($(this).text().trim())
   });

   //Load the form with values
   $("#school").val(arrEducation[0]);
   $("#courseName").val(arrEducation[1]);
   $("#year").val(arrEducation[2]);

   //Add id as a hidden fied
   $('#educationId').val(id);

   //Change the text for update
   $("#addEducation").val("Uppdatera utbildning");

   //Scroll to the form start
   document.getElementById("scroll-to-here").scrollIntoView();
}

//This function updateEducation will consume a REST-API by using the fetch api function with 
//the PUT method. It will update the education with the selected id and call getEducations 
//to refresh the screen.
function updateEducation(ev)
{
   //Prevent formload
   ev.preventDefault();

   let arrEducation = [];
   let id = $('#educationId').val(); //Get id from hidden field in form

   //If the id is noll or '' it means that we have cleared the fields så it's invalid to update
   if (id === '')
      return;

   // Validate that we have a number because this is a specified year
   if (!isNumber($("#year").val()))
   {
      alert("Du har angivit ett ogiltigt årtal");
      return;
   }

   if (isFormValid())
   {
      //Load value from form into array
      arrEducation.push($("#school").val());
      arrEducation.push($("#courseName").val());
      arrEducation.push($("#year").val());

      let education = { "higher_education_instution": arrEducation[0], "course_name": arrEducation[1], "start": arrEducation[2] + "-01-01", "end": "2020-01-01" }

      fetch(API + "education" + '?id=' + id, {
         method: 'PUT',
         body: JSON.stringify(education)
      })
         .then(response => response.json())
         .then(data =>
         {
            getEducations();
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

//Make sure that every field has been filled in
function isFormValid()
{
   return $('#school').val() === "" || $('#courseName').val() === "" || $('#year').val() === "" ? false : true;
}

//Validate that you have a number
function isNumber(n) 
{ 
   return /^-?[\d.]+(?:e-?\d+)?$/.test(n); 
}

//This function addEducation will consume a REST-API by using the fetch api function with 
//the POST method. It will create a new education and call getEducations to refresh the screen.
function addEducation(ev)
{
  //Prevent formload
  ev.preventDefault();

   //If I click on update I get an id so only function update is valid which
   //mean if I have and id that > 0 do return
   //Get id from hidden field in form
   if ($('#educationId').val() > 0)
      return;

   if (isFormValid())
   {
      let education = { 'higher_education_instution': $('#school').val(), 'course_name': $('#courseName').val(), 'start': $('#year').val() + "-01-01", 'end': '2020-01-01' };

      fetch(API + "education", {
         method: 'POST',
         body: JSON.stringify(education),
      })
         .then(response => response.json())
         .then(data =>
         {
            getEducations();
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
   getEducations();
});