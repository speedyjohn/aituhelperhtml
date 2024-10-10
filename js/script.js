const params = new URLSearchParams(window.location.search);
const base64CompressedData = decodeURIComponent(params.get("data"));
const compressedData = Uint8Array.from(atob(base64CompressedData), c => c.charCodeAt(0));
const decompressedData = pako.inflate(compressedData, { to: 'string' });
const jsonData = JSON.parse(decompressedData);
console.log(jsonData)

// Completing deadlines
const deadlinesContainer = document.getElementById("deadlines");
for (const [courseName, deadlines] of Object.entries(jsonData)) {
    if(Object.keys(deadlines).length > 0) {
        const courseContainer = document.createElement('div')
        courseContainer.classList.add('course')
        courseContainer.innerHTML = "<i class=\"fa-solid fa-chevron-down\"></i>"
        const courseHeader = document.createElement('h1');
        courseHeader.classList.add('course-title')
        courseHeader.innerHTML = courseName.split('|')[0] + `<br><span>${courseName.split('|')[1]}</span>`;
        deadlinesContainer.appendChild(courseContainer)
        courseContainer.appendChild(courseHeader);
        const counter = document.createElement('div')
        counter.classList.add("counter")

        let paragraphCount = 0;
        const sortedDeadlines = Object.entries(deadlines).sort((a, b) => a[1] - b[1]);
        for (const [assignmentName, timestamp] of sortedDeadlines) {
            const deadlineParagraph = document.createElement('p');
            deadlineParagraph.classList.add("course-paragraph")

            const deadlineDate = timestamp * 1000;
            const formattedDate = formatTimestamp(deadlineDate);
            const timeDifference = deadlineDate - Date.now();
            const formattedTimeDifference = formatTimeDifference(timeDifference);

            deadlineParagraph.innerHTML = `<span class="assignment-name">${assignmentName}:</span>  ${formattedDate}</br> <span class="assignment-timeleft">${formattedTimeDifference} before the deadline</span>`;

            courseContainer.appendChild(deadlineParagraph);
            paragraphCount++;
        }
        counter.innerText = paragraphCount;
        courseContainer.appendChild(counter)
    }
}


const deadlines = document.querySelectorAll('.course')

deadlines.forEach(grade => {
    grade.addEventListener('click', () => {
        grade.classList.toggle('active');
    });
});