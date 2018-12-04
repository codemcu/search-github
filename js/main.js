(function () {

  const input = document.querySelector('input');
  input.addEventListener('keyup', searchUser, false);
  const container = document.querySelector('.container');

  function feedBackMessage (message) {
    if (document.querySelector('P') !== null) {
      document.querySelector('P').remove();
      const p = document.createElement('P');
      container.appendChild(p);
      p.textContent = message;
      return false;
    } else {
      const p = document.createElement('P');
      container.appendChild(p);
      p.textContent = message;
      return false;
    }
  }

  function createNetworking(item, type) {
    const divFollower = document.createElement('DIV');
    const divFollowing = document.createElement('DIV');
    const divContainer = document.querySelector('.user-details');

    fetch(`https://api.github.com/users/${item.login}/${type}`)
      .then(function(data) {
        return data.json();
      })
      .then(function(res) {
        if (type === 'following') {
          divFollowing.innerHTML = `Followings: <span>${res.length}</span>`;
          divContainer.appendChild(divFollowing);
        } else if (type === 'followers') {
          divFollower.innerHTML = `Followers: <span>${res.length}</span>`;
          divContainer.appendChild(divFollower);
        }

      });
  }

  function searchUser($event) {

    if ($event.code === 'Enter' && $event.isTrusted) {

      if (input.value.trim() === '') {

        feedBackMessage('Please enter username');

      } else {

        if (document.querySelector('ul') !== null) {
          document.querySelector('ul').remove();
        }

        const text = input.value.trim();

        fetch(`https://api.github.com/search/users?q=${text}+in%3Afullname&type=Users`)
          .then(data => data.json())
          .then(res => {

            if (res && res.items.length) {

              const resArray = res.items;

              resArray.forEach(function(item) {

                // const divFollowers = document.createElement('DIV');
                // const divFollowings = document.createElement('DIV');

                createContainerUser(item);
                createNetworking (item, 'followers');
                createNetworking (item, 'following');

                // ul.addEventListener('click', function($event) {
                //   if ($event.target.tagName === 'LI') {
                //     window.open(item.html_url);
                //   }
                // }, false);
              });
            } else {
              feedBackMessage('No users found');
            }
          });

      }
    }

    function createContainerUser(item) {
      const ul = document.createElement('UL');
      const li = document.createElement('LI');
      const img = document.createElement('IMG');
      const div = document.createElement('DIV');
      div.setAttribute('class', 'user-details');

      const divScore = document.createElement('DIV');

      li.appendChild(document.createTextNode(item.login));

      divScore.innerHTML = `Score: <span>${item.score.toFixed(2)}</span>`;

      img.setAttribute('src', item.avatar_url);

      ul.appendChild(li);
      li.appendChild(img);
      li.appendChild(div);
      div.appendChild(divScore);
      container.appendChild(ul);
    }

  }

})();