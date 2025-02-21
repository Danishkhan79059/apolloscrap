function getUserInfo() {
  // Select elements for user details
  const nameElement = document.querySelector("div.zp_d9irS.EditTarget span");
  const companyElement = document.querySelector("span.zp_usEUk");
  const organizationElement = document.querySelector("a.zp_p2Xqs.zp_v565m");
  const locationElement = document.querySelector(
    "div.zp_dMpEA div:nth-child(2)"
  );
  const industryElement = document.querySelector("span.zp_OrUpW.zp_YRmV4");
  const employeeElement = document.querySelector("span.zp_Tm590.zp_WPwxs"); // New element for employees
  const descriptionSpanElement = document.querySelector(
    "div.zp_7ra8R.zp_jkEdz span span"
  );

  // zp_7ra8R zp_jkEdz
  // Find the LinkedIn icon and get the parent <a> tag for the URL
  const linkedInIconElement = document.querySelector("i.apollo-icon-linkedin");
  const linkedInUrlElement = linkedInIconElement
    ? linkedInIconElement.closest("a")
    : null;

  const industrye =
    document.querySelector("span.zp_OrUpW")?.innerText.trim() ||
    "Industry not found";
  const locationElemente = document.querySelector(
    "span.zp_FK63Y div > div:nth-child(2)"
  );
  const locatione = locationElemente
    ? locationElemente.innerText.trim()
    : "Location not found";



  const employeeSizee =
    document
      .querySelector("span.zp_FK63Y .zp-info-row-value span")
      ?.innerText.trim() || "Employee size not found";

 

  // Extract text or use default placeholders if elements are missing
  const userName = nameElement ? nameElement.innerText : "No name found.";
  const companyName = companyElement
    ? companyElement.innerText
    : "No company found.";
  const organizationName = organizationElement
    ? organizationElement.innerText
    : "No organization found.";
  const location = locationElement
    ? locationElement.innerText
    : "No location found.";
  const industry = industryElement
    ? industryElement.innerText
    : "No industry information found.";
  const linkedInUrl = linkedInUrlElement
    ? linkedInUrlElement.href
    : "No LinkedIn URL found.";
  const employees = employeeElement
    ? employeeElement.innerText
    : "No employee information found."; // Added employee info
  const companyDescription = descriptionSpanElement
    ? descriptionSpanElement.innerText
    : null;




    const industryName = industrye;
    const locationName = locatione;
    const employeeNo = employeeSizee;
    

  // Debug logs for development
  console.log("User's Name:", userName);
  console.log("Company Name:", companyName);
  console.log("Organization Name:", organizationName);
  console.log("Location:", location);
  console.log("Industry:", industry);
  console.log("LinkedIn URL:", linkedInUrl);
  console.log("Employee Information:", employees); // Log employee data
  console.log("Description :", companyDescription);
  console.log("CompnayName", industryName);
  console.log("LocationName", locationName);
  console.log("emplyeeNo", employeeNo);
  

  // Return all collected data
  return {
    userName,
    companyName,
    organizationName,
    location,
    industry,
    linkedInUrl,
    employees,
    companyDescription,
    industryName,
    locationName,
    employeeNo,
  };
}

// Listening for messages from the popup script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "getUserName") {
    const {
      userName,
      companyName,
      organizationName,
      location,
      industry,
      linkedInUrl,
      employees,
      companyDescription,
      industryName,
      locationName,
      employeeNo,
    } = getUserInfo();
    // Send all collected data back in the response
    sendResponse({
      userName,
      companyName,
      organizationName,
      location,
      industry,
      linkedInUrl,
      employees,
      companyDescription,
      industryName,
      locationName,
      employeeNo,
    });
  }
});
