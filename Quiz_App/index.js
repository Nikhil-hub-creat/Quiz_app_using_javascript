function storeInputValue() {
    // Get the input element
    var inputElement = document.getElementById('name');

    // Get the value entered by the user
    var inputValue = inputElement.value;

    // Store the value in localStorage
    localStorage.setItem('storedValue', inputValue);

    // Call the function to display the stored value
    displayStoredValue();
  }
  function displayStoredValue() {
    // Retrieve the stored value from localStorage
    var storedValue = localStorage.getItem('storedValue');

    // Display the stored value
    var displayElement = document.getElementById('storedValue');
    displayElement.textContent = storedValue || 'No value stored';
  }

  // Call displayStoredValue on page load
  displayStoredValue();
