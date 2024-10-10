const params = new URLSearchParams(window.location.search);
const base64CompressedData = decodeURIComponent(params.get("data"));
const compressedData = Uint8Array.from(atob(base64CompressedData), c => c.charCodeAt(0));
const decompressedData = pako.inflate(compressedData, { to: 'string' });
const jsonData = JSON.parse(decompressedData);
console.log(jsonData)

const scheduleContainer = document.getElementById("schedule");
for (const [dayOfWeek, lessons] of Object.entries(jsonData)) {
    if(Object.keys(lessons).length > 0) {
        const container = document.createElement('div');
        container.classList.add('grades');
        container.innerHTML = "<i class=\"fa-solid fa-chevron-down\"></i>";
        scheduleContainer.appendChild(container);
        const scheduleHeader = document.createElement('h1');
        scheduleHeader.classList.add('course-title')
        scheduleHeader.innerHTML = `${dayOfWeek}`;
        container.appendChild(scheduleHeader);

        const table = document.createElement('table');
        table.classList.add("grades-table");
        table.classList.add("schedule");
        const tbody = document.createElement('tbody');
        const thead = document.createElement("thead");
        const theadRow = document.createElement("tr");
        const theadTime = document.createElement("td");
        const theadClassroom = document.createElement("td");
        const theadDiscipline = document.createElement("td");
        const theadLecturer = document.createElement("td");
        const theadType = document.createElement("td");
        theadTime.innerText = "Time";
        theadClassroom.innerText = "Classroom";
        theadDiscipline.innerText = "Discipline";
        theadLecturer.innerText = "Lecturer";
        theadType.innerText = "Type";
        table.appendChild(thead);
        table.appendChild(tbody);
        thead.appendChild(theadRow);
        theadRow.appendChild(theadTime);
        theadRow.appendChild(theadClassroom);
        theadRow.appendChild(theadDiscipline);
        theadRow.appendChild(theadLecturer);
        theadRow.appendChild(theadType);
        container.appendChild(table);
        const counter = document.createElement('div')
        counter.classList.add("counter")
        let rowCount = 0;
        for(const [time, properties] of Object.entries(lessons)) {
            const tbodyRow = document.createElement("tr");
            const tbodyTime = document.createElement("td");
            const tbodyClassroom = document.createElement("td");
            const tbodyDiscipline = document.createElement("td");
            const tbodyLecturer = document.createElement("td");
            const tbodyType = document.createElement("td");
            tbodyRow.appendChild(tbodyTime);
            tbodyRow.appendChild(tbodyClassroom);
            tbodyRow.appendChild(tbodyDiscipline);
            tbodyRow.appendChild(tbodyLecturer);
            tbodyRow.appendChild(tbodyType);
            tbodyTime.innerHTML = time.replace("-", "\n");
            tbodyClassroom.innerHTML = properties[0]['classroom'];
            tbodyDiscipline.innerHTML = properties[0]['discipline'];
            tbodyLecturer.innerHTML = properties[0]['lecturer'];
            tbodyType.innerHTML = properties[0]['type'];
            tbody.appendChild(tbodyRow);
            rowCount++;
        }
        counter.innerText = rowCount;
        container.appendChild(counter)
    }
}

const schedules = document.querySelectorAll('.grades')

schedules.forEach(grade => {
    grade.addEventListener('click', () => {
        grade.classList.toggle('active');
    });
});

document.querySelector('.grades table').addEventListener('click', function(event) {
    event.stopPropagation();
});