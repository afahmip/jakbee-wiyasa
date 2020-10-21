function exportObjects(objects, filename) {
  const data = []
  const headers = []
  const headersMap = {}

  let i = 0
  Object.keys(objects[0]).forEach(key => {
    headersMap[key] = i
    headers.push(key)

    i++
  })

  data.push(headers.join(";"))
  objects.forEach(object => {
    const content = Array.apply(null, Array(Object.keys(headersMap).length))
    Object.keys(object).forEach(key => {
      if (key === "points") {
        content[headersMap[key]] = JSON.stringify(object[key])
      } else {
        content[headersMap[key]] = object[key]
      }
    })
    data.push(content.join(";"))
  })

  exportToCSV(data.join("\n"), filename)
}

function exportPoints(points, filename) {
  const data = [
    "value",
    ...points.map((row) => '"' + JSON.stringify(row) + '"')
  ].join("\n")

  exportToCSV(data, filename)
}

function exportToCSV(data, filename) {
  let element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data));
  element.setAttribute('download', filename);
  element.style.display = 'none';

  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

export {
  exportObjects,
  exportPoints
}
