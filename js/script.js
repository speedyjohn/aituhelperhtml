const params = new URLSearchParams(window.location.search);
const encodedData = params.get("data");
const data = JSON.parse(decodeURIComponent(encodedData));

// Completing name
const fname = params.get("user").split("_")[0]
const lname = params.get("user").split("_")[1]
document.getElementById('title').innerText = `Deadlines for ${fname} ${lname}`

// Completing deadlines
const deadlinesContainer = document.getElementById("deadlines");
for (const [courseName, deadlines] of Object.entries(data)) {
    const courseContainer = document.createElement('div')
    courseContainer.classList.add('course')
    const courseHeader = document.createElement('h1');
    courseHeader.classList.add('course-title')
    courseHeader.textContent = courseName;
    deadlinesContainer.appendChild(courseContainer)
    courseContainer.appendChild(courseHeader);


    const sortedDeadlines = Object.entries(deadlines).sort((a, b) => a[1] - b[1]);
    for (const [assignmentName, timestamp] of sortedDeadlines) {
        const deadlineParagraph = document.createElement('p');
        deadlineParagraph.classList.add("course-paragraph")

        const deadlineDate = timestamp * 1000;
        const formattedDate = formatTimestamp(deadlineDate);
        const timeDifference = deadlineDate - Date.now();
        const formattedTimeDifference = formatTimeDifference(timeDifference);


        // Устанавливаем текст для параграфа
        deadlineParagraph.innerHTML = `<span class="assignment-name">${assignmentName}:</span>  ${formattedDate}</br> <span class="assignment-timeleft">${formattedTimeDifference} before the deadline</span>`;

        courseContainer.appendChild(deadlineParagraph);
    }
}