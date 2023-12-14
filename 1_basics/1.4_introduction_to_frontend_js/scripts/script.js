// Task 1.4.1
function hideUsingCSS(elementId) {
    const blackSquare = document.getElementById(elementId);
    blackSquare.style.display = "none";
}
function hideUsingJS(elementId) {
    const blackSquare = document.getElementById(elementId);
    blackSquare.parentNode.removeChild(blackSquare);
}

function hideUsingCSSAndJS(elementId) {
    const blackSquare = document.getElementById(elementId);
    blackSquare.style.display = 'none';
    blackSquare.classList.add('hidden');
}

// Task 1.4.2
function toggleUsingCssAndJs(elementId) {
    const blackSquare = document.getElementById(elementId);
    if (blackSquare) {
        if (blackSquare.classList.contains('hidden')) {
            blackSquare.classList.remove('hidden');
        } else {
            blackSquare.classList.add('hidden');
        }
    }
}

// Task 1.4.3
document.addEventListener('DOMContentLoaded', function () {
    const blackSquaresRow = document.getElementById('blackSquaresRow');
    for (let i = 0; i < 5; i++) {
        const block = document.createElement('div');
        block.classList.add('blackSquare');
        block.addEventListener('click', function () {
            toggleBlackSquare(block);
        });
        blackSquaresRow.appendChild(block);
    }
});
function toggleBlackSquare(element) {
    if (element.classList.contains('hidden')) {
        element.classList.remove('hidden');
    } else {
        element.classList.add('hidden');
    }
}
function toggleBlackSquaresRow() {
    const blackSquares = document.querySelectorAll('.blackSquare');
    blackSquares.forEach(function (square) {
        toggleBlackSquare(square);
    });
}

// Task 1.4.4
function toggleElementsBySelector() {
    const selectorInput = document.getElementById('selectorInput').value;
    const elementsToToggle = document.querySelectorAll(selectorInput);

    elementsToToggle.forEach(function (element) {
        element.classList.toggle('hidden');
    });
}

// Task 1.4.5
function toggleGreetingSquare() {
    const yellowSquare = document.getElementById('yellowSquare');
    if (yellowSquare.getAttribute('data-clicked') !== 'true') {
        alert('Привіт');
        yellowSquare.setAttribute('data-clicked', 'true');
        yellowSquare.onclick = function () {
            yellowSquare.style.display = 'none';
        };
    }
}
// Task 1.4.6
const redSquare = document.getElementById('redSquare');
const hoverButton = document.getElementById('hoverButton');
hoverButton.addEventListener('mouseenter', showRedSquare);
hoverButton.addEventListener('mouseleave', hideRedSquare);
function showRedSquare() {
    redSquare.style.display = 'block';
}
function hideRedSquare() {
    redSquare.style.display = 'none';
}

// Task 1.4.7
function showGreenRectangle() {
    const greenRectangle = document.getElementById('greenRectangle');
    greenRectangle.style.display = 'block';
}
function hideGreenRectangle() {
    const greenRectangle = document.getElementById('greenRectangle');
    greenRectangle.style.display = 'none';
}

// Task 1.4.8
function showImage() {
    const imageUrl = document.getElementById('imageInput').value;
    const imageContainer = document.getElementById('imageContainer');
    if (imageUrl.trim() === '') {
        imageContainer.innerHTML = "URL для зображення не задано.";
        return;
    }
    const img = document.createElement('img');
    img.src = imageUrl;
    imageContainer.innerHTML = "";
    imageContainer.appendChild(img);
    img.onerror = function (error) {
        console.error('Помилка завантаження зображення:', error);
        imageContainer.innerHTML = "Помилка завантаження зображення.";
    };
}

// Task 1.4.9
function showImages() {
    const imagesText = document.getElementById('imagesInput').value;
    const imageUrls = imagesText.split('\n').filter(url => url.trim() !== '');
    const imagesContainer = document.getElementById('imagesContainer');
    imagesContainer.innerHTML = '';
    for (let i = 0; i < imageUrls.length; i++) {
        const imgContainer = document.createElement('div');
        const img = document.createElement('img');
        img.src = imageUrls[i];
        img.onerror = function (error) {
            console.error('Помилка завантаження зображення:', error);
            const errorMessage = document.createElement('p');
            errorMessage.innerText = 'Помилка завантаження зображення.';
            imgContainer.appendChild(errorMessage);
        };
        imgContainer.appendChild(img);
        imagesContainer.appendChild(imgContainer);
    }
}

// Task 1.4.10 
const coordinatesBlock = document.getElementById('coordinatesBlock');

document.addEventListener('mousemove', function (event) {
    updateCoordinates(event.clientX, event.clientY);
});

function updateCoordinates(x, y) {
    coordinatesBlock.textContent = ` Task 1.4.10: Х: ${x}, У: ${y}`;
}

