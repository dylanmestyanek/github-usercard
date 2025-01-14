/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

let cardsContainer = document.querySelector('.cards');
var userData;

axios
  .get('https://api.github.com/users/dylanmestyanek')
  .then(repo => {
    cardsContainer.appendChild(createComponent(repo.data));
  })
  .catch(err => console.log(err));

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const followersArray = ['LandryIrakoze', 'tetondan', 'dustinmyers', 'justsml', 'luishrd', 'bigknell'];

followersArray.forEach(follower => {
  axios
    .get(`https://api.github.com/users/${follower}`)
    .then(repo => cardsContainer.appendChild(createComponent(repo.data)))
    .catch(err => console.log(err));
  })

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

let expandedCard = false;

function createComponent(obj){
  let cardContainer = document.createElement('div');
  cardContainer.classList.add('card');

  let userContainer = document.createElement('div');
  userContainer.classList.add('userContainer');
  
  let userImg = document.createElement('img');
  userImg.src = `${obj.avatar_url}`;
  
  let cardInfo = document.createElement('div');
  cardInfo.classList.add('card-info');
  
  let nameHeader = document.createElement('h3');
  nameHeader.classList.add('name');
  nameHeader.textContent = `${obj.name}`;
  
  let username = document.createElement('p');
  username.classList.add('username');
  username.textContent = `${obj.login}`;
  
  let usersLocation = document.createElement('p');
  usersLocation.textContent = `${obj.location}`;
  
  let profileText = document.createElement('p');
  profileText.textContent = `Profile:`;
  
  let profileLink = document.createElement('a');
  profileLink.href = obj.html_url;
  profileLink.textContent = ` ${obj.html_url}`;
  profileText.appendChild(profileLink);
  
  let followersText = document.createElement('p');
  followersText.textContent = `Followers: ${obj.followers}`;
  
  let followingText = document.createElement('p');
  followingText.textContent = `Following: ${obj.following}`;
  
  let userBio = document.createElement('p');
  userBio.textContent = `Bio: ${obj.bio}`;

  let gitCalendar = document.createElement('div');
  gitCalendar.classList.add('gitCalendar');

  let emptyDiv = document.createElement('div');
  emptyDiv.classList.add('emptyDiv');

  let expandButton = document.createElement('button');
  expandButton.classList.add('expandButton');
  expandButton.textContent = 'View Git History';
  expandButton.addEventListener('click', () => {
    expandedCard = !expandedCard;
    expandButton.textContent = `${!expandedCard ? 'View Git History' : 'Collapse Card'}`;
    cardContainer.classList.toggle('cardExpanded');
  })

  cardContainer.appendChild(userContainer);
  userContainer.appendChild(userImg);
  userContainer.appendChild(cardInfo);
  cardContainer.appendChild(expandButton);
  cardContainer.appendChild(gitCalendar);
  cardInfo.appendChild(nameHeader);
  cardInfo.appendChild(username);
  cardInfo.appendChild(usersLocation);
  cardInfo.appendChild(profileText);
  cardInfo.appendChild(followersText);
  cardInfo.appendChild(followingText);
  cardInfo.appendChild(userBio);
  new GitHubCalendar(gitCalendar, `${obj.login}`);
  
  return cardContainer;
}



/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
