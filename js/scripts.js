(() => {
  const fibonacciStore = {};
  
  grabElements();
  getResults();
  sortResults();
 
  function grabElements() {
    fibonacciStore.error = document.getElementById('error');
    fibonacciStore.lengthErr = document.getElementById('lengthErr');
    fibonacciStore.spiner1 = document.querySelector('.loading1');
    fibonacciStore.check = document.getElementById('check');
    fibonacciStore.output = document.getElementById('output');
    fibonacciStore.input = document.getElementById('input');
    fibonacciStore.spiner2 = document.querySelector('.loading2');
    fibonacciStore.button = document.getElementById('button');
    fibonacciStore.sort = document.getElementById('sort');
    fibonacciStore.resultsContainer = document.querySelector('.results-container');
    fibonacciStore.fiboLocal = fibonacciLocal;
    fibonacciStore.fiboServer = fibonacciServer;
    fibonacciStore.getResults = getResults;
    fibonacciStore.input.addEventListener('keyup', maxNumberCheck);

    button.addEventListener('click', chooseWhereCalculate);
  }

  // depending on checkbox calculates fibonacci locally or on server
  function chooseWhereCalculate() {
    const { input, output, fiboLocal, fiboServer } = fibonacciStore; //deconstructing an object   
    
    if (check.checked === true) {
      let fiboValueServer = fiboServer(input.value);
      getResults();
    } else {
      let fiboValueLocal = fiboLocal(input.value);
      output.innerText = fiboValueLocal;
      output.style.display = 'block';
    }
  }

  // calculate fibo localy with recurrsion
  function fibonacciLocal(x) {
    if (x < 2) 
      return x;
    return fibonacciLocal(x - 1) + fibonacciLocal(x - 2);
  }

  // calculate fibonacci on server
  async function fibonacciServer() {
    let { input, output, error, spiner1 } = fibonacciStore;
    let inputValue = input.value;
    output.style.display = 'none';
    error.style.display = 'none';
    spiner1.classList.add("show");
     
    const response = await fetch(`http://localhost:5050/fibonacci/${inputValue}`);

    if (response.ok) {
      const data = await response.json();
      spiner1.classList.remove("show");
      output.innerText = data.result;
      output.style.display = 'block';
    } else {
        const errResponse = await response.text();
        spiner1.classList.remove("show");  
        error.innerText = errResponse;
        error.style.display = 'block';
      };
  };

  // fetches server for previous calculations list
  async function getResults() {
    let { spiner2 , resultsContainer } = fibonacciStore;
    spiner2.classList.add("show");

    const response = await fetch("http://localhost:5050/getFibonacciResults");
    const data = await response.json(); 
    for (let i = 0; i < 5; i++) {
      let line = data.results[i];
      let listEl = document.createElement("li");
      listEl = `<p>The Fibonacci Of <b>${line.number}</b> is <b>${line.result}</b>. Calculated at: ${new Date(line.createdDate).toString()}</p><hr>`;
      spiner2.classList.remove("show");
      resultsContainer.insertAdjacentHTML('afterbegin', listEl);
      };
  };

  // sorts the list of results
  function sortResults(resultsList) {
    let { sort, resultsContainer, getResults } = fibonacciStore;
    document.getElementById('sort-form').addEventListener('submit', (event) => {
      event.preventDefault();
      const formElement = event.target;
      const sortOption = formElement.selectedIndex; 
      if (sortOption = "0") {
        resultsList = data.results.sort((a,b) => (a.createdDate > b.createdDate) ? 1 : -1);
      } else if (sortOption = "1") {
        resultsList = data.results.sort((a,b) => (a.createdDate < b.createdDate) ? 1 : -1);
      } else if (sortOption = "2") {
        resultsList = data.results.sort((a,b) => (a.number > b.number) ? 1 : -1);
      } else if (sortOption = "3") {
        resultsList = data.results.sort((a,b) => (a.number < b.number) ? 1 : -1);
      };
    });
    console.log(resultsList);
    return resultsList;
  };

  // checks if the input number is not more than 50
  function maxNumberCheck() {
    let { input, button, lengthErr } = fibonacciStore;
    let inputValue = input.value;
    if (inputValue > 50) {
      lengthErr.style.visibility = 'visible';
      button.disabled = true;
    } else {
      lengthErr.style.visibility = 'hidden';
      button.disabled = false;
    }
  }
})();

      

      
