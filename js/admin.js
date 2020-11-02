"use strict"

//Define some variable
let educationEl = $("#education")[0];
let webbsiteEl  = $("#webbsite")[0];
let experienceEl = $("#experience")[0]; 
let API;

//Get element for mainmenu
var mainMenu = document.getElementById("mainmenu")

//Code that support toggle the menu
$("#toggle-menu" ).click(function() {
   if (mainMenu.style.display === "block") 
      mainMenu.style.display = "none";
   else 
      mainMenu.style.display = "block";
})

//Check which devMode you have
if (devMode)
   API = "http://localhost:8080/DT173G_PRJ_RESTAPI/"; //address to local server REST-API
else
   API = "https://studenter.miun.se/~tojo8500/dt173g/projekt/restapi/"; //address to server REST-API


//This function getEducation will consume a REST-API by using the fetch API function with the default
//method GET. It will fill some divs with the data received from the REST-API.
function getEducations()
{
    fetch(API + "education.php")
      .then(response => response.json())
      .then(data =>
      {             
         if (data.message !== "No educations found")
         {
            educationEl.innerHTML = "<thead><tr><th>Lärosäte</th> <th>Kursnamn</th><th>Kursår</th></tr></thead>";
                                 
             data.forEach(item =>
            {    
               educationEl.innerHTML += `<tr id=${item.id}><td>${item.higher_education_instution}</td><td>${item.course_name}</td><td>${item.start.substring(0,4)}</td></tr>`;
            });
         }
      }).catch(error =>
      {
         console.log('Error:', error);
         alert("An error occured with getCourses: " + error);
      })
}

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
         webbsiteEl.innerHTML = "<thead><tr><th>Title</th> <th>Url</th><th>Beskrivning</th></tr></thead>";
                                  
         data.forEach(item =>
         {              
            webbsiteEl.innerHTML += `<tr id=${item.id}><td>${item.title}</td> <td>${item.url}</td> <td>${item.description}</td></tr>`; 
         });
      }
    
   })  .catch(error =>
   {
      console.log('Error:', error);
      alert("An error occured with getCourses: " + error);
   })
}

//This function getExperiences will consume a REST-API by using the fetch API function with the default
//method GET. It will fill some divs with the data received from the REST-API.
function getExperiences()
{
   fetch(API + "experience.php")
   .then(response => response.json())
   .then(data =>
   {         
      if (data.message !== "No educations found")
      {
         experienceEl.innerHTML = "<thead><tr><th>Arbetsplats</th> <th>Title</th> <th>Start</th> <th>End</th> <th>Beskrivning</th></tr></thead>";
            
         data.forEach(item =>
         {              
            experienceEl.innerHTML += `<tr id=${item.id}> <td>${item.workplace}</td> <td>${item.title}</td> <td class="year-month">${item.start.substring(0,7)}</td> <td class="year-month">${item.end.substring(0,7)}</td> <td>${item.description}</td></tr>`; 
         });
      }
    
   })  .catch(error =>
   {
      console.log('Error:', error);
      alert("An error occured with getCourses: " + error);
   })
}


/* Make the menu visible if it's hidden when screen is wider then 600px */
$( window ).resize(function() 
{
    var width =  $( window ).width(); 
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
   getWebbsites();
   getExperiences();
});