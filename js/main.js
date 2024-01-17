var sessionStart = Date.now(); // Initialize sessionStart when the user loads the website

        var events = [
            {title: '12/23', description: 'Our club was founded in December of 2023 and officially recognized as an MSU student club', symbol: 'fas fa-medal', date: 2023, color: '#cd7f32', image: 'images/SECS_Logo.png'},
            {title: '1/24', description: 'We held our first club meeting, had a booth at Springticipation in the STEM building, and had our first meetings with organizations interested in working with us', symbol: 'fas fa-medal', date: 2024, color: 'gold', image: 'images/SECS_Logo_Transparent_Small.png'}
        ];
        var currentYear = new Date().getFullYear();


        function updateContent(image, description) {
            document.getElementById('image').src = image;
            document.getElementById('text').innerText = description;
        }

        function addEvent(event) {
            var timeline = document.getElementById('timeline');
            var eventElement = document.createElement('div');
            eventElement.className = 'event';
            eventElement.style.right = ((currentYear - event.date) / (currentYear - 2023) * 100) + '%';
            eventElement.innerHTML = '<i class="' + event.symbol + '" style="color: ' + event.color + '; font-size: 30px; cursor: pointer;" onclick="updateContent(\'' + event.image + '\', \'' + event.description + '\')"></i><p>' + event.title + '</p>';
            timeline.appendChild(eventElement);
        }

        function showSubpage(pageId) {
            var subpages = document.getElementsByClassName('subpage');
            for (var i = 0; i < subpages.length; i++) {
                subpages[i].classList.remove('active');
            }
            document.getElementById(pageId).classList.add('active');

            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth' 
              });

            var buttons = document.getElementsByTagName('button');
            for (var i = 0; i < buttons.length; i++) {
                buttons[i].classList.remove('selected');
            }
            document.querySelector(`button[onclick="showSubpage('${pageId}')"]`).classList.add('selected');
            if(pageId === 'Decathlon'){
                createEventRows();
                setSameHeight();
            }
        }
        
        function getUserScore(eventIndex) {

        var scoreInput = document.getElementById('deacthlon-score-' + index);
        return parseFloat(scoreInput.value); 
        }

        function drawLines(inputElement, value1, value2, value3) {
        // 'inputElement' is the HTML element of the input box

        // Get the bounding rectangle of the input element
        const rect = inputElement.getBoundingClientRect();

        // Use the top property of the bounding rectangle as the height
        // Add window.scrollY to account for any scrolling
        const inputHeight = rect.top + window.scrollY;

        // Find the maximum score to set the longest line's length
        const maxScore = Math.max(value1, value2, value3);

        // Calculate the relative lengths of the lines
        const length1 = (value1 / maxScore) * 100;
        const length2 = (value2 / maxScore) * 100;
        const length3 = (value3 / maxScore) * 100;

        // Get the container where the lines will be drawn
        const visualization = document.getElementById('deacthlon-visual-container');

        // Create a container for the lines at the specified height
        const lineContainer = document.createElement('div');
        lineContainer.style.position = 'absolute';
        lineContainer.style.top = inputHeight + 'px'; // Set the top position to the input box's height
        lineContainer.style.width = '80%'; // Set the width to half of the screen
        lineContainer.style.left = '10%' //padding
        lineContainer.style.height = '20px'; // Height of the line

        // Function to create a line with gradient and hover effect
        function createLine(length, color) {
            const line = document.createElement('div');
            line.style.width = length + '%';
            line.style.height = '100%';
            line.style.backgroundColor = color;
            line.style.position = 'absolute';
            line.style.borderRadius = '10px'; // Rounded edges
            line.style.backgroundImage = 'linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,0.5))'; // Gradient effect

            // Create a span element for the score value
            const scoreValue = document.createElement('span');
            scoreValue.textContent = length.toFixed(1) + '%'; // Display the percentage value
            scoreValue.style.position = 'absolute';
            scoreValue.style.left = '100%'; 
            scoreValue.style.marginLeft = '5px';
            scoreValue.style.visibility = 'hidden'; // Hide by default
            line.appendChild(scoreValue);

            // Add hover effect to show score value
            line.addEventListener('mouseenter', function() {
            scoreValue.style.visibility = 'visible';
            });
            line.addEventListener('mouseleave', function() {
            scoreValue.style.visibility = 'hidden';
            });

            return line;
        }

        // Create and append lines to the container
        if(length1 >= length2 && length1 >= length3){
            lineContainer.appendChild(createLine(length1, 'red'));
            if(length2 >= length3){
                lineContainer.appendChild(createLine(length2, 'green'));
                lineContainer.appendChild(createLine(length3, 'blue'));
            } else {
                lineContainer.appendChild(createLine(length3, 'blue'));
                lineContainer.appendChild(createLine(length2, 'green'));
            }
        } else if(length2 >= length1 && length2 >= length3){
            lineContainer.appendChild(createLine(length2, 'green'));
            if (length1 >= length3){
                lineContainer.appendChild(createLine(length1, 'red'));
                lineContainer.appendChild(createLine(length3, 'blue'));
            } else {
                lineContainer.appendChild(createLine(length3, 'blue'));
                lineContainer.appendChild(createLine(length1, 'red'));
            }
        } else {
            lineContainer.appendChild(createLine(length3, 'blue'));
            if(length1 >= length2){
                lineContainer.appendChild(createLine(length1, 'red'));
                lineContainer.appendChild(createLine(length2, 'green'));
            } else {
                lineContainer.appendChild(createLine(length2, 'green'));
                lineContainer.appendChild(createLine(length1, 'red'));
            }
        }

        // Append the container to the visualization area
        visualization.appendChild(lineContainer);
        }

        document.getElementById('contactForm').addEventListener('submit', function(event) {
            event.preventDefault();

            var firstName = document.getElementById('firstName').value;
            var lastName = document.getElementById('lastName').value;
            var email = document.getElementById('email').value;
            var message = document.getElementById('message').value;

            if (!firstName || !lastName || !email || !message) {
                alert('Please fill out all fields.');
            } else if (typeof firstName !== 'string' || typeof lastName !== 'string' || typeof email !== 'string' || typeof message !== 'string') {
                alert('All fields must be strings.');
            } else {
                alert('Form submitted successfully!');
            }
        });
        function autoExpand(element) {
            element.style.height = 'inherit';
            var computed = window.getComputedStyle(element);
            var height = parseInt(computed.getPropertyValue('border-top-width'), 10)
                         + parseInt(computed.getPropertyValue('padding-top'), 10)
                         + element.scrollHeight
                         + parseInt(computed.getPropertyValue('padding-bottom'), 10)
                         + parseInt(computed.getPropertyValue('border-bottom-width'), 10);

            element.style.height = height + 'px';
        };
        // Apply the autoExpand function to the textarea
        document.getElementById('message').addEventListener('input', function() {autoExpand(this);});

        function animateNumber(number, element) {
            let startTimestamp = null;
            const duration = 3000; // Duration in milliseconds
          
            const step = (timestamp) => {
              if (!startTimestamp) startTimestamp = timestamp;
              const progress = Math.min((timestamp - startTimestamp) / duration, 1);
              element.textContent = (progress * number).toFixed(2);
              if (progress < 1) {
                window.requestAnimationFrame(step);
              }
            };
          
            window.requestAnimationFrame(step);
          }
          
          // Intersection Observer to trigger the animation
          const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                const element = entry.target;
                const index = element.getAttribute('data-index');
                animateHighScores(trackEvents[index].highScore, element);
                observer.unobserve(element); // Stop observing after animation
              }
            });
          }, { threshold: 0.5 }); // Trigger when 50% of the element is visible

        events.forEach(addEvent);
        updateContent(events[events.length - 1].image, events[events.length - 1].description);
        document.getElementById('currentYear').innerText = currentYear;