(function () {

  /* global console*/
  /* jshint node: true */

  "use strict";

  const input = document.querySelector('input');
  input.addEventListener('keyup', searchUser, false);
  const container = document.querySelector('.container');

  function searchUser($event) {

    if ($event.code === 'Enter' && $event.isTrusted) {

      if (input.value.trim() === '') {

        const p = document.createElement('P');
        container.appendChild(p);
        p.textContent = 'Please enter username';
        return false;

      } else {

        if (document.querySelector('ul') !== null) {
          document.querySelector('ul').remove();
        }

        const text = input.value.trim();

        fetch(`https://api.github.com/search/users?q=${text}+in%3Afullname&type=Users`)
          //.then(handleErrors)
          .then(data => data.json())
          .then(res => {
            console.log(res.items);

            var ul = document.createElement('UL');
            container.appendChild(ul);
            var resArray = res.items;

            resArray.forEach(function(item) {

              var li = document.createElement('LI');
              var img = document.createElement('IMG');
              var div = document.createElement('DIV');
              div.setAttribute('class', 'user-details');
              var spanFollowers = document.createElement('SPAN');
              var spanFollowings = document.createElement('SPAN');
              var spanScore = document.createElement('SPAN');

              li.appendChild(document.createTextNode(item.login));

              spanScore.textContent = `Score: ${item.score}`;

              img.setAttribute('src', item.avatar_url);

              ul.appendChild(li);
              li.appendChild(img);
              li.appendChild(div);
              div.appendChild(spanScore);

              // ul.addEventListener('click', function($event) {
              //   if ($event.target.tagName === 'LI') {
              //     window.open(item.html_url);
              //   }
              // }, false);

              fetch(`https://api.github.com/users/${item.login}/followers`)
                // .then(handleErrors)
                .then(function(dataFollowers) {
                  return dataFollowers.json();
                })
                .then(function(resFollowers) {
                  spanFollowers.textContent = `Followers: ${resFollowers.length}`;
                  div.appendChild(spanFollowers);

                });

              fetch(`https://api.github.com/users/${item.login}/following`)
                // .then(handleErrors)
                .then(function(dataFollowings) {
                  return dataFollowings.json();
                })
                .then(function(resFollowings) {
                  spanFollowings.textContent = `Followings: ${resFollowings.length}`;
                  div.appendChild(spanFollowings);

                });
            });
          });

      }
    }

  }

})();