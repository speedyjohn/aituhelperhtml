const params = new URLSearchParams(window.location.search);
const base64CompressedData = decodeURIComponent(params.get("data"));
console.log(params.get("data"))
const compressedData = Uint8Array.from(atob(base64CompressedData), c => c.charCodeAt(0));
const decompressedData = pako.inflate(compressedData, { to: 'string' });
const jsonData = JSON.parse(decompressedData);

// Completing name
const fname = params.get("user").split("_")[0]
const lname = params.get("user").split("_")[1]
document.getElementById('title').innerText = `Deadlines for ${fname} ${lname}`

// Completing deadlines
const gradesContainer = document.getElementById("courses");
for (const [courseName, grades] of Object.entries(jsonData)) {
    if(Object.keys(grades).length > 0) {
        const courseContainer = document.createElement('div')
        courseContainer.classList.add('grades')
        const courseHeader = document.createElement('h1');
        courseHeader.classList.add('grades-title')
        courseHeader.textContent = courseName;
        gradesContainer.appendChild(courseContainer)
        courseContainer.appendChild(courseHeader);

        const table = document.createElement('table')
        table.classList.add("grades-table")
        const tbody = document.createElement('tbody')
        const thead = document.createElement("thead")
        const theadRow = document.createElement("tr")
        const theadAssignment = document.createElement("td")
        const theadGrade = document.createElement("td")
        theadAssignment.innerText = "Assignment Title"
        theadGrade.innerText = "Grade"
        table.appendChild(thead)
        table.appendChild(tbody)
        thead.appendChild(theadRow)
        theadRow.appendChild(theadAssignment)
        theadRow.appendChild(theadGrade)
        courseContainer.appendChild(table);


        for (const [assignmentName, gradeWithTags] of Object.entries(grades)) {
            const tbodyRow = document.createElement("tr")
            const tbodyAssignment = document.createElement("td")
            const tbodyGrade = document.createElement("td")
            tbodyRow.appendChild(tbodyAssignment)
            tbodyRow.appendChild(tbodyGrade)

            const tempAssignment = document.createElement("div");
            tempAssignment.innerHTML = assignmentName;
            const assignmentWithoutTags = (tempAssignment.textContent || tempAssignment.innerText || "");


            const tempGrade = document.createElement("div");
            tempGrade.innerHTML = gradeWithTags;
            const gradeWithoutTags = tempGrade.textContent || tempGrade.innerText || "";

            tbodyAssignment.innerText = assignmentWithoutTags
            tbodyGrade.innerText = gradeWithoutTags

            tbody.appendChild(tbodyRow);

            if(assignmentWithoutTags.includes("Attendance")) {
                const additionalTrow = document.createElement('tr')
                tbody.appendChild(additionalTrow)
            }
        }
    }
}