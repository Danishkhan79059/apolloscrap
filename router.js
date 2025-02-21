(function () {
    console.log("Router script injected!");
  
    // Wait until the DOM is fully loaded
    document.addEventListener("DOMContentLoaded", () => {
      const employeeLinks = document.querySelectorAll("a[href*='linkedin.com']"); // Adjust selector if needed
      let employeeData = [];
  
      employeeLinks.forEach((link, index) => {
        const linkedinUrl = link.href || "LinkedIn URL not found";
  
        // Extract additional data
        const industry =
          document.querySelector("span.zp_OrUpW")?.innerText.trim() ||
          "Industry not found";
        const locationElement = document.querySelector(
          "span.zp_FK63Y div > div:nth-child(2)"
        );
        const location = locationElement
          ? locationElement.innerText.trim()
          : "Location not found";
        const employeeSize =
          document
            .querySelector("span.zp_FK63Y .zp-info-row-value span")
            ?.innerText.trim() || "Employee size not found";
  
        // Encode parameters to be URL-safe
        const encodedIndustry = encodeURIComponent(industry);
        const encodedLocation = encodeURIComponent(location);
        const encodedEmployeeSize = encodeURIComponent(employeeSize);
  
        // Append parameters to URL
        const updatedUrl = `${linkedinUrl}?industry=${encodedIndustry}&location=${encodedLocation}&employeeSize=${encodedEmployeeSize}`;
  
        // Store data
        employeeData.push({
          id: index + 1,
          linkedinUrl: updatedUrl,
        });
  
        console.log(`${index + 1}: ${updatedUrl}`);
      });
  
      console.log("Total Employees Found:", employeeData.length);
      console.log("Employee Data:", employeeData);
  
      // Send data to background script
      chrome.runtime.sendMessage({ type: "EMPLOYEE_DATA", data: employeeData });
    });
  })();
  