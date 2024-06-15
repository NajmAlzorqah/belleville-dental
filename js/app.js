// ---------------- PAGE LOADER ---------------------
window.addEventListener("load", function () {
  var loader = document.getElementById("loader");
  loader.classList.add("hide");
});

// ---------------- SCROLL ANIMATION ---------------------
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    console.log(entry);
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    } else {
      entry.target.classList.remove("show");
    }
  });
});

const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((el) => observer.observe(el));
// ----------------------------------
const observerTwo = new IntersectionObserver((entriesTwo) => {
  entriesTwo.forEach((entryOne) => {
    console.log(entryOne);
    if (entryOne.isIntersecting) {
      entryOne.target.classList.add("show-opacity");
    } else {
      entryOne.target.classList.remove("show-opacity");
    }
  });
});

const opacityElements = document.querySelectorAll(".opacity-element");
opacityElements.forEach((elo) => observerTwo.observe(elo));

// ------------------- COMPAINES INFINITE SCROLL ANIMATION --------------------
const scrollers = document.querySelectorAll(".scroller");
if (!window.matchMedia("(prefers-reduced-motion: reduse)").matches) {
  addAnimation();
}
function addAnimation() {
  scrollers.forEach((scroller) => {
    scroller.setAttribute("data-animated", true);

    const scrollerInner = scroller.querySelector(".scroller__inner");
    const scrollerContent = Array.from(scrollerInner.children);

    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true);
      duplicatedItem.setAttribute("aria-hidden", true);
      scrollerInner.appendChild(duplicatedItem);
    });
  });
}

// ---------------- NAVIGATION TOGGLE ---------------------
// This section toggles the visibility of the navigation menu on mobile devices.

const primaryNav = document.querySelector(".primary-navigation");
const navToggle = document.querySelector(".mobile-nav-toggle");
const navLinks = document.querySelectorAll(".primary-navigation");

navToggle.addEventListener("click", () => {
  // This event listener toggles the visibility attribute of the primary navigation element when the toggle button is clicked.
  const visibility = primaryNav.getAttribute("data-visible");

  if (visibility === "false") {
    primaryNav.setAttribute("data-visible", true);
  } else if (visibility === "true") {
    primaryNav.setAttribute("data-visible", false);
  }
});
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    primaryNav.setAttribute("data-visible", false);
  });
});

// --------------------------------------------------------------------------------
// JavaScript to handle hamburger menu toggle
function toggleMenu() {
  var ham = document.querySelector(".ham");
  ham.classList.toggle("active");
}

// Reset hamburger menu when clicking on any link inside .primary-navigation
var links = document.querySelectorAll(".primary-navigation a");
links.forEach(function (link) {
  link.addEventListener("click", function () {
    var ham = document.querySelector(".ham");
    ham.classList.remove("active");
  });
});

// Reset hamburger menu when clicking anywhere inside .primary-navigation
var primaryNavigation = document.querySelector(".primary-navigation");
primaryNavigation.addEventListener("click", function () {
  var ham = document.querySelector(".ham");
  ham.classList.remove("active");
});

// ---------------- VISTOR COUNT ---------------------
const visitorCountElement = document.getElementById("visitor-count");
let visitorCount = localStorage.getItem("visitor-count") || 0;
visitorCount++;
localStorage.setItem("visitor-count", visitorCount);
visitorCountElement.textContent = visitorCount;

// ---------------- APPOINTMENT MODEL ---------------------
const openModelButton = document.querySelectorAll("[data-model-target]");
const closeModelButton = document.querySelectorAll("[data-close-button]");
const overlay = document.getElementById("overlay");

openModelButton.forEach((button) => {
  button.addEventListener("click", () => {
    const model = document.querySelector(button.dataset.modelTarget);
    openModel(model);
  });
});

overlay.addEventListener("click", () => {
  const models = document.querySelectorAll(".model.active");
  models.forEach((model) => {
    closeModel(model);
  });
});

closeModelButton.forEach((button) => {
  button.addEventListener("click", () => {
    const model = button.closest(".model");
    closeModel(model);
  });
});

function openModel(model) {
  if (model == null) return;
  model.classList.add("active");
  overlay.classList.add("active");
}

function closeModel(model) {
  if (model == null) return;
  model.classList.remove("active");
  overlay.classList.remove("active");
}

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
//----------------- End of Smooth Scrolling with Offset Adjustment ----------------

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

// ---------------- Start of Products Filtering and Fetching ---------------------
/**
 * Fetch and Display Filtered Items from JSON Data
 *
 * This JavaScript code fetches data from a JSON file, creates HTML elements based on the data,
 * and displays them on the webpage. It also provides filtering functionality to show specific
 * items based on categories.
 */
