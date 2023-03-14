const submit = document.getElementById("submit");
const update = document.getElementById("update");
const items = document.getElementById("item");
const qua = document.getElementById("qua");
const price = document.getElementById("price");
const clear = document.getElementById("clear");
submit.addEventListener("click", () => {
  if (items.value == "" || price.value == "") {
    alert("please provide correct details");
    return;
  }
  if (qua.value == "") {
    qua.value = "--";
  }
  let item = localStorage.getItem("item");
  if (item == null) {
    itemObj = [];
  } else {
    itemObj = JSON.parse(item);
  }
  itemObj.push({
    name: items.value,
    qty: qua.value,
    cost: price.value,
  });
  localStorage.setItem("item", JSON.stringify(itemObj));
  items.value = "";
  qua.value = "";
  price.value = "";
  showItem();
});

function showItem() {
  let item = localStorage.getItem("item");
  if (item == null) {
    itemObj = [];
  } else {
    itemObj = JSON.parse(item);
  }
  let html = "",
    value = 0;
  itemObj.forEach((element, index) => {
    value += parseFloat(itemObj[index].cost);
    html += `<div class="myitem">
    <div class="container-sm">
        <span class="w-3">${index + 1}</span>
        <span class="w-3" id="name">${element.name}</span>
        <span class="w-3" id="name">${element.qty}</span>
        <span class="w-3">${element.cost}</span>
        <span id="svg" class=" w-3">   
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-archive" viewBox="0 0 16 16" onclick="Delete(${index})" id="delete">
            <path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1V2zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5H2zm13-3H1v2h14V2zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16" onclick="Edit(${index})" id="edit">
            <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
        </svg>
        </span>
    </div>
    <hr>
    </div>`;
  });
  if (itemObj.length != 0) {
    document.getElementById("element").innerHTML = html;
    document.getElementById(
      "total_cost"
    ).innerHTML = `<strong>${value}</strong>`;
  } else {
    document.getElementById(
      "element"
    ).innerHTML = `<div class="alert alert-warning center" role="alert">
    Nothing to show, please add one item
  </div>`;
  document.getElementById(
    "total_cost"
  ).innerHTML = `<strong>${value}</strong>`;
  }
}

document.onload = showItem();

function Delete(index) {
  let item = localStorage.getItem("item");
  if (item == null) {
    itemObj = [];
  } else {
    itemObj = JSON.parse(item);
  }
  itemObj.splice(index, 1);
  localStorage.setItem("item", JSON.stringify(itemObj));
  showItem();
}
function Edit(index) {
  submit.style.display = "none";
  update.style.display = "block";
  let item = localStorage.getItem("item");
  if (item == null) {
    itemObj = [];
  } else {
    itemObj = JSON.parse(item);
  }
  items.value = itemObj[index].name;
  qua.value = itemObj[index].qty;
  price.value = itemObj[index].cost;

  update.addEventListener("click", () => {
    if (items.value == "" || price.value == "") {
      alert("please provide correct details");
      return;
    }
    if (qua.value == "") {
        qua.value = "--";
      }
    itemObj[index].name = items.value;
    itemObj[index].qty = qua.value;
    itemObj[index].cost = price.value;
    localStorage.setItem("item", JSON.stringify(itemObj));
    submit.style.display = "block";
    update.style.display = "none";
    items.value = "";
    qua.value="";
    price.value = "";
    showItem();
  });
}

clear.addEventListener("click", () => {
  let money = parseFloat(document.getElementById("total_cost").innerText);
  let item = localStorage.getItem("item");
  if (item == null) {
    itemObj = [];
  } else {
    itemObj = JSON.parse(item);
  }
  itemObj.forEach((element) => {
    money -= parseFloat(element.cost);
  });
  document.getElementById("total_cost").innerHTML = `<strong>${money}</strong>`;
  localStorage.clear();
  showItem();
});

const search = document.getElementById("search");
search.addEventListener("input", () => {
  let text = search.value;
  Array.from(document.getElementsByClassName("myitem")).forEach((element) => {
    let arr = Array.from(element.getElementsByTagName("span"));
    if (arr[1].innerText.toLowerCase().includes(text.toLowerCase())) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});

