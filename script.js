const countdownDisplay = document.querySelector(".stopwatch-countdown-display");
const confirmationMessage = document.querySelector(".confirmation-text");
const stopwatchButton = document.querySelector(".start-timer-button");
const userInput = document.getElementById("target-datetime");

let userTargetInput;
let countdownTimer;

userInput.addEventListener("input", (e) => {
    userTargetInput = e.target.value;

    const formatDuration = (remainingTimeInSeconds) => {
        let days = Math.floor(remainingTimeInSeconds / (24 * 3600));
        let hours = Math.floor((remainingTimeInSeconds % (24 * 3600)) / 3600);
        let minutes = Math.floor((remainingTimeInSeconds % 3600) / 60);
        let seconds = Math.floor(remainingTimeInSeconds % 60);
        return `${String(days).padStart(2, "0")}:${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    };

    const displayCountdown = (duration) => {
        clearInterval(countdownTimer);
        countdownTimer = setInterval(() => {
            if (duration <= 0) {
                clearInterval(countdownTimer);
                countdownDisplay.innerHTML = "Countdown Complete!";
                return;
            }
            countdownDisplay.innerHTML = formatDuration(duration);
            duration--;
        }, 1000);
    };
    const calculateDuration = () => {
        const currentDate = new Date();
        const parsedTargetDate = Date.parse(userTargetInput);
        if (parsedTargetDate > currentDate) {
            const durationInSeconds = Math.abs((parsedTargetDate - currentDate) / 1000);
            stopwatchButton.addEventListener('click', e => {
                displayCountdown(durationInSeconds);
            })
            confirmationMessage.innerHTML = `${formatDuration(durationInSeconds)}`;
        } else {
            alert("Please select a future date.");
        }
    };

    calculateDuration();
});
