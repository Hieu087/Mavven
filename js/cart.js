if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready(){
    var addToCartButtons = document.getElementsByClassName('add-btn');
    for (var i = 0; i < addToCartButtons.length; i++){
        addToCartButtons[i].addEventListener('click', addItemCart)
    }

    var removeCartItemButtons = document.getElementsByClassName('remove-btn');
    for (var i = 0; i < removeCartItemButtons.length; i++){
        removeCartItemButtons[i].addEventListener('click', removeCartItem)
    }

    var QuantityUp = document.getElementsByClassName('quantity-up');
    for (var i = 0; i < QuantityUp.length; i++){
        QuantityUp[i].addEventListener('click', increaseQuantity)
    }

    var QuantityDown = document.getElementsByClassName('quantity-down');
    for (var i = 0; i < QuantityDown.length; i++){
        QuantityDown[i].addEventListener('click', decreaseQuantity)
    }

    var purchaseButton = document.getElementsByClassName('purchase-btn')[0].addEventListener('click', purchased);
 
    updateTotalPrice()
}


//--------------------ADD BUTTON----------------------
function addItemCart(event){
    var button = event.target
    var face2 = button.parentElement
    var name = face2.getElementsByTagName('p')[0].innerText
    var price = face2.getElementsByTagName('span')[0].innerText.replace('$', '')

    var face = face2.parentElement
    var face1 = face.getElementsByClassName('face1')[0]
    var image = face1.getElementsByTagName('img')[0].src

    moveItemToCart(name, price, image)

    updateTotalPrice()

    updateItemsAmount()
}

function moveItemToCart(name, price, image){
    var item = document.createElement('div')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var itemsNames = cartItems.getElementsByClassName('item-name')
    for(var i = 0; i < itemsNames.length; i++){
        if(itemsNames[i].innerText == name){
            alert('This item already added to your cart')
            return
        }
    }

    var itemContents = `
    <div class="item"> 
        <img src="${image}" alt="">
        <div class="item-center">
            <h3 class="item-name">${name}</h3>
            <h4 class="item-price">${'$' + price}</h4>
            <button class="remove-btn">Remove</button>
        </div>
        <div class="item-quantity">
            <a class="quantity-up"><i class="fas fa-chevron-up"></i></a>
            <p class="quantity">1</p>
            <a class="quantity-down"><i class="fas fa-chevron-down"></i></a>
        </div>
    </div>`
    item.innerHTML = itemContents
    cartItems.append(item)

    item.getElementsByClassName('remove-btn')[0].addEventListener('click', removeCartItem)
    item.getElementsByClassName('quantity-up')[0].addEventListener('click', increaseQuantity)
    item.getElementsByClassName('quantity-down')[0].addEventListener('click', decreaseQuantity)

}

//--------------------REMOVE BUTTON----------------------
function removeCartItem(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateTotalPrice()
    updateItemsAmount()
}

//-------------------QUANTITY CHANGED---------------------
function increaseQuantity(event){
    increase = event.target
    var itemQuantity = increase.parentElement.parentElement
    var quantity = itemQuantity.getElementsByClassName('quantity')[0]
    var itemAmount = parseInt(quantity.innerText)
    itemAmount++
    quantity.innerText = itemAmount
    updateTotalPrice()
    updateItemsAmount()
}

function decreaseQuantity(event){
    increase = event.target
    var itemQuantity = increase.parentElement.parentElement
    var quantity = itemQuantity.getElementsByClassName('quantity')[0]
    var itemAmount = parseInt(quantity.innerText)
    if(itemAmount <= 1){
        quantity.innerText = itemAmount
    }
    else{
        itemAmount--
        quantity.innerText = itemAmount
    }
    updateTotalPrice()
    updateItemsAmount()
}

//--------------------PURCHASE BUTTON----------------------
function purchased(event){
    var cartItems = document.getElementsByClassName('cart-items')[0]
    if(cartItems.hasChildNodes()){
        alert('Thank you for shopping')
        while(cartItems.hasChildNodes()){
            cartItems.removeChild(cartItems.firstChild)
        }
        updateTotalPrice()
    }
    else{
        alert('Your cart is empty')
    }

    updateItemsAmount()
}

//------------------UPDATE TOTAL PRICE--------------------
function updateTotalPrice(){
    var cartItems = document.getElementsByClassName('cart-items')[0];
    var Items = cartItems.getElementsByClassName('item');
    var total = 0

    for (var i = 0; i < Items.length; i++){
        var Item = Items[i];
        var itemCenter = Item.getElementsByClassName('item-center')[0];
        var priceElement = itemCenter.getElementsByClassName('item-price')[0];


        var itemQuantity = Item.getElementsByClassName('item-quantity')[0];
        var quantityElement = itemQuantity.getElementsByClassName('quantity')[0];
            
        var price = parseFloat(priceElement.innerText.replace('$', ''));
        var itemAmount = parseInt(quantityElement.innerText);

        total = total + (price * itemAmount)
    }

    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('cart-total')[0].innerText = total
}

//------------------UPDATE CART ITEMS AMOUNT--------------------
function updateItemsAmount(){
    var cartItems = document.getElementsByClassName('cart-items')[0];
    var Items = cartItems.getElementsByClassName('item');
    var totalItems = 0;
    
    for (var i = 0; i < Items.length; i++){
        var Item = Items[i];

        var itemQuantity = Item.getElementsByClassName('item-quantity')[0];
        var quantityElement = itemQuantity.getElementsByClassName('quantity')[0];         
        var itemAmount = parseInt(quantityElement.innerText);

        totalItems += itemAmount
    }
    document.getElementsByClassName('cart-num')[0].innerText = totalItems;  
}

