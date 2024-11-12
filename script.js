const countdownDisplay = document.querySelector(".stopwatch-countdown-display");
const confirmationMessage = document.querySelector(".confirmation-text");
const stopwatchButton = document.querySelector(".start-timer-button");
const userInput = document.getElementById("target-datetime");

countdownDisplay.innerText = 'DD-HH-MM--SS';
let userTargetInput;

userInput.addEventListener("input", (e) => {
    userTargetInput = e.target.value;

    const formattingDateOutput = () => {
        let newDate = new Date(userTargetInput); // User input date
        let day = String(newDate.getDate()).padStart(2, "0");
        let month = String(newDate.getMonth() + 1).padStart(2, "0");
        let year = newDate.getFullYear();
        let hours = String(newDate.getHours()).padStart(2, "0");
        let minutes = String(newDate.getMinutes()).padStart(2, "0");
        let seconds = String(newDate.getSeconds()).padStart(2, "0");

        let date = `${day}/${month}/${year}`;
        let time = `${hours}:${minutes}:${seconds}`;

        return {date, time};
    };


    const formattingDatesDurationTime = (remainingTimeInSeconds) => {
        let days = Math.floor((remainingTimeInSeconds / (24 * 3600)));
        let hours = Math.floor((remainingTimeInSeconds % (24 * 3600) / 3600));
        let minutes = Math.floor((remainingTimeInSeconds % 3600) / 60);
        let seconds = Math.floor((remainingTimeInSeconds % 60));

        let formattedDurationTime = `${String(days).padStart(2, "0")}:${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

        return {formattedDurationTime};
    };

    const calculateDuration = () => {
        const {date, time} = formattingDateOutput();
        const targetDate = new Date(userTargetInput);
        const currentDate = new Date();
        const parsedTargetDate = Date.parse(targetDate);
        if (parsedTargetDate > currentDate) {
            if (isNaN(parsedTargetDate)) {
                console.error("Invalid date format. Please ensure 'userTargetInput' is in a valid format.");
            } else {
                const durationInSeconds = Math.abs((currentDate - targetDate) / 1000);
                const {formattedDurationTime} = formattingDatesDurationTime(durationInSeconds);
                countdownDisplay.innerHTML = `${formattedDurationTime}`;
                confirmationMessage.innerHTML = `${formattedDurationTime}`;
            }
        } else {
            alert("Please Select Date From Now Onwards");
        }
    };

    calculateDuration();

});
