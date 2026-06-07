document.addEventListener('DOMContentLoaded', () => {
            const cursorContainer = document.getElementById('winCursor');
            const stateArrow = document.getElementById('stateArrow');
            const stateHand = document.getElementById('stateHand');
            let isVisible = false;

            // Coordinate listener loop
            window.addEventListener('mousemove', (e) => {
                if (!isVisible) {
                    cursorContainer.style.display = 'block';
                    isVisible = true;
                }

                // Offsets -4 and -2 keep the vector tip anchored perfectly to click targets
                const xPos = e.clientX - 4;
                const yPos = e.clientY - 2;

                // translate3d forces the browser to use your Mac's GPU for 0-lag processing
                cursorContainer.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
            });

            // Interactive Element Triggers (Swaps arrow shape to hand shape on hovers)
            const interactiveElements = document.querySelectorAll('a, button, .action-button');
            
            interactiveElements.forEach(element => {
                element.addEventListener('mouseenter', () => {
                    stateArrow.classList.remove('active');
                    stateHand.classList.add('active');
                });
                
                element.addEventListener('mouseleave', () => {
                    stateHand.classList.remove('active');
                    stateArrow.classList.add('active');
                });
            });

            // Clean fallback toggle if cursor leaves the main window frame
            document.addEventListener('mouseleave', () => {
                cursorContainer.style.display = 'none';
                isVisible = false;
            });
        });