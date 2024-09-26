const params = new URLSearchParams(window.location.search);
const encodedData = params.get("data");
const data = JSON.parse(decodeURIComponent(encodedData));

// Completing name
document.getElementById('title').innerText = `Deadlines for ${params.get("user")}`

// Completing deadlines
const deadlinesContainer = document.getElementById("deadlines");
for (const [courseName, deadlines] of Object.entries(data)) {
    const courseHeader = document.createElement('h1');
    courseHeader.textContent = courseName;
    deadlinesContainer.appendChild(courseHeader);


    const sortedDeadlines = Object.entries(deadlines).sort((a, b) => a[1] - b[1]);
    for (const [assignmentName, timestamp] of sortedDeadlines) {
        const deadlineParagraph = document.createElement('p');

        const deadlineDate = timestamp * 1000;
        const formattedDate = formatTimestamp(deadlineDate);
        const timeDifference = deadlineDate - Date.now();
        const formattedTimeDifference = formatTimeDifference(timeDifference);


        // Устанавливаем текст для параграфа
        deadlineParagraph.innerHTML = `${assignmentName}: <span class="">${formattedDate}</span> </br> ${formattedTimeDifference} before the deadline`;

        deadlinesContainer.appendChild(deadlineParagraph);
    }
}