document.addEventListener("DOMContentLoaded", function () {
  // Fetch JSON data from the server
  fetch("product.json")
    .then((response) => response.json()) // Parse the JSON response
    .then((data) => {
      // Function to create HTML elements for each item
      function createItemElement(item) {
        var itemDiv = document.createElement("div");
        itemDiv.classList.add("item", item.type);
        itemDiv.dataset.id = item.id;

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

        var ratingDiv = document.createElement("div");
        ratingDiv.classList.add("rating");
        ratingDiv.innerHTML = getStars(item.rating);

        var ratingValue = document.createElement("p");
        ratingValue.textContent = `${item.rating}`;

        var rateMessageDiv = document.createElement("div");
        rateMessageDiv.classList.add("rate-message");
        rateMessageDiv.textContent = "👈 Give this product a rating ";

        var starsDiv = document.createElement("div");
        starsDiv.classList.add("stars");
        starsDiv.dataset.productId = item.id; // Set data attribute to store product ID
        starsDiv.innerHTML = `
    <span class="star" data-value="1"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20px" height="20px"><path d="M12 .587l3.668 7.568L24 9.748l-6 5.85 1.416 8.269L12 18.896l-7.416 3.97L6 15.598l-6-5.85 8.332-1.593L12 .587z" fill="#F6D43E"/></svg></span>
    <span class="star" data-value="2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20px" height="20px"><path d="M12 .587l3.668 7.568L24 9.748l-6 5.85 1.416 8.269L12 18.896l-7.416 3.97L6 15.598l-6-5.85 8.332-1.593L12 .587z" fill="#F6D43E"/></svg></span>
    <span class="star" data-value="3"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20px" height="20px"><path d="M12 .587l3.668 7.568L24 9.748l-6 5.85 1.416 8.269L12 18.896l-7.416 3.97L6 15.598l-6-5.85 8.332-1.593L12 .587z" fill="#F6D43E"/></svg></span>
    <span class="star" data-value="4"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20px" height="20px"><path d="M12 .587l3.668 7.568L24 9.748l-6 5.85 1.416 8.269L12 18.896l-7.416 3.97L6 15.598l-6-5.85 8.332-1.593L12 .587z" fill="#F6D43E"/></svg></span>
    <span class="star" data-value="5"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20px" height="20px"><path d="M12 .587l3.668 7.568L24 9.748l-6 5.85 1.416 8.269L12 18.896l-7.416 3.97L6 15.598l-6-5.85 8.332-1.593L12 .587z" fill="#F6D43E"/></svg></span>
    `;

        var readDiv = document.createElement("div");
        readDiv.innerHTML = `<a href="#">Buy Now</a><svg height="800px" width="800px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 227.096 227.096" xml:space="preserve"><g><g><polygon style="fill:#010002;" points="152.835,39.285 146.933,45.183 211.113,109.373 0,109.373 0,117.723 211.124,117.723 146.933,181.902 152.835,187.811 227.096,113.55"/></g></g></svg>`;
        readDiv.classList.add("buy-now");

        starsDiv.appendChild(rateMessageDiv);
        ratingDiv.appendChild(ratingValue);
        infoDiv.appendChild(contentDiv);
        infoDiv.appendChild(ratingDiv);
        infoDiv.appendChild(starsDiv);
        itemDiv.appendChild(img);
        itemDiv.appendChild(infoDiv);
        itemDiv.appendChild(readDiv);

        // Add event listener to each star
        starsDiv.querySelectorAll(".star").forEach((star) => {
          star.addEventListener("click", handleRating);
        });

        return itemDiv;
      }

      // Function to generate star icons based on rating
      function getStars(rating) {
        const starCount = 5;
        const filledStars = Math.floor(rating);
        const remainder = rating - filledStars;
        let starsHTML = "";
        for (let i = 0; i < filledStars; i++) {
          starsHTML +=
            '<span class="star"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20px" height="20px"><path d="M12 .587l3.668 7.568L24 9.748l-6 5.85 1.416 8.269L12 18.896l-7.416 3.97L6 15.598l-6-5.85 8.332-1.593L12 .587z" fill="#F6D43E"/></svg></span>';
        }

        if (remainder > 0) {
          starsHTML +=
            '<span class="star"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20px" height="20px"><path d="M12 .587l3.668 7.568L24 9.748l-6 5.85 1.416 8.269L12 18.896l-7.416 3.97L6 15.598l-6-5.85 8.332-1.593L12 .587z" fill="#dcdad9"/></svg></span>'; // Add half star if needed
        }

        return starsHTML;
      }

      // Function to update product rating
      function updateProductRating(productId, rating) {
        // Here you can implement logic to update the rating for the product with the given productId
        // For example, if you have an array of products, you can find the product by ID and update its rating
        const product = data.items.find((item) => item.id === productId);
        if (product) {
          product.rating = rating;
        }
      }

      // Get the container element where items will be appended
      var productList = document.querySelector(".product-list");

      // Function to display items based on filter with animations
      function displayItems(items) {
        productList.innerHTML = "";
        items.slice(0, 3).forEach(function (item) {
          var itemElement = createItemElement(item);
          productList.appendChild(itemElement);
        });
        void productList.offsetWidth;
        productList.querySelectorAll(".item").forEach(function (item) {
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

        var maxItems = window.innerWidth <= 413 ? 3 : 3;
        productList.querySelectorAll(".item").forEach(function (item) {
          item.classList.add("hide");
        });

        setTimeout(function () {
          productList.innerHTML = "";
          filteredItems.slice(0, maxItems).forEach(function (item) {
            var itemElement = createItemElement(item);
            productList.appendChild(itemElement);
          });
          void productList.offsetWidth;
          productList.querySelectorAll(".item").forEach(function (item) {
            item.classList.add("show");
          });
        }, 500);

        // Remove 'active' class from all filter links and add it to the clicked link
        filterLinks.forEach(function (link) {
          link.classList.remove("active");
        });
        this.classList.add("active");
      }

      // Function to handle rating of items
      function handleRating(event) {
        event.preventDefault();
        const rating = parseInt(this.getAttribute("data-value"));
        const productId = parseInt(this.closest(".item").dataset.id);
        updateProductRating(productId, rating);
        const messageContainer =
          this.closest(".item").querySelector(".rate-message");
        messageContainer.textContent = `You rated this product ${rating} stars!`;
      }

      // Get all the filter links
      var filterLinks = document.querySelectorAll(".filter-button");

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

      // Add click event listeners to the rating stars
      var stars = document.querySelectorAll(".star");
      stars.forEach(function (star) {
        star.addEventListener("click", handleRating);
      });
    })
    .catch((error) => {
      console.error("Error fetching JSON data:", error);
    });
});

// ---------------- End of Products Filtering and Fetching ---------------------
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
