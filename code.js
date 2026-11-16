// This program uses the Rollercoasters database from Code.org.
// The icons used in this program are also imported from Code.org.
// [1] Blue Rollercoaster GIF - https://giphy.com/gifs/lakecompounce-roller-coaster-themepark-zoomerang-WqSCrUOEWQpWC8JGNg
// [2] Black Rollercoaster GIF - https://giphy.com/gifs/europapark-rollercoaster-silverstar-g0KNXnnbjxP1KA62U6
// [3] Green Rollercoaster GIF - https://giphy.com/gifs/racing-busch-gardens-buschgardens-9LjEnvo1sTlyxl4DzY
// [4] Orange Rollercoaster GIF - https://giphy.com/gifs/fury-rollercoaster-bobbejaanland-iiUKwaQ9DTcNtb4Xu9
// Variables holding values which are used to determine results.
var region;
var country;
var pictureIndex = 0;

// Variables which hold the final results.
var rollercoasterResult;
var parkResult;
var regionResult;
var countryResult;
var cityResult;
var heightResult;
var coasterSpeedResult;
var coasterLengthResult;
var picture;

// Retrieves data from database and stores in lists.
var rollercoasterList = getColumn("Rollercoasters", "Rollercoaster Name");
var parkList = getColumn("Rollercoasters", "Amusement Park");
var regionList = getColumn("Rollercoasters", "Region");
var countryList = getColumn("Rollercoasters", "Country");
var cityList = getColumn("Rollercoasters", "City");
var heightList = getColumn("Rollercoasters", "Height");
var speedList = getColumn("Rollercoasters", "Speed");
var lengthList = getColumn("Rollercoasters", "Length");

// Filtered lists taken from database lists.
var filteredRollercoasterList = [];
var filteredParkList = [];
var filteredRegionList = [];
var filteredCountryList = [];
var filteredCityList = [];
var filteredHeightList = [];
var filteredSpeedList = [];
var filteredLengthList = [];

// This onEvent codes for the "nextButton" on the introduction screen by setting the
// screen to "informationInput" and hiding and showing different dropdown menus.
onEvent("nextButton", "click", function( ) {
  setScreen("informationInput");
  showElement("countryDropdownNorthAmerica");
  hideElement("countryDropdownLatinAmerica");
  hideElement("countryDropdownEurope");
});

// This onEvent codes for the "regionDropdown" on the informationInput screen. When
// a region is chosen in the "regionDropdown", only the countries of that region is
// shown.
onEvent("regionDropdown", "click", function( ){
  region = getText("regionDropdown");
  if (region == "North America") {
    showElement("countryDropdownNorthAmerica");
    setText("countryDropdownLatinAmerica", "None");
    setText("countryDropdownLatinAmerica", "None");
    hideElement("countryDropdownLatinAmerica");
    hideElement("countryDropdownEurope");
  } else if (region == "Latin America") {
    showElement("countryDropdownLatinAmerica");
    setText("countryDropdownNorthAmerica", "None");
    setText("countryDropdownEurope", "None");
    hideElement("countryDropdownNorthAmerica");
    hideElement("countryDropdownEurope");
  } else if (region == "Europe") {
    showElement("countryDropdownEurope");
    setText("countryDropdownLatinAmerica", "None");
    setText("countryDropdownNorthAmerica", "None");
    hideElement("countryDropdownNorthAmerica");
    hideElement("countryDropdownLatinAmerica");
  }
});


