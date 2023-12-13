function hideUsingCSS(elementID) {
    const myDiv = document.getElementById(elementID);
    myDiv.classList.add('hidden');
}

function hideUsingJS(elementID) {
    const myDiv = document.getElementById(elementID);
    myDiv.parentNode.removeChild(myDiv);
}

function hideUsingCSSAndJS(elementID) {
    const myDiv = document.getElementById(elementID);
    myDiv.style.display = 'none';
    myDiv.classList.add('hidden');
}