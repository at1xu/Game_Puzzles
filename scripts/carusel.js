
    const slidesData = {
        easy: [
            {src: "./Images/caruselImage/easy1.jpg", id: "easy1"},
            {src: "./Images/caruselImage/easy2.jpg", id: "easy2"},
            {src: "./Images/caruselImage/easy3.jpg", id: "easy3"},
        ],
        normal: [
            {src: "./Images/caruselImage/normal1.jpg", id: "normal1"},
            {src: "./Images/caruselImage/normal2.jpg", id: "normal2"},
            {src: "./Images/caruselImage/normal3.jpg", id: "normal3"},
        ],
        hard: [
            {src: "./Images/caruselImage/hard1.jpg", id: "hard1"},
            {src: "./Images/caruselImage/hard2.jpg", id: "hard2"},
            {src: "./Images/caruselImage/hard3.jpg", id: "hard3"},
        ]
    };

    function showCarousel(level) {
        // Hide the button container
        document.getElementById('button-container').style.display = 'none';
    
        // Show the carousel
        const carousel = document.getElementById('carouselExampleIndicators');
        carousel.style.display = 'block';
    
        // Populate the carousel with the appropriate images
        const indicators = document.getElementById('carousel-indicators');
        const inner = document.getElementById('carousel-inner');
        indicators.innerHTML = '';
        inner.innerHTML = '';
    
        slidesData[level].forEach((slide, index) => {
            // Create carousel indicators
            const indicator = document.createElement('li');
            indicator.setAttribute('data-target', '#carouselExampleIndicators');
            indicator.setAttribute('data-slide-to', index);
            if (index === 0) indicator.className = 'active';
            indicators.appendChild(indicator);
    
            // Create carousel items
            const item = document.createElement('div');
            item.className = 'carousel-item';
            if (index === 0) item.classList.add('active');
    
            const img = document.createElement('img');
            img.className = 'd-block w-100';
            img.src = slide.src;
            img.setAttribute('data-id', slide.id);
            img.addEventListener('click', () => startGame(slide.id));
            item.appendChild(img);
    
            inner.appendChild(item);
        });
    }
    
    function startGame(imageId) {
        // Redirect to the game page with the selected imageId
        window.location.href = `Normal.html?imageId=${encodeURIComponent(imageId)}`;
    }
   
