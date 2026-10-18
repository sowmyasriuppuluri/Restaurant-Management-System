const BASE_URL = "http://localhost:8080";
//Test backend connection
fetch(`${BASE_URL}/hello`)
.then(res => res.text())
.then(data => {
  console.log("Backend connected:", data);
  alert(data);
})
.catch(err => console.log("Backend is not connected:", err));
const items = [
  { name: "Chicken Biryani", cat: "biryani", price: 299, img:"./assets/b1.png" },
  { name: "Mutton Biryani", cat: "biryani", price: 399, img: "./assets/b2.jpg" },
  { name: "Prawn Biryani", cat: "biryani", price: 379, img: "./assets/b3.jpg" },
  { name: "Egg Biryani", cat: "biryani", price: 229, img: "./assets/b4.jpg" },
  { name: "Non-veg Mixed Biryani", cat: "biryani", price: 449, img: "./assets/b5.jpg" },
  { name: "Paneer Biryani", cat: "biryani", price: 279, img: "./assets/b6.jpg" },
  { name: "Mushroom Biryani", cat: "biryani", price: 259, img: "./assets/b7.jpg" },
  { name: "paneer tikka", cat: "starters", price: 249, img: "./assets/b8.jpg" },
  { name: "veg manchuria", cat: "starters", price: 199, img: "./assets/b9.jpg" },
  { name: "veg momos", cat: "starters", price: 150, img: "./assets/b10.jpg" },
  { name: "crispy chicken lollipop", cat: "starters", price: 279, img: "./assets/b11.jpg" },
  { name: "chilli chicken", cat: "starters", price: 299, img: "./assets/b12.jpg" },
  { name: "Mutton Chops Fry", cat: "starters", price: 399, img: "./assets/b13.jpg" },
  { name: "Apollo Fish Fry", cat: "starters", price: 349, img: "./assets/b14.jpg" },
  { name: "chilli prawns", cat: "starters", price: 349, img: "./assets/b15.jpg" },
  { name: "Gulab Jamun", cat: "desserts", price: 99, img: "./assets/b16.jpg" },
  { name: "Butterscotch Sundae", cat: "Ice Cream", price: 149, img: "./assets/b17.jpg" },
  { name: "Vanilla Scoop with Brownie", cat: "Ice Cream", price: 179, img: "./assets/b18.jpg" },
  { name: "Blueberry Blast", cat: "mocktails", price: 149, img: "./assets/b19.png" },
  { name: "Fruit Punch", cat: "mocktails", price: 129, img: "./assets/b20.jpg" },
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let qty = {};

function syncQty() {
  items.forEach(item => {
    let found = cart.find(c => c.name === item.name);
    qty[item.name] = found ? found.qty : 1;
  });
}

function filterItems(category) {
  syncQty();
  const menu = document.getElementById("menu");
  menu.innerHTML = "";

  // Update Active Filter UI
  document.querySelectorAll('.filters button').forEach(btn => {
      btn.classList.remove('active');
      if(btn.innerText.toLowerCase() === category) btn.classList.add('active');
  });

  const filtered = category === "all" ? items : items.filter(i => i.cat === category);

  filtered.forEach(item => {
    menu.innerHTML += `
      <div class="menu-card">
        <img src="${item.img}" onerror="this.src='https://placehold.co/300x200?text=Food+Item'">
        <h3>${item.name}</h3>
        <p>₹${item.price}</p>
        <div class="qty">
          <button onclick="dec('${item.name}')"><i class="fas fa-minus"></i></button>
          <span id="q${item.name}">${qty[item.name]}</span>
          <button onclick="inc('${item.name}')"><i class="fas fa-plus"></i></button>
        </div>
        <button class="btn" onclick="add('${item.name}')">Add to Cart</button>
      </div>
    `;
  });
}

function inc(name) {
  qty[name]++;
  document.getElementById("q" + name).innerText = qty[name];
}

function dec(name) {
  if (qty[name] > 1) {
    qty[name]--;
    document.getElementById("q" + name).innerText = qty[name];
  }
}

function add(name) {
  let item = items.find(i => i.name === name);
  let found = cart.find(c => c.name === name);

  if (found) found.qty = qty[name];
  else cart.push({ ...item, qty: qty[name] });

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCount();
  showToast(`${name} added to cart!`);
}

function showToast(message) {
    const t = document.getElementById("toast");
    t.innerText = message;
    t.className = "show";
    setTimeout(() => { t.className = t.className.replace("show", ""); }, 3000);
}

function updateCount() {
  document.getElementById("count").innerText = cart.reduce((sum, i) => sum + i.qty, 0);
}

function goToCart() { window.location.href = "cart.html"; }
function scrollMenu() { document.getElementById("menuSection").scrollIntoView({ behavior: "smooth" }); }

filterItems("all");
updateCount();