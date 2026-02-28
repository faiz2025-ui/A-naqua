// ======== المنتجات الافتراضية ========
let products = [
  {name:"ساعة ذهبية", price:15000, image:"img/logo.webp"},
  {name:"ساعة فضية", price:12000, image:"img/OIP (1).webp"},
  {name:"ساعة كلاسيك", price:10000, image:"img/OIP.webp"}
];

// ======== قائمة الولايات مع سعر التوصيل ========
let wilayas = [
  { name:"أدرار", price:1200 }, { name:"الشلف", price:600 }, { name:"الأغواط", price:800 },
  { name:"أم البواقي", price:700 }, { name:"باتنة", price:700 }, { name:"بجاية", price:600 },
  { name:"بسكرة", price:800 }, { name:"بشار", price:1200 }, { name:"البليدة", price:400 },
  { name:"البويرة", price:600 }, { name:"تمنراست", price:1500 }, { name:"تبسة", price:800 },
  { name:"تلمسان", price:600 }, { name:"تيارت", price:700 }, { name:"تيزي وزو", price:500 },
  { name:"الجزائر", price:400 }, { name:"الجلفة", price:800 }, { name:"جيجل", price:700 },
  { name:"سطيف", price:600 }, { name:"سعيدة", price:700 }, { name:"سكيكدة", price:700 },
  { name:"سيدي بلعباس", price:600 }, { name:"عنابة", price:700 }, { name:"قالمة", price:700 },
  { name:"قسنطينة", price:600 }, { name:"المدية", price:600 }, { name:"مستغانم", price:600 },
  { name:"المسيلة", price:700 }, { name:"معسكر", price:600 }, { name:"ورقلة", price:1000 },
  { name:"وهران", price:500 }, { name:"البيض", price:900 }, { name:"إليزي", price:1500 },
  { name:"برج بوعريريج", price:600 }, { name:"بومرداس", price:500 }, { name:"الطارف", price:700 },
  { name:"تندوف", price:1500 }, { name:"تيسمسيلت", price:700 }, { name:"الوادي", price:900 },
  { name:"خنشلة", price:800 }, { name:"سوق أهراس", price:700 }, { name:"تيبازة", price:500 },
  { name:"ميلة", price:700 }, { name:"عين الدفلى", price:600 }, { name:"النعامة", price:900 },
  { name:"عين تموشنت", price:600 }, { name:"غرداية", price:900 }, { name:"غليزان", price:600 },
  { name:"تيميمون", price:1200 }, { name:"برج باجي مختار", price:1500 }, { name:"أولاد جلال", price:900 },
  { name:"بني عباس", price:1200 }, { name:"عين صالح", price:1500 }, { name:"عين قزام", price:1500 },
  { name:"تقرت", price:1000 }, { name:"جانت", price:1500 }, { name:"المغير", price:900 },
  { name:"المنيعة", price:1000 }
];

// ======== متغيرات السلة ========
let cart = [];
let total = 0;

// ======== تحميل الولايات في select ========
function loadWilayas(){
  let select = document.getElementById("wilaya");
  if(!select) return;

  wilayas.forEach(w=>{
    let option = document.createElement("option");
    option.value = w.price;
    option.text = w.name + " ("+ w.price +" دج)";
    select.appendChild(option);
  });
}

// ======== عرض المنتجات ========
function displayProducts(){
  let container = document.getElementById("products");
  if(!container) return;

  container.innerHTML="";
  products.forEach((p,index)=>{
    container.innerHTML+=`
      <div class="product">
        <img src="${p.image}" width="150">
        <h3>${p.name}</h3>
        <p>${p.price} دج</p>
        <input type="number" id="qty${index}" value="1" min="1" style="width:60px">
        <button onclick="addToCart(${index})">أضف للسلة</button>
      </div>`;
  });
}

// ======== إضافة منتج للسلة ========
function addToCart(index){
  let qty = parseInt(document.getElementById("qty"+index).value);
  let product = products[index];

  cart.push({
    name: product.name,
    price: product.price,
    qty: qty
  });

  total += product.price * qty;
  document.getElementById("total").innerText = total;
  updateDelivery();
}

