document.addEventListener("DOMContentLoaded", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const currentTab = tabs[0];

    // Check if the current tab is an Apollo page
    if (currentTab.url.includes("app.apollo.io")) {
      // Send a message to the content script to get the user's information
      chrome.tabs.sendMessage(
        currentTab.id,
        { action: "getUserName" },
        (response) => {
          const userName = response?.userName || "No name found.";
          const companyName = response?.companyName || "No company found.";
          const organizationName =
            response?.organizationName || "No organization found.";
          const location = response?.location || "No location found.";
          const industry =
            response?.industry || "No industry information found.";
          const linkedInUrl = response?.linkedInUrl || "No LinkedIn URL found.";
          const employees =
            response?.employees || "No employee information found.";
          const companyDescription =
            response?.companyDescription || "No company description found.";

          // Display the user's information in the popup
          document.getElementById(
            "user-name"
          ).textContent = `Name: ${userName}`;
          document.getElementById(
            "company-name"
          ).textContent = `Company: ${companyName}`;
          document.getElementById(
            "organization-name"
          ).textContent = `Organization: ${organizationName}`;
          document.getElementById(
            "location"
          ).textContent = `Location: ${location}`;
          document.getElementById(
            "industry"
          ).textContent = `Industry: ${industry}`;
          document.getElementById(
            "linkedin-url"
          ).textContent = `LinkedIn: ${linkedInUrl}`;
          document.getElementById(
            "employees"
          ).textContent = `Employees: ${employees}`;
          document.getElementById(
            "companyDescription"
          ).textContent = `Description: ${companyDescription}`;

          //New Click Button functionality
          document
            .getElementById("click-button")
            .addEventListener("click", function () {
              const encodedindustry = encodeURIComponent(industry);
              const encodedEmployees = encodeURIComponent(employees);

              const newTabUrl = `${linkedInUrl}?name=${encodedindustry}&employees=${encodedEmployees}`;

              // Open a new tab with the Apollo.io URL
              chrome.tabs.create({ url: newTabUrl });
            });

          // Add submit button event listener to send data to the API
          document
            .getElementById("submit-btn")
            .addEventListener("click", function () {
              const data = {
                name: userName,
                company: companyName,
                organization: organizationName,
                location: location,
                industry: industry,
                linkedin: linkedInUrl,
                employees: employees,
                description: companyDescription,
              };

              // Make the fetch request to the API URL
              fetch("http://localhost:3500/datascrap/save", {
                method: "POST", // Use POST method
                headers: {
                  "Content-Type": "application/json", // Indicate that we're sending JSON data
                },
                body: JSON.stringify(data), // Convert the data object to a JSON string
              })
                .then((response) => response.json()) // Parse the JSON response
                .then((data) => {
                  console.log("Success:", data); // Handle the response data
                  displayMessage("Data saved successfully!", "success");
                })
                .catch((error) => {
                  console.error("Error:", error); // Handle any errors that occur
                  displayMessage(
                    `Failed to save data: ${error.message}`,
                    "error"
                  );
                });
            });
          function displayMessage(message, type) {
            const messageElement = document.getElementById("message");
            messageElement.textContent = message;
            messageElement.style.color = type === "success" ? "green" : "red";
          }
        }
      );
    } else {
      // If the current page is not an Apollo page, display a message
      document.getElementById("user-name").textContent = "Not an Apollo page.";
      document.getElementById("company-name").textContent = "";
      document.getElementById("organization-name").textContent = "";
      document.getElementById("location").textContent = "";
      document.getElementById("industry").textContent = "";
      document.getElementById("linkedin-url").textContent = "";
      document.getElementById("employees").textContent = "";
      document.getElementById("companyDescription").textContent = "";
    }
  });
});
