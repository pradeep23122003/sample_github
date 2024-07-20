function requestData() {
  var username = document.getElementById("username").value;
  if (!username) {
    alert("Please enter a GitHub username.");
    return;
  }

  // Fetch user profile
  fetch(`https://api.github.com/users/${username}`)
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then(function (profile) {
      console.log(profile);
      var profileDiv = document.getElementById("profile");
      profileDiv.innerHTML = `
                    <div class="profile-grid">
                        <div>
                            <img src="${
                              profile.avatar_url
                            }" alt="Avatar" width="150">
                        </div>
                        <div>
                            <h2>${profile.name} (${profile.login})</h2>
                            <p>Bio: ${profile.bio || "No bio available"}</p>
                            <p>Location: ${
                              profile.location || "No location available"
                            }</p>
                            <p>Public Repos: ${profile.public_repos}</p>
                            <p>Followers: ${profile.followers}</p>
                            <p>Following: ${profile.following}</p>
                            <p>Profile URL: <a href="${
                              profile.html_url
                            }" target="_blank">${profile.html_url}</a></p>
                        </div>
                    </div>
                `;
    })
    .catch(function (error) {
      console.log("Error:", error);
      var profileDiv = document.getElementById("profile");
      profileDiv.innerHTML = "Error fetching user profile.";
    });

  // Fetch user repositories
  fetch(`https://api.github.com/users/${username}/repos`)
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then(function (repos) {
      console.log(repos);
      var result = document.getElementById("result");
      result.innerHTML = "<h3>Repositories:</h3>";
      repos.forEach(function (repo) {
        var repoDiv = document.createElement("div");
        repoDiv.classList.add("repository");
        repoDiv.innerHTML =
          "<h4>" +
          repo.name +
          "</h4>" +
          "<p>Description: " +
          (repo.description || "No description") +
          "</p>" +
          "<p>URL: <a href='" +
          repo.html_url +
          "' target='_blank'>" +
          repo.html_url +
          "</a></p>";
        result.appendChild(repoDiv);
      });
    })
    .catch(function (error) {
      console.log("Error:", error);
      var result = document.getElementById("result");
      result.innerHTML = "Error fetching repositories.";
    });
}
