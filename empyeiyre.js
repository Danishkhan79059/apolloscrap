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

          const industryName =
            response?.industryName || "no industry name found";
          const locationName = response?.locationName || "no locaiton found";
          const employeeNo = response?.employeeNo || "no of emplyee no found";

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

          document.getElementById(
            "industryName"
          ).textContent = `industry:${industryName}`;
          document.getElementById(
            "locationName"
          ).textContent = `location:${locationName}`;
          document.getElementById(
            "emplyeeNo"
          ).textContent = `Employee: ${employeeNo}`;
          

          //New Click Button functionality
          document
            .getElementById("click-button")
            .addEventListener("click", function () {
              const encodedindustry = encodeURIComponent(industry);
              const encodedEmployees = encodeURIComponent(employeeNo);
              const newTabUrl = `${linkedInUrl}?name=${encodedindustry}&employees=${encodedEmployees}`;

              // Open a new tab with the Apollo.io URL
              chrome.tabs.create({ url: newTabUrl });
            });

          // Add submit button event listener to send data to the API
          document
            .getElementById("submit-btn")
            .addEventListener("click", function () {
              // Fetch values dynamically
              document.getElementById(
                "industryName"
              ).textContent = `industry:${industryName}`;
              document.getElementById(
                "locationName"
              ).textContent = `location:${locationName}`;
              document.getElementById(
                "employeeNo"
              ).textContent = `emplyee:${employeeNo}`;
              const linkedInUrl = document
                .getElementById("linkedin-url")
                .textContent.replace("LinkedIn: ", "");

              // Validate LinkedIn URL before creating newTabUrl
              if (linkedInUrl.startsWith("http")) {
                const encodedIndustry = encodeURIComponent(industryName);
                const encodedEmployees = encodeURIComponent(employeeNo);
                const encodedLocation = encodeURIComponent(locationName);

                const newTabUrl = `${linkedInUrl}?name=${encodedIndustry}&employees=${encodedEmployees}&location=${encodedLocation}`;

                // Send the dynamically generated URL to the background script
                chrome.runtime.sendMessage(
                  { type: "SET_VARIABLE", value: newTabUrl },
                  (response) => {
                    console.log("Response from background:", response);
                  }
                );
              } else {
                console.warn("Invalid LinkedIn URL. Cannot send message.");
              }
            });
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
      document.getElementById("industryName").textContent = "";
      document.getElementById("locationName").textContent = "";
      document.getElementById("employeeNo").textContent = "";
      

      

    }
  });
});