// Task 1.4.11 
const languageBlock = document.getElementById('languageBlock');
updateLanguageInfo();
function updateLanguageInfo() {
    languageBlock.innerHTML = 'Task 1.4.11: Мова браузера: ' + navigator.language;
}

// Task 1.4.12 
const coordinatesInfo = document.getElementById('coordinatesInfo');

function updateLocationInfo() {
    const locationBlock = document.querySelector('.location-block');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                const locationString = `Task 1.4.12: Ш: ${latitude}, Д: ${longitude}`;
                locationBlock.innerHTML = locationString;
            },
            function (error) {
                if (error.code === error.PERMISSION_DENIED) {
                    locationBlock.innerHTML = 'Доступ до місцезнаходження відмовлено';
                }
            }
        );
    } else {
        locationBlock.innerHTML = 'Геолокація не підтримується браузером';
    }
}
updateLocationInfo();

// Task 1.4.13
window.onload = function () {
    loadData('localStorageBlock');
    loadData('cookiesBlock');
    loadData('sessionStorageBlock');
};

function saveData(key) {
    const content = document.getElementById(key).innerHTML;
    if (key === 'localStorageBlock') {
        localStorage.setItem(key, content);
    } else if (key === 'cookiesBlock') {
        const encodedContent = encodeURIComponent(content);
        document.cookie = `${key}=${encodedContent}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/; SameSite=None; Secure;`;
    } else if (key === 'sessionStorageBlock') {
        sessionStorage.setItem(key, content);
    }
}
function loadData(key) {
    const savedContent = getData(key);
    if (savedContent) {
        document.getElementById(key).innerHTML = savedContent;
    }
}

function getData(key) {
    if (key === 'localStorageBlock') {
        return localStorage.getItem(key);
    } else if (key === 'cookiesBlock') {
        const cookieValue = getCookieValue(key);
        return cookieValue ? decodeURIComponent(cookieValue) : null;
    } else if (key === 'sessionStorageBlock') {
        return sessionStorage.getItem(key);
    }
    return null;
}

function getCookieValue(key) {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        const [cookieKey, cookieValue] = cookie.split('=');
        const trimmedKey = cookieKey.trim();
        if (trimmedKey === key) {
            if (cookieValue) {
                const decodedValue = decodeURIComponent(cookieValue.replace(/\+/g, ' '));
                return decodedValue;
            }
        }
    }
    return null;
}
// Task 1.4.14
function scrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');

    const scrollStep = -window.scrollY / (500 / 15);
    const scrollInterval = setInterval(function () {
        if (window.scrollY !== 0) {
            window.scrollBy(0, scrollStep);
        } else {
            clearInterval(scrollInterval);
            scrollToTopBtn.style.display = 'none';
        }
    }, 15);
}

// Показати або приховати кнопку при прокрутці
window.addEventListener('scroll', function () {
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');

    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollToTopBtn.style.display = 'block';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

// Task 1.4.15
document.addEventListener('DOMContentLoaded', function () {
    const outerBlock = document.getElementById('outerBlock');
    const innerBlock = document.getElementById('innerBlock');

    outerBlock.addEventListener('click', function () {
        alert('You have clicked on the external unit!');
    });

    innerBlock.addEventListener('click', function (event) {
        event.stopPropagation();
        alert('You have clicked on the indoor unit!');
    });
});

// Task 1.4.16
function showGrayScreen() {
    const grayScreen = document.getElementById('grayScreen');
    grayScreen.style.display = 'block';
    document.body.style.overflow = 'hidden';
    grayScreen.addEventListener('click', hideGrayScreen);
}

// функції для приховання сірого екрану
function hideGrayScreen() {
    const grayScreen = document.getElementById('grayScreen');
    grayScreen.style.display = 'none';
    document.body.style.overflow = 'auto';
    // Зняття обробника події після приховання
    grayScreen.removeEventListener('click', hideGrayScreen);
}

// Task 1.4.17
document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        return false;
    });
});

// Task 1.4.18
const fileInputContainer = document.querySelector('.file-input-container');

fileInputContainer.addEventListener('dragover', function (event) {
    event.preventDefault();
    fileInputContainer.classList.add('drag-over');
});

fileInputContainer.addEventListener('dragleave', function () {
    fileInputContainer.classList.remove('drag-over');
});

fileInputContainer.addEventListener('drop', function (event) {
    event.preventDefault();
    fileInputContainer.classList.remove('drag-over');
    handleFileSelect(event);
});

function handleFileSelect(event) {
    const fileInput = document.getElementById('fileInput');
    const label = document.querySelector('.label-text');

    const files = event.target.files || event.dataTransfer.files;

    if (files.length > 0) {
        label.textContent = files[0].name;
    }
}