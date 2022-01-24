let currentTime = new Date();
const tbody = document.querySelector("tbody");
const latest = document.querySelector(".last-updated");
currentTime = currentTime.toLocaleDateString("en-us");
currentTime = currentTime.split("/");
currentTime = [currentTime[2], currentTime[0],currentTime[1]]
currentTime[2] = "" + parseInt(currentTime[2]) - 2;
if (currentTime[2].length === 1){
  currentTime[2] = "0" + currentTime[2];
}
if (currentTime[1].length === 1){
  currentTime[1] = "0" + currentTime[1];
}
currentTime = currentTime.join("-");
const winnipeg = fetch(`https://api.opencovid.ca/summary?ymd=true&loc=4601&after=${currentTime}`);
const southernHealth = fetch(`https://api.opencovid.ca/summary?ymd=true&loc=4605&after=${currentTime}`);
const prairieMountain = fetch(`https://api.opencovid.ca/summary?ymd=true&loc=4602&after=${currentTime}`);
const northern = fetch(`https://api.opencovid.ca/summary?ymd=true&loc=4604&after=${currentTime}`);
const interlakeEastern = fetch(`https://api.opencovid.ca/summary?ymd=true&loc=4603&after=${currentTime}`);

Promise.all([winnipeg,southernHealth,prairieMountain,northern,interlakeEastern]).then((responses) => {
  for (let response of responses) {
    response.json().
    then((data) => {
      let obj = data.summary;
      let latestObj = obj.pop();
      let latestObj2 = obj.pop();
       tbody.insertAdjacentHTML("beforeend", `
      <tr>
        <td>${latestObj.health_region}</td>
        <td>${latestObj.cases}</td>
        <td>${latestObj.deaths}</td>
        <td>${latestObj.cumulative_cases}</td>
        <td>${latestObj.cumulative_deaths}</td>
        <td>${latestObj.cases - latestObj2.cases}</td>
      </tr>
      `); 
      latest.innerHTML = "";
      latest.insertAdjacentHTML("afterbegin", `<strong>Last updated: </strong><em>${latestObj.date}</em>`)
  }) 
}
})