// This onEvent operates the findCoaster button, calls the filter function, sets country
// variable based on which dropdown is being used, chooses a GIF, and displays results
onEvent("findCoaster", "click", function( ) {
  setScreen("finalResults");
  region = getText("regionDropdown");
  var dropdownNorthAmerica = getText("countryDropdownNorthAmerica");
  var dropdownLatinAmerica = getText("countryDropdownLatinAmerica");
  var dropdownEurope = getText("countryDropdownEurope");
  
  // Sets country variable based on dropdown menus.
  if (dropdownNorthAmerica == "None" && dropdownLatinAmerica == "None" && dropdownEurope == "None") {
    country = "None";
  } else if (dropdownNorthAmerica == "USA" && dropdownLatinAmerica == "None" && dropdownEurope == "None") {
    country = getText("countryDropdownNorthAmerica");
  } else if (dropdownNorthAmerica == "None" && dropdownLatinAmerica == "Argentina" && dropdownEurope == "None") {
    country = getText("countryDropdownLatinAmerica");
  } else if (dropdownNorthAmerica == "None" && dropdownLatinAmerica == "Mexico" && dropdownEurope == "None") {
    country = getText("countryDropdownLatinAmerica");
  } else if (dropdownNorthAmerica == "None" && dropdownLatinAmerica == "Peru" && dropdownEurope == "None") {
    country = getText("countryDropdownLatinAmerica");
  } else if (dropdownNorthAmerica == "None" && dropdownLatinAmerica == "Brazil" && dropdownEurope == "None") {
    country = getText("countryDropdownLatinAmerica");
  } else if (dropdownNorthAmerica == "None" && dropdownLatinAmerica == "Guatemala" && dropdownEurope == "None") {
    country = getText("countryDropdownLatinAmerica");
  } else if (dropdownNorthAmerica == "None" && dropdownLatinAmerica == "Chile" && dropdownEurope == "None") {
    country = getText("countryDropdownLatinAmerica");
  } else if (dropdownNorthAmerica == "None" && dropdownLatinAmerica == "Colombia" && dropdownEurope == "None") {
    country = getText("countryDropdownLatinAmerica");
  } else if (dropdownNorthAmerica == "None" && dropdownLatinAmerica == "Costa Rica" && dropdownEurope == "None") {
    country = getText("countryDropdownLatinAmerica");
  } else if (dropdownNorthAmerica == "None" && dropdownLatinAmerica == "None" && dropdownEurope == "Germany") {
    country = getText("countryDropdownEurope");
  } else if (dropdownNorthAmerica == "None" && dropdownLatinAmerica == "None" && dropdownEurope == "France") {
    country = getText("countryDropdownEurope");
  }
  
  // Chooses a GIF using pictureIndex variable and MOD operator.
  pictureIndex = pictureIndex + 1;
  picture = pictureIndex % 3;
  if (picture == 0) {
    showElement("RollerGIF3");
    hideElement("RollerGIF1");
    hideElement("RollerGIF2");
  } else if (picture == 1) {
    showElement("RollerGIF2");
    hideElement("RollerGIF1");
    hideElement("RollerGIF3");
  } else if (picture == 2) {
    showElement("RollerGIF1");
    hideElement("RollerGIF2");
    hideElement("RollerGIF3");
  }
  filter(region, country);
  
  // Displays text on the "finalResults" screen.
  setText("resultOutput", "You should visit " + rollercoasterResult + "!");
  setText("resultDisplay", "Amusement Park: " + parkResult + "\n" + "Region: " + regionResult + "\n" + "Country: " + countryResult + "\n" + "City: " + cityResult +  "\n" + "Height: " + heightResult + " meters" + "\n" + "Speed: " + coasterSpeedResult + " km/h" + "\n" + "Length: " + coasterLengthResult + " meters");
});

