//define UI vars(step-1) start

const Form =document.querySelector('#movie-form');
const InputMovie = document.querySelector('#Movie');
const FilterMovie = document.querySelector('#filter');
const MovieList = document.querySelector('.collection');
const Btn = document.querySelector('.clear-movie');


//(step-1) closed


//load Evenets (step-2) start

LoadEventListner();

function LoadEventListner() {

  //Dom load event
    document.addEventListener('DOMContentLoaded', getMovies); //(Step-2(5))

    //add movie event
    Form.addEventListener('submit', addMovie); //(Step-2(1))
    //clear movie event
    MovieList.addEventListener('click' , removeMovie);//(Step-2(2))

    //clear movie btn event
    Btn.addEventListener('click', clearbtn);//(Step-2(3))

    //filter movie event
    FilterMovie.addEventListener('keyup', search);//(Step-2(4))
}
//(step-2) finished


//get movies from ls (step-8) start
function getMovies(){
  let movies;
  if ( localStorage.getItem('movies') === null ) {
    movies =[];

    
  } else {
    movies =JSON.parse(localStorage.getItem('movies'));
    
  }
  movies.forEach(function(Movie){
    //create li element
    const li = document.createElement('li');


    //add a class to li

    li.className = 'collection-item';
    //append the input value to li
    li.appendChild(document.createTextNode(Movie));

    //create new link element 

    const link = document.createElement('a');

    //add class to link
    link.className = 'delete-item secondary-content';

    //add icon to link
    link.innerHTML = '<i class="fa fa-remove"></i>';

    //append link to li
    li.appendChild(link);

    //append li to Ul
    MovieList.appendChild(li);
  });
}
//(step-8) finished

//add movies(Step-3) start

function addMovie(e) {
    if ( InputMovie.value === '' ) {
        alert('add a movie');

    }

    //create li element
    const li = document.createElement('li');


    //add a class to li

    li.className = 'collection-item';
    //append the input value to li
    li.appendChild(document.createTextNode(InputMovie.value));

    //create new link element 

    const link = document.createElement('a');

    //add class to link
    link.className = 'delete-item secondary-content';

    //add icon to link
    link.innerHTML = '<i class="fa fa-remove"></i>';

    //append link to li
    li.appendChild(link);

    //append li to Ul
    MovieList.appendChild(li);

//store movie in localstorage int function

storeMovieInlocalStorage(InputMovie.value); //(Step-3(2))

//clear movie
    InputMovie.value = '';

    e.preventDefault();

}

//(step-3) finished

//store movie in Ls (step-7) start
function storeMovieInlocalStorage(Movie){
  let movies;
  if ( localStorage.getItem('movies') === null ) {
    movies =[];

    
  } else {
    movies =JSON.parse(localStorage.getItem('movies'));
    
  }
movies.push(Movie);
localStorage.setItem('movies', JSON.stringify(movies));

}
//(step-7)finished


//Movie remove function (step-4) start

function removeMovie(e){
    if (e.target.parentElement.classList.contains('delete-item')) {

      if (confirm('Are you sure to remove')) {
        e.target.parentElement.parentElement.remove();
        
        //remove from localstorage
        removeFromLocalStorage(e.target.parentElement.parentElement);
      }
     }
   }

//Remove from local storage (step-9)start
function removeFromLocalStorage(movieItem){
  let movies;
  if ( localStorage.getItem('movies') === null ) {
    movies =[];

    
  } else {
    movies =JSON.parse(localStorage.getItem('movies'));
    
  }
  movies.forEach(function(Movie,index){
    if(movieItem.textContent === Movie){
      movies.splice(index , 1)
    }
  });
  localStorage.setItem('movies',JSON.stringify(movies));

}
//step -9 finished

//(step-4) closed


  //clear btn function (Step-5) start
  function clearbtn(){
    if (confirm("Delete all Movie")) {
       MovieList.innerHTML = '';
    }  

    clearMovieFromLocalStorage();
  }


//clearmovie btn from localstorage function(step-10)start
  function clearMovieFromLocalStorage(){
    localStorage.clear();

  }
  //step-10 finished
// (step-5) finished

  //Filter movie Function (Step-6) start
  function search(e){
    const text = e.target.value.toLowerCase();
   document.querySelectorAll('.collection-item').forEach(
     function(Movie){

       const item = Movie.firstChild.textContent;
       if(item.toLowerCase().indexOf(text) != -1){
        Movie.style.display='block';
       } else {
        Movie.style.display='none';
       }
     }); 
  }
  //(step 6) finished