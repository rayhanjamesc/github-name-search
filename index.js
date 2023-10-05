function fetchProfile() {
    //Step 1: Get username input value
    const username = document.getElementById("username").value;

    //Step 2: Construct API URL using the Github username
    const apiUrl = `https://api.github.com/users/${username}`;

    //Step 3: Fetch user profile information from Github API (with fetch function)
    fetch(apiUrl) //Fetch is a JS method
        //Step 4: Handle the response using "then" method
        .then(response => {
            //Step 5: Check if the response is OK
            if(!response.ok) { /*"ok" is a property, a boolean value that indicates whether the HTTP response
            status is within the successful range(i.e., 200-299) or not*/
                //Step 6: If not 
                throw new Error(`HTTP error! Status: ${response.status}`) //Status is property that holds HTTP status code
                /*Throw is a statement,
                new is an operator used to create a new instance of an object, Error is a built-in constructor function
                When combined together "throw new Error(...)", creates a new instance of "Error" object with specified
                error message*/
            }
            //Step 7: Parse the response as JSON
            return response.json();
        })
        //Step 8: Handle the parsed JSON data
        .then(data => {
            //Step 9: Call the displayProfile function with the parsed data
            displayProfile(data);
        })
        //Step 10: Handle errors using the `catch` method
        .catch(error => {
            //Step 11: Log the error to the console
            console.error(`Error fetching profile:`, error);
            //Step 12: Call the displayError function
            displayError();
        })
}

function displayProfile(profile) {
    const profileDiv = document.getElementById("profile");
    profileDiv.innerHTML = `
        <h2>${profile.name}</h2>
        <img src="${profile.avatar_url}" alt="Profile Image">
        <p>${profile.bio}</p>
        <p>Followers: ${profile.followers}</p>
        <p>Following: ${profile.following}</p>
        `; //The properties after "profile" are specific to GitHub's naming convention system
}

function displayError() {
    const profileDiv = document.getElementById("profile");
    profileDiv.innerHTML = `<p>Error fetching profile. Please check the username and try again.</p>`;
}