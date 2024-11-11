const countdownDisplay = document.querySelector(".stopwatch-countdown-display");
const confirmationMessage = document.querySelector(".confirmation-text");
const stopwatchButton = document.querySelector(".start-timer-button");
const userInput = document.getElementById("target-datetime");

// Initialize countdown display with a placeholder
countdownDisplay.innerText = 'DD-HH-MM--SS';
let userTargetInput;
// Listen to the user's input (date) and calculate the remaining time
userInput.addEventListener("input", (e) => {
    userTargetInput = e.target.value;

    // Function to format the input date and time (user's target date)
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

    // Function to calculate and format the remaining time duration (in days, hours, minutes, seconds)
    const formattingDatesDurationTime = (remainingTimeInSeconds) => {
        let days = Math.floor(remainingTimeInSeconds / (24 * 3600)); // Calculate full days
        let hours = Math.floor((remainingTimeInSeconds % (24 * 3600)) / 3600); // Calculate remaining hours
        let minutes = Math.floor((remainingTimeInSeconds % 3600) / 60); // Calculate remaining minutes
        let seconds = Math.floor(remainingTimeInSeconds % 60); // Calculate remaining seconds

        // Format the duration
        let formattedDurationTime = `${String(days).padStart(2, "0")}:${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

        return {formattedDurationTime};
    };

    // Function to calculate the duration between the current time and the user's target date
    const calculateDuration = () => {
        const {date, time} = formattingDateOutput(); // Get formatted date and time
        const targetDate = new Date(userTargetInput); // User's target date
        const currentDate = new Date(); // Current date
        const parsedTargetDate = Date.parse(targetDate);
        if (parsedTargetDate > currentDate) {
            if (isNaN(parsedTargetDate)) {
                console.error("Invalid date format. Please ensure 'userTargetInput' is in a valid format.");
            } else {
                // Calculate the difference in seconds between the current date and the target date
                const durationInSeconds = Math.abs((currentDate - targetDate) / 1000);

                const {formattedDurationTime} = formattingDatesDurationTime(durationInSeconds);

                // Display the remaining time for countdown
                countdownDisplay.innerHTML = `${formattedDurationTime}`; // Update countdown display
                confirmationMessage.innerHTML = `${date}|${time}`; // Update confirmation message
            }
        }
        else{
            alert("Please Select Date From Now Onwards");
        }
    };

    // Call the calculateDuration function to update the countdown
    calculateDuration();

});
