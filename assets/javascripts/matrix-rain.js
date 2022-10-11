const MatrixRain = {};

(function(MatrixRain, window) {
    'use strict';

    // canvas element we need globally
    let c;

    const checkEscape = (e) => { if (e.key === 'Escape') endRain(e) }

    const endRain = MatrixRain.endRain = (e) => {
        if (c) c.remove();
        document.documentElement.setAttribute('style', 'overflow:auto');
        document.removeEventListener('keyup', checkEscape);
    }

    MatrixRain.startRain = () => {
        // set up the canvas
        // source: https://www.sololearn.com/compiler-playground/WpFa2Yz9WP8g
        c = document.createElement('canvas');
        c.setAttribute('id', `mdr-${Math.random()}`);
        c.setAttribute('style', 'position:absolute;top:0px;left:0px;z-index:10000; overflow:hidden;');
        document.documentElement.setAttribute('style', 'overflow:hidden');
        document.body.appendChild(c);
        //making the canvas full screen
        c.height = document.body.clientHeight;  // document.documentElement.scrollHeight;
        c.width = window.innerWidth;
        const ctx = c.getContext("2d");
        // add event listener for escape key
        document.addEventListener('keyup', checkEscape)

        // source: https://dev.to/javascriptacademy/matrix-raining-code-effect-using-javascript-4hep
        // chinese characters - taken from the unicode charset
        const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numbers = '0123456789';
        const matrix = (katakana + alphabet + numbers).split("");

        const font_size = 10;
        const columns = c.width/font_size; // number of columns for the rain
        // an array of drops - one per column
        const drops = [];
        // x below is the x coordinate
        // 1 = y co-ordinate of the drop (same for every drop initially)
        for (let x = 0; x < columns; x++) {
            drops[x] = 1; 
        }

        // draw the characters
        const draw = () => {
            // black background for the canvas
            // translucent background to show trail
            ctx.fillStyle = "rgba(0, 0, 0, 0.04)";
            ctx.fillRect(0, 0, c.width, c.height);
            ctx.fillStyle = "#0F0"; // green text
            ctx.font = font_size + "px arial";

            // looping over drops
            for (let i = 0; i < drops.length; i++) {
                // a random character to print
                const text = matrix[Math.floor(Math.random()*matrix.length)];
                // x = i*font_size, y = value of drops[i]*font_size
                ctx.fillText(text, i*font_size, drops[i]*font_size);

                // sending the drop back to the top randomly after it has crossed the screen
                // adding a randomness to the reset to make the drops scattered on the Y axis
                if (drops[i] * font_size > c.height && Math.random() > 0.975)
                    drops[i] = 0;

                // incrementing Y coordinate
                drops[i]++;
            }
        }
        setInterval(draw, 50);

    }
})(MatrixRain, window);
