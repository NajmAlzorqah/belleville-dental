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

// ---------------- Start of Professional Education Filtering and Feching ---------------------
document.addEventListener("DOMContentLoaded", function () {
  // This event listener waits for the HTML document to be fully loaded and parsed before executing the code inside it.
  // Fetch the JSON data from the server
  fetch("data.json")
    .then((response) => response.json()) // Parse the JSON response
    .then((data) => {
      // After fetching the JSON data successfully, this code runs.
      // Function to create HTML elements for each item
      function createItemElement(item) {
        // This function takes an item from the JSON data and creates HTML elements to represent it.
        // It creates a <div> element with class "item" and additional classes based on the item's type.
        // Inside this <div>, it creates an <img> element for the item's image, a <div> for item info, and a "Read More" link.
        // Then it appends these elements to the item container and returns it.

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
        readDiv.innerHTML = `<a href="#">Read More</a> <img src="../images/icons/arrow-right.png"></img>`;
        readDiv.classList.add("read-more");

        // Append elements to the item container
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
        // This function clears the previous items in the container and displays new items with animations.
        // It creates HTML elements for each item using the createItemElement function and appends them to the container.
        // It also adds animation classes to show the items with fadeIn effect.
        // Clear previous items
        professionalList.innerHTML = "";

        // Display items with fadeIn animation
        items.slice(0, 3).forEach(function (item) {
          var itemElement = createItemElement(item);
          professionalList.appendChild(itemElement);
        });

        // Trigger reflow to apply initial opacity transition
        void professionalList.offsetWidth;

        // Add class to trigger fadeIn animation
        professionalList.querySelectorAll(".item").forEach(function (item) {
          item.classList.add("show");
        });
      }

      // Display all items initially
      function displayInitialItems() {
        // This function displays the initial set of items when the page loads.
        // It calls the displayItems function with the first 3 items from the JSON data.
        displayItems(data.items.slice(0, 3));
      }

      // Function to handle filtering with animations
      function handleFiltering(event) {
        // This function handles filtering items based on the selected filter.
        // It gets the filter value from the clicked filter link and filters the items accordingly.
        // Then it clears the container, displays the filtered items with animations, and applies fadeIn effect.
        event.preventDefault();
        var filterValue = this.getAttribute("data-filter");
        var filteredItems = data.items.filter(function (item) {
          return filterValue === "all" || item.type === filterValue;
        });

        // Limit the number of items displayed on small screens
        var maxItems = window.innerWidth <= 413 ? 3 : 4;

        // Add hide class to trigger fadeOut animation
        professionalList.querySelectorAll(".item").forEach(function (item) {
          item.classList.add("hide");
        });

        // Wait for fadeOut animation to complete
        setTimeout(function () {
          // Clear previous items
          professionalList.innerHTML = "";

          // Display filtered items with fadeIn animation
          filteredItems.slice(0, maxItems).forEach(function (item) {
            var itemElement = createItemElement(item);
            professionalList.appendChild(itemElement);
          });

          // Trigger reflow to apply initial opacity transition
          void professionalList.offsetWidth;

          // Add class to trigger fadeIn animation
          professionalList.querySelectorAll(".item").forEach(function (item) {
            item.classList.add("show");
          });
        }, 500); // Adjust the delay to match the duration of the fadeOut animation
      }

      // Get all the filter links
      var filterLinks = document.querySelectorAll(".filter-link");

      // Display initial items when the filter icon is clicked
      var filterIcon = document.querySelector(".category img");
      filterIcon.addEventListener("click", function () {
        // This event listener triggers the displayInitialItems function when the filter icon is clicked.
        displayInitialItems();
      });

      // Display all items initially
      displayInitialItems();

      // Add click event listeners to the filter links
      filterLinks.forEach(function (link) {
        link.addEventListener("click", handleFiltering);
        // This code adds click event listeners to all filter links to handle filtering when clicked.
      });
    })
    .catch((error) => {
      console.error("Error fetching JSON data:", error);
      // If there's an error fetching JSON data, this code logs the error to the console.
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
          tickerElement.innerHTML = `Year: ${year} | Time: ${time} | Location: ${city}`;
          // Update the ticker content with the current date, time, and city.
        })
        .catch(() => {
          tickerElement.innerHTML = `Year: ${year} | Time: ${time} | Location: Unknown`;
          // If an error occurs during fetching location data, display "Unknown" location in the ticker.
        });
    },
    () => {
      tickerElement.innerHTML = `Year: ${year} | Time: ${time} | Location: Unknown`;
      // If geolocation is not supported or user denies access, display "Unknown" location in the ticker.
    }
  );
}

setInterval(updateTicker, 60000); // Update every minute
updateTicker(); // Initial call

// ----------------End of Footer Ticker ---------------------