// This onEvent resets the dropdown menus on the "informationInput" screen, resets the
// variables and lists to blanks and empty lists, and codes for the "resetApp" button.
onEvent("resetApp", "click", function( ) {
  setText("countryDropdownNorthAmerica", "None");
  setText("countryDropdownLatinAmerica", "None");
  setText("countryDropdownEurope", "None");
  
  // Shows only the countries related to the region chosen.
  if (region == "North America") {
    setText("regionDropdown", "North America");
    showElement("countryDropdownNorthAmerica");
    hideElement("countryDropdownLatinAmerica");
    hideElement("countryDropdownEurope");
  } else if (region == "Latin America") {
    setText("regionDropdown", "Latin America");
    showElement("countryDropdownLatinAmerica");
    hideElement("countryDropdownNorthAmerica");
    hideElement("countryDropdownEurope");
  } else if (region == "Europe") {
    setText("regionDropdown", "Europe");
    showElement("countryDropdownEurope");
    hideElement("countryDropdownNorthAmerica");
    hideElement("countryDropdownLatinAmerica");
  }
  
  // Resets all variables to blank values.
  region = "";
  country = "";
  rollercoasterResult = "";
  parkResult = "";
  regionResult = "";
  countryResult = "";
  cityResult = "";
  heightResult = "";
  coasterSpeedResult = "";
  coasterLengthResult = "";
  
  // Resets all lists to empty lists.
  filteredRollercoasterList = [];
  filteredParkList = [];
  filteredRegionList = [];
  filteredCountryList = [];
  filteredCityList = [];
  filteredHeightList = [];
  filteredSpeedList = [];
  filteredLengthList = [];
  setScreen("informationInput");
});

// This function filters lists based the region and country parameters
// region {string} - region variable, holds the region inputted by the user
// country {string} - country variable, holds the country inputted by the user
// Changes result variables based on the random integers chosen and the items
// in the filtered lists.
function filter(region, country) {
  if (country == "None") {
    for (var i = 0; i < regionList.length; i++) {
      
      // Updates filtered lists depending on the region chosen.
      if (regionList[i] == region) {
        appendItem(filteredRollercoasterList, rollercoasterList[i]);
        appendItem(filteredParkList, parkList[i]);
        appendItem(filteredRegionList, regionList[i]);
        appendItem(filteredCountryList, countryList[i]);
        appendItem(filteredCityList, cityList[i]);
        appendItem(filteredHeightList, heightList[i]);
        appendItem(filteredSpeedList, speedList[i]);
        appendItem(filteredLengthList, lengthList[i]);
      }
      
    // Creates a randomInteger variable which randomly generates a number from 0 to the list
    // length, then uses that integer to pick from filtered lists, which then is used to 
    // update result variables.
    var randomInteger = randomNumber(0, filteredRollercoasterList.length-1);
    rollercoasterResult = filteredRollercoasterList[randomInteger];
    parkResult = filteredParkList[randomInteger];
    regionResult = filteredRegionList[randomInteger];
    countryResult = filteredCountryList[randomInteger];
    cityResult = filteredCityList[randomInteger];
    heightResult = filteredHeightList[randomInteger];
    coasterSpeedResult = filteredSpeedList[randomInteger];
    coasterLengthResult = filteredLengthList[randomInteger];
    }
  } else {
    for (var r = 0; r < regionList.length; r++) {
      
      // Updates filtered lists depending on the country and region chosen.
      if (regionList[r] == region && countryList[r] == country) {
        appendItem(filteredRollercoasterList, rollercoasterList[r]);
        appendItem(filteredParkList, parkList[r]);
        appendItem(filteredRegionList, regionList[r]);
        appendItem(filteredCountryList, countryList[r]);
        appendItem(filteredCityList, cityList[r]);
        appendItem(filteredHeightList, heightList[r]);
        appendItem(filteredSpeedList, speedList[r]);
        appendItem(filteredLengthList, lengthList[r]);
      }
    }
    
    // Creates a randomInteger variable which randomly generates a number from 0 to the list
    // length, then uses that integer to pick from filtered lists, which then is used to 
    // update result variables.
    var randomInt = randomNumber(0, filteredRollercoasterList.length-1);
    rollercoasterResult = filteredRollercoasterList[randomInt];
    parkResult = filteredParkList[randomInt];
    regionResult = filteredRegionList[randomInt];
    countryResult = filteredCountryList[randomInt];
    cityResult = filteredCityList[randomInt];
    heightResult = filteredHeightList[randomInt];
    coasterSpeedResult = filteredSpeedList[randomInt];
    coasterLengthResult = filteredLengthList[randomInt];
  }
}
