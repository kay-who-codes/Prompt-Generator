document.addEventListener("DOMContentLoaded", () => {
    const title = document.getElementById("title");
    const generateBtn = document.getElementById("generateBtn");
    const homeBtn = document.getElementById("homeBtn");
    const output = document.getElementById("output");
    const fileSelector = document.getElementById("fileSelector");
    const clickSound = document.getElementById("clickSound");

    let outputs = [];

    function loadOutputs(file) {
        outputs = [];
        return new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.src = file + "?t=" + Date.now(); // Cache busting
            script.onload = () => {
                if (window.loadedOutputs && Array.isArray(window.loadedOutputs)) {
                    outputs = window.loadedOutputs;
                    resolve();
                } else {
                    reject("Invalid outputs format.");
                }
            };
            script.onerror = () => reject("Failed to load outputs.");
            document.body.appendChild(script);
        });
    }

    generateBtn.addEventListener("click", async () => {
        clickSound.play();

        if (outputs.length === 0) {
            try {
                await loadOutputs(fileSelector.value);
            } catch (error) {
                console.error(error);
                return;
            }
        }

        if (outputs.length > 0) {
            title.style.display = "none"; // Hide H1
            fileSelector.style.display = "none"; // Hide Select
            generateBtn.textContent = "Another One";
            output.textContent = outputs[Math.floor(Math.random() * outputs.length)];
            homeBtn.classList.remove("hidden");
        }
    });

    homeBtn.addEventListener("click", () => {
        clickSound.play();
        title.style.display = "block"; // Show H1 again
        fileSelector.style.display = "block"; // Show Select
        generateBtn.textContent = "Generate";
        output.textContent = "";
        outputs = []; // Reset stored outputs
        homeBtn.classList.add("hidden");
    });
    
});


