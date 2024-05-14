/*======== Creating Dynamic Professional JS Code From Json File =====================*/

document.addEventListener("DOMContentLoaded", function () {
  // Fetch the JSON data
  fetch("professional_data.json")
    .then((response) => response.json())
    .then((data) => {
      // Get the container element where items will be appended
      var professionalList = document.querySelector(".professional-list");

      // Iterate through each item in the JSON data
      data.items.forEach(function (item) {
        // Create elements for each item
        var itemDiv = document.createElement("div");
        itemDiv.classList.add("item", item.type);

        var img = document.createElement("img");
        img.src = item.image;
        img.alt = "";

        var infoDiv = document.createElement("div");
        infoDiv.classList.add("info");

        var contentDiv = document.createElement("div");
        contentDiv.innerHTML = `
                <h3>${item.title}</h3>
                <p>${item.content}</p>
            `;

        var viewDiv = document.createElement("div");
        viewDiv.innerHTML = `<a href="#">view more</a>`;
        viewDiv.classList.add("view-more");

        // Append elements to the item container
        infoDiv.appendChild(contentDiv);
        itemDiv.appendChild(img);
        itemDiv.appendChild(infoDiv);
        itemDiv.appendChild(viewDiv); // Append viewDiv to itemDiv
        professionalList.appendChild(itemDiv);
      });
    })
    .catch((error) => {
      console.error("Error fetching JSON data:", error);
    });
});

/*======== Filtering Professional JS Code=====================*/
document.addEventListener("DOMContentLoaded", function () {
  // Get all the filter links
  var filterLinks = document.querySelectorAll(".filter-link");

  // Function to handle filtering
  function handleFiltering(event) {
    event.preventDefault();
    var filterValue = this.getAttribute("data-filter");
    var itemsToShow = filterValue === "all" ? 4 : 8;
    var items = document.querySelectorAll(".item");

    // Show up to 8 items of the clicked filter and hide others
    var displayedItems = 0;
    items.forEach(function (item) {
      if (displayedItems < itemsToShow) {
        if (filterValue === "all" || item.classList.contains(filterValue)) {
          item.style.display = "block";
          displayedItems++;
        } else {
          item.style.display = "none";
        }
      } else {
        item.style.display = "none";
      }
    });
  }

  // Add click event listeners to the filter links
  filterLinks.forEach(function (link) {
    link.addEventListener("click", handleFiltering);
  });

  // Initially show the first 4 items
  var initialItems = document.querySelectorAll(".item");
  var initialItemsToShow = 4;
  initialItems.forEach(function (item, index) {
    if (index < initialItemsToShow) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
});
