document.addEventListener("DOMContentLoaded", function () {
  // Fetch the JSON data from the server
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
        displayItems(data.items.slice(0, 3)); // Display the first 3 items initially
      }

      // Function to handle filtering with animations
      function handleFiltering(event) {
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
        displayInitialItems();
      });

      // Display all items initially
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

// ---------------- NAVIGATION TOGGLE ---------------------
const primaryNav = document.querySelector(".primary-navigation");
const navToggle =document.querySelector(".mobile-nav-toggle");

navToggle.addEventListener('click', () => {
  const visibility = primaryNav.getAttribute("data-visible");

  if (visibility === "false") {
    primaryNav.setAttribute("data-visible", true);
  } else if (visibility === "true"){
    primaryNav.setAttribute("data-visible", false);
  }
})

// ----------------END of NAVIGATION TOGGLE ---------------------

