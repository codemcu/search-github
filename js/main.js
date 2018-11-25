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
          });

      }
    }

  }

})();