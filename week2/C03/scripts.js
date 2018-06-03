      // tippy animation
      tippy('.books', {
        arrow: true,
        touchHold: true,
        delay: [150, 100],
        animation: 'scale',
        html: '#BookInfo'
         
      })


    function showUserOptions() {
        document.getElementById("userDrop").classList.toggle("show");
    }

    
    function showMobileOptions() {
        document.getElementById("mobileDrop").classList.toggle("show");
    }


        window.onclick = function(event) {
            if (!event.target.matches('.header img')) {

                var dropdowns = document.getElementsByClassName("user-dropdown-content");
                var i;
                    
                for (i = 0; i < dropdowns.length; i++) {
                    var openDropdown = dropdowns[i];
                    if (openDropdown.classList.contains('show')) {
                        openDropdown.classList.remove('show');
                    }   
                }   
            }

            if (!event.target.matches('.header i')) {

                var dropdowns = document.getElementsByClassName("mobile-drop-content");
                var i;
    
                for (i = 0; i < dropdowns.length; i++) {
                    var openDropdown = dropdowns[i];
                    if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                    }   
                }          
            }

        }
        