// ======== حساب سعر التوصيل ========
function updateDelivery(){
  let delivery = parseInt(document.getElementById("wilaya").value || 0);
  document.getElementById("deliveryPrice").innerText = delivery;
  document.getElementById("finalTotal").innerText = total + delivery;
}

// ======== تأكيد الطلب وحفظه ========
function submitOrder(){
  let name = document.getElementById("customerName").value;
  let phoneClient = document.getElementById("customerPhone").value;
  let wilaya = document.getElementById("wilaya").options[
    document.getElementById("wilaya").selectedIndex
  ].text;
  let final = document.getElementById("finalTotal").innerText;

  if(cart.length === 0){
    alert("السلة فارغة");
    return;
  }
  if(name === "" || phoneClient === ""){
    alert("املأ جميع البيانات");
    return;
  }

  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  let orderId = Date.now();

  let newOrder = {
    id: orderId,
    name: name,
    phone: phoneClient,
    wilaya: wilaya,
    items: cart,
    total: final,
    status: "جديد",
    date: new Date().toLocaleString()
  };

  orders.push(newOrder);
  localStorage.setItem("orders", JSON.stringify(orders));

  alert(`تم تسجيل طلبك بنجاح ✅ رقم الطلب: ${orderId}`);
  cart = [];
  total = 0;
  document.getElementById("total").innerText = 0;
  document.getElementById("finalTotal").innerText = 0;
}

// ======== تتبع الطلب ========
function displayOrders(){
  let container = document.getElementById("ordersContainer");
  if(!container) return;

  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  container.innerHTML = "";

  orders.forEach((o,index)=>{
    container.innerHTML+=`
      <div class="product">
        <h3>طلب رقم ${o.id}</h3>
        <p>الاسم: ${o.name}</p>
        <p>الهاتف: ${o.phone}</p>
        <p>الولاية: ${o.wilaya}</p>
        <p>المنتجات: ${o.items.map(i => i.name + " × " + i.qty).join("<br>")}</p>
        <p>السعر: ${o.total} دج</p>
        <p>الحالة: ${o.status}</p>

        <select onchange="changeStatus(${index}, this.value)">
          <option value="جديد">جديد</option>
          <option value="تم الاتصال">تم الاتصال</option>
          <option value="تم الشحن">تم الشحن</option>
        </select>

        <button onclick="deleteOrder(${index})">حذف</button>
      </div>`;
  });
}

// ======== تغيير حالة الطلب ========
function changeStatus(index,value){
  let orders = JSON.parse(localStorage.getItem("orders"));
  orders[index].status = value;
  localStorage.setItem("orders", JSON.stringify(orders));
  displayOrders();
}

// ======== حذف طلب ========
function deleteOrder(index){
  let orders = JSON.parse(localStorage.getItem("orders"));
  orders.splice(index,1);
  localStorage.setItem("orders", JSON.stringify(orders));
  displayOrders();
}

// ======== إضافة منتج جديد (في لوحة الإدارة) ========
function addProduct(){
  let name = document.getElementById("name").value;
  let price = parseInt(document.getElementById("price").value);
  let imageInput = document.getElementById("image");

  if(name === "" || isNaN(price) || imageInput.files.length === 0){
    alert("املأ جميع البيانات");
    return;
  }

  let reader = new FileReader();
  reader.onload = function(e){
    products.push({name:name, price:price, image:e.target.result});
    localStorage.setItem("products", JSON.stringify(products));
    displayProducts();
    displayOrders();
  }
  reader.readAsDataURL(imageInput.files[0]);
}

// ======== تحميل المنتجات والولايات عند فتح الصفحة ========
function init(){
  let savedProducts = JSON.parse(localStorage.getItem("products"));
  if(savedProducts) products = savedProducts;

  displayProducts();
  loadWilayas();
  displayOrders();
}

// ======== تشغيل ========
init();



