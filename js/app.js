// ---------------- NAVIGATION TOGGLE ---------------------
// This section toggles the visibility of the navigation menu on mobile devices.

const primaryNav = document.querySelector(".primary-navigation");
const navToggle = document.querySelector(".mobile-nav-toggle");

navToggle.addEventListener("click", () => {
  // This event listener toggles the visibility attribute of the primary navigation element when the toggle button is clicked.
  const visibility = primaryNav.getAttribute("data-visible");

  if (visibility === "false") {
    primaryNav.setAttribute("data-visible", true);
  } else if (visibility === "true") {
    primaryNav.setAttribute("data-visible", false);
  }
});
// ----------------END of NAVIGATION TOGGLE ---------------------

//-----------------Smooth Scrolling with Offset Adjustment ----------------

// Event listener for when the HTML document is fully loaded and parsed
document.addEventListener("DOMContentLoaded", function () {
  /**
   * Function to handle smooth scrolling with offset adjustment
   * @param {Event} event - The click event object
   */
  function smoothScroll(event) {
    // Prevents the default behavior of the clicked link to avoid abrupt jumps
    event.preventDefault();

    // Extracts the target element's ID from the clicked link's href attribute
    var targetId = this.getAttribute("href").substring(1);

    // Retrieves the target element using its ID
    var targetElement = document.getElementById(targetId);

    // Adjust this value based on your fixed navbar height
    var offset = 70;

    if (targetElement) {
      // Calculates the desired scroll position, adjusting for the fixed navbar's height
      var elementPosition = targetElement.getBoundingClientRect().top;
      var offsetPosition = elementPosition + window.pageYOffset - offset;

      // Scrolls to the calculated position smoothly
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  }

  // Attach the smoothScroll function to navbar links
  var navbarLinks = document.querySelectorAll(".navigation-bar a");
  navbarLinks.forEach(function (link) {
    link.addEventListener("click", smoothScroll);
  });

  // Attach the smoothScroll function to footer links
  var footerLinks = document.querySelectorAll(".footer-link");
  footerLinks.forEach(function (link) {
    link.addEventListener("click", smoothScroll);
  });
});

// ---------------- Start of Professional Education Filtering and Fetching ---------------------
/**
 * Fetch and Display Filtered Items from JSON Data
 *
 * This JavaScript code fetches data from a JSON file, creates HTML elements based on the data,
 * and displays them on the webpage. It also provides filtering functionality to show specific
 * items based on categories.
 */

// Event listener for when the HTML document is fully loaded and parsed
document.addEventListener("DOMContentLoaded", function () {
  // Fetch JSON data from the server
  fetch("data.json")
    .then((response) => response.json()) // Parse the JSON response
    .then((data) => {
      // Function to create HTML elements for each item
      function createItemElement(item) {
        var itemDiv = document.createElement("div");
        itemDiv.classList.add("item", item.type);

        var img = document.createElement("img");
        img.src = item.image;
        img.alt = item.alt;

        var infoDiv = document.createElement("div");
        infoDiv.classList.add("info");

        var contentDiv = document.createElement("div");
        contentDiv.innerHTML = `
          <h3>${item.title}</h3>
          <p>${item.content}</p>
        `;

        var readDiv = document.createElement("div");
        readDiv.innerHTML = `<a href="#">Read More</a> <svg height="800px" width="800px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
	 viewBox="0 0 227.096 227.096" xml:space="preserve">
<g>
	<g>
		<polygon style="fill:#010002;" points="152.835,39.285 146.933,45.183 211.113,109.373 0,109.373 0,117.723 211.124,117.723 
			146.933,181.902 152.835,187.811 227.096,113.55 		"/>
	</g>
</g>
</svg>`;
        readDiv.classList.add("read-more");

        infoDiv.appendChild(contentDiv);
        itemDiv.appendChild(img);
        itemDiv.appendChild(infoDiv);
        itemDiv.appendChild(readDiv);

        return itemDiv;
      }

      // Get the container element where items will be appended
      var professionalList = document.querySelector(".professional-list");

      // Function to display items based on filter with animations
      function displayItems(items) {
        professionalList.innerHTML = "";
        items.slice(0, 3).forEach(function (item) {
          var itemElement = createItemElement(item);
          professionalList.appendChild(itemElement);
        });
        void professionalList.offsetWidth;
        professionalList.querySelectorAll(".item").forEach(function (item) {
          item.classList.add("show");
        });
      }

      // Function to display initial items when the page loads
      function displayInitialItems() {
        displayItems(data.items.slice(0, 3));
      }

      // Function to handle filtering of items
      function handleFiltering(event) {
        event.preventDefault();
        var filterValue = this.getAttribute("data-filter");
        var filteredItems = data.items.filter(function (item) {
          return filterValue === "all" || item.type === filterValue;
        });

        var maxItems = window.innerWidth <= 413 ? 3 : 4;
        professionalList.querySelectorAll(".item").forEach(function (item) {
          item.classList.add("hide");
        });

        setTimeout(function () {
          professionalList.innerHTML = "";
          filteredItems.slice(0, maxItems).forEach(function (item) {
            var itemElement = createItemElement(item);
            professionalList.appendChild(itemElement);
          });
          void professionalList.offsetWidth;
          professionalList.querySelectorAll(".item").forEach(function (item) {
            item.classList.add("show");
          });
        }, 500);

        // Remove 'active' class from all filter links and add it to the clicked link
        filterLinks.forEach(function (link) {
          link.classList.remove("active");
        });
        this.classList.add("active");
      }

      // Get all the filter links
      var filterLinks = document.querySelectorAll(".filter-link");

      // Event listener for clicking the filter icon to display initial items
      var filterIcon = document.querySelector(".category img");
      filterIcon.addEventListener("click", function () {
        displayInitialItems();
      });

      // Display initial items when the page loads
      displayInitialItems();

      // Add click event listeners to the filter links
      filterLinks.forEach(function (link) {
        link.addEventListener("click", handleFiltering);
      });
    })
    .catch((error) => {
      console.error("Error fetching JSON data:", error);
    });
});

// ---------------- End of Professional Education Filtering and Feching ---------------------

// ----------------Start of Footer Ticker ---------------------
function updateTicker() {
  // This function updates the ticker at the bottom of the page with the current date, time, and location.
  const tickerElement = document.getElementById("ticker");
  const now = new Date();
  const year = now.getFullYear();
  const time = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  navigator.geolocation.getCurrentPosition(
    function (position) {
      // This code gets the user's current location using the Geolocation API.
      const { latitude, longitude } = position.coords;
      const geolocationAPI = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;
      fetch(geolocationAPI)
        .then((response) => response.json())
        .then((data) => {
          // This code fetches location data using reverse geocoding based on latitude and longitude.
          const city =
            data.address.city ||
            data.address.town ||
            data.address.village ||
            "Unknown Location";
          // Extract the city from the location data.
          tickerElement.innerHTML = ` ${year} | ${time} | ${city}`;
          // Update the ticker content with the current date, time, and city.
        })
        .catch(() => {
          tickerElement.innerHTML = ` ${year} | ${time} | Location: Unknown`;
          // If an error occurs during fetching location data, display "Unknown" location in the ticker.
        });
    },
    () => {
      tickerElement.innerHTML = ` ${year} | ${time} | Location: Unknown`;
      // If geolocation is not supported or user denies access, display "Unknown" location in the ticker.
    }
  );
}

setInterval(updateTicker, 60000); // Update every minute
updateTicker(); // Initial call

// ----------------End of Footer Ticker ---------------------






