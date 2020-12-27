import './App.css';
import { HolidayAPI } from 'holidayapi';
import axios from 'axios';

const currDate = new Date();

function addToHtml(add){
  document.getElementById("todaysHd").innerHTML = "<h2>Today's Holiday :</h2>"+add;
}

function fetchHoliday(month,date)
{
 axios.get("https://holidayapi.com/v1/holidays?pretty&key=7cfe185c-1544-4371-9b97-5d4babd3d097&country=IN&month="+month+"&day="+date+"&year=2019").then(function (response) {
    // handle success
    // console.log(response.data);
    if(response.data.holidays.length !== 0)
    {
      var hdlist = response.data.holidays;
      addToHtml(hdlist[0].name);
    }
    else{
      addToHtml("Sorry, No holiday today :( ");
    }
});
}

function fetchThisMonthHd(month)
{
  var html="";
  axios.get("https://holidayapi.com/v1/holidays?pretty&key=7cfe185c-1544-4371-9b97-5d4babd3d097&country=IN&month="+month+"&year=2019").then(function (response) {
    // handle success
    console.log(response.data);
    var hdlist=response.data.holidays;
    hdlist.forEach(function (hd){
      html+='<li>'+hd.name+'    '+hd.date+'</li>';
    });
    document.getElementById("holidays").innerHTML += html;
  });
}

function fetchRecipe(hd){
  var html="";
  axios.get("https://api.edamam.com/search?app_id=88173303&app_key=5ca8f53bc027a3581bfa4d44343ecbc9&q="+hd+"&from=0&to=3").then(function (response) {
    // handle success
    console.log(response.data);
    var recipes=response.data.hits;
    console.log(recipes);
    recipes.forEach(function (recipe){
      html+='<div className="recipe"><div className="recipeLabel">'+recipe.recipe.label+'</div><button className="recipeLink"><a target="_blank" href="'+recipe.recipe.shareAs+'">Recipe</a></div></button>';
    });
    console.log(html);
    document.getElementById("food").innerHTML += html;
  });
}

// const Gift = () =>{
//   return(
    
//   );
// }

const Today = () => {
  fetchHoliday(currDate.getMonth()+1,currDate.getDate()+1);  
  return(
    <section className="today">
      
      <div id="todaysHd">
           
      </div>

    </section>
  );
}

const ThisMonth = () =>{
  fetchThisMonthHd(currDate.getMonth()+1);
  return(
    <section id="holidays">
    </section>
  )
}

const Recipe = () =>{
  // fetchRecipe(hdlist[0].name);
  fetchRecipe("Christmas");
  return (
    <section id="food">

    </section>
  );
}

const Heading = () =>{
  return (
    <section className="header">
      <h1>Here for the holidays</h1>
    </section>
  );
}

function App() {
  return (
    <div className="App">
      <div class="snowflakes" aria-hidden="true">
    <div class="snowflake">
    ❅
    </div>
    <div class="snowflake">
    ❅
    </div>
    <div class="snowflake">
    ❆
    </div>
    <div class="snowflake">
    ❄
    </div>
    <div class="snowflake">
    ❅
    </div>
    <div class="snowflake">
    ❆
    </div>
    <div class="snowflake">
    ❄
    </div>
    <div class="snowflake">
    ❅
    </div>
    <div class="snowflake">
    ❆
    </div>
    <div class="snowflake">
    ❄
    </div>
    </div>  
      <Heading></Heading>
      <Today></Today>
      <div className="grid">
         {/* <section id="gifts">
        </section> */}
        <Recipe></Recipe>
        <ThisMonth></ThisMonth>
      </div>
    </div>
  );
}

export default App;