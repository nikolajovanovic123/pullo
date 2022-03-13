
window.onload=function()
{
    
    let url = window.location.pathname;
    let kategorije = [];
    
    dohvatiPodatke("producers", showProducersList);
    $("#range").change(filterChange);
    $("#pricediscount").change(filterChange);
    $("#sort").change(filterChange);
    $("#tbPronadji").keyup(filterChange);
    $('.button1').click(proveri);
    rangeSlider();
    
    
    //$(".add-to-cart").addEventListener("click", addToCart);
    //$('.add-to-cart').click(addToCart);
    //$('.add-to-cart').on("click", addToCart())
    
    
    
    function filterChange(){
		dohvatiPodatke("products",showProducts);
	}
    function dohvatiPodatke(file, callback){
		$.ajax({
			url: "assets/" + file + ".json",
			method: "get",
			dataType: "json",
			success: function(response){
				callback(response);
			},
			error: function(err){
				console.log(err);
			}
		});
	}

    function showProducersList(producers){
        let html = "";
        for(let producer of producers){
            html +=`
            <li class="list-group-item">
              <input type="checkbox" id="${producer.id}" name="producer" class="producer" value="${producer.id}"/> ${producer.name}
            </li>
            `;
        }
        document.getElementById('producers').innerHTML = html;
        kategorije=producers;
        dohvatiPodatke("products", showProducts);
        $(".producer").change(filterChange);
    }




    function showProducts(products){
        products= filterByProducer(products);
        products = pretraziProizvode(products);
        products = sort(products);
        products = filterDiscount(products);
        
        products=filterPrice(products)

        const productDiv = document.getElementById("products");
        let html="";
        for(let product of products)
        {
            html+=`<div class="col-lg-4 col-sm-4 divs">
            <div class="best_shoes">
                <div class="shoes_icon"><img src="images/${product.img.src} "></div>
                <p class="best_text">${product.name}</p>
                
                <h2><b>PRICE : ${product.price.currentPrice} $</b></h2>
                OLD PRICE: <s>  ${product.discount == true ? product.price.priceBeforeDiscount  : ""} </s>
                <div class="w-100 text-center">
                    <input type="button" data-id="${product.id}" value="Add to cart" class="button btn padding  margins add-to-cart" data-toggle="modal" data-target="#exampleModalCenter""/>
                </div>
            </div>
        </div>`;
        }

        
        if(html.length != 0){productDiv.innerHTML=html;}
        else{productDiv.innerHTML="<h2>NOT SEARCHED PRODUCTS...</h2>"}
        $('.add-to-cart').click(addToCart);
        
    }



    function filterPrice(products)
    {
        var vrednost = $("#range").val();
        //console.log(vrednost);
        return Object.values(products).filter(product => (parseInt(product.price.currentPrice)) <= vrednost);
        
    }
    
    /*showProducts(products);
    $("#pricediscount").change(filterDiscount);
    showProducersList(producers);*/
    //AVAILABLE NUMBERS ${showNumbers(product.numbers)}</p>
    







    function pretraziProizvode(products){
		let pretragaValue = $("#tbPronadji").val().toLowerCase();
		if(pretragaValue){
			return products.filter(function(el){
				return el.name.toLowerCase().indexOf(pretragaValue) !== -1;
			});
		}
        else {return products;}
		
	}


    function filterDiscount(products){
        if($("#pricediscount").is(':checked')){
            var filteredProducts = Object.values(products).filter(el => el.discount == true);
            if(filteredProducts.length!=0)
            {
                return filteredProducts;
            }
            else{
                return products;
            }
        }
        else{return products;}
       
    }
  






    function filterByProducer(products){
        console.log(products);
        let producerids = [];
        $('.producer:checked').each(function(el){
            producerids.push(parseInt($(this).val()));
        });
        if(producerids.length != 0){
            return products.filter(x => producerids.includes(x.producerid));    
        }
        return products;
       
        //else{return products;}
    }









    function sort(data){
		const sortType = document.getElementById('sort').value;
		if(sortType == 'asc'){
			return data.sort((a,b) => parseInt(a.price.currentPrice) > parseInt(b.price.currentPrice) ? 1 : -1);
		}
        else if(sortType =="desc"){return data.sort((a,b) => parseInt(a.price.currentPrice) < parseInt(b.price.currentPrice) ? 1 : -1);}
        else if(sortType== 'namedsc'){return data.sort((a,b) => a.name < b.name ? 1 : -1);}
        else if(sortType== 'nameasc'){return data.sort((a,b) => a.name > b.name ? 1 : -1);}
		
	}
    function showNumbers(nmb)
    {
        let html3 = "";
        
    }





    function rangeSlider(){
        var slider = $('.range-slider'),
            range = $('.range-slider__range'),
            value = $('.range-slider__value');
          
        slider.each(function(){
      
          value.each(function(){
            var value = $(this).prev().attr('value');
            $(this).html(value);
          });
      
          range.on('input', function(){
            $(this).next(value).html(this.value);
          });
        });
      };
      
      



//-------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------




function ajax(url, result){
    $.ajax({
        url: url,
        method: "get",
        dataType: "json",
        success: result,
        error: function(xhr){console.log(xhr);}
    });
}
function setItemToLocalStorage(name, data){
        localStorage.setItem(name, JSON.stringify(data));
    }
function getItemFromLocalStorage(name){
        return JSON.parse(localStorage.getItem(name));
    }


    if(url == "/" || url == "/pullo/shop.html"){
        
        // dohvatanje podataka iz fajla products.json
        ajax("assets/products.json", function(result){
            // console.log(result)
            setItemToLocalStorage("allProducts", result);
            
        });
    }
    else{if(url == "/pullo/cart.html"){
        let productsFromCart = getItemFromLocalStorage("cart");

        if(productsFromCart == null){
            showEmptyCart();
        }
        else{
            showCart();
        }
    }}

    
        function addToCart(){

        var idProduct = $(this).data("id");
        console.log(idProduct);

        let productsFromCart = getItemFromLocalStorage("cart");
        console.log(productsFromCart);
        
        if(productsFromCart){
            // kod kada korpa nije prazna
    
            if(productIsAlreadyInCart()){
                // kod ako dodajemo proizvod koji vec postoji u korpi
                updateQty();
            }
            else{
                // kod ako dodajemo proizvod koji NIJE u korpi
                addNewProductToCart();
                //printCartLength()
            }
    
        }
        else{
            // kod kada je korpa prazna
            addFirstProductToCart();
            //printCartLength()
        }
function addFirstProductToCart(){
        let products = [];
        products[0] = {
            id: idProduct,
            qty: 1
        }

        setItemToLocalStorage("cart", products);
    }

    // funkcija koja proverava da li proizvod vec postoji u korpi
    function productIsAlreadyInCart(){
        return productsFromCart.filter(p => p.id == idProduct).length;
    }

    // funkcija koja azurira kolicinu postojeceg proizvoda iz korpe
    function updateQty(){
        let productsFromLS = getItemFromLocalStorage("cart");

        for(let product of productsFromLS){
            if(product.id == idProduct){
                product.qty++;
                break;
            }
        }

        setItemToLocalStorage("cart", productsFromLS);
    }

    // funkcija koja dodaje proizvod u punu korpu, a taj proizvod nije u njoj
    function addNewProductToCart(){
        let productsFromLS = getItemFromLocalStorage("cart");

        productsFromLS.push({
            id: idProduct,
            qty: 1
        });

        setItemToLocalStorage("cart", productsFromLS);
    }

    }



            // funkcija koja dodaje prvi proizvod u korpu
    
/*<div class="col-sm-4">
    				<div class="best_shoes">
    					<p class="best_text">Best Shoes </p>
    					<div class="shoes_icon"><img src="images/shoes-img4.png"></div>
    					<div class="star_text">
    						<div class="left_part">
    							<ul>
    	    						<li><a href="#"><img src="images/star-icon.png"></a></li>
    	    						<li><a href="#"><img src="images/star-icon.png"></a></li>
    	    						<li><a href="#"><img src="images/star-icon.png"></a></li>
    	    						<li><a href="#"><img src="images/star-icon.png"></a></li>
    	    						<li><a href="#"><img src="images/star-icon.png"></a></li>
    	    					</ul>
    						</div>
    						<div class="right_part">
    							<div class="shoes_price">$ <span style="color: #ff4e5b;">60</span></div>
    						</div>
    					</div>
    				</div>
    			</div>
                
                
                
                <div class="buy_now_bt">
    			<button class="buy_text">Buy Now</button>
    		</div>*/ 



            function showCart(){
                let allProducts = getItemFromLocalStorage("allProducts");
                let productsFromCart = getItemFromLocalStorage("cart");
            
                // console.log(productsFromCart)
            
                let productsForDisplay = allProducts.filter(product =>{
                    
                    for(let productLS of productsFromCart){
                        if(product.id == productLS.id){
                            product.qty = productLS.qty
                            return true;
                        }
                    }
                    return false;
                })
                // console.log(productsForDisplay)
                printDataFromCart(productsForDisplay);
            }
            // funkcija koja stampa tabelu sa proizvodima iz korpe
            function printDataFromCart(products){
                let html = ``;
                    
                    for(let p of products) {
                        html +=`<div class="col-lg-4 col-sm-4 divs">
                        <div class="best_shoes">
                            <div class="shoes_icon"><img src="images/${p.img.src} "></div>
                            <p class="best_text"><b> ${p.name} </b></p>
                            
                            <h2>PRICE FOR ONE : ${p.price.currentPrice} $</h2>
                            <h2>QUANTITY: <input type="button" data-id="${p.id}"  value="-" class="button btn  minus"/> ${p.qty} <input type="button" data-id="${p.id}"  value="+" class="button btn plus"/></h2>
                            <h2>TOTAL PRICE ${p.price.currentPrice * p.qty} $</h2>
                            <div class="w-100 text-center">
                                <input type="button" data-id="${p.id}"  value="Remove from cart" class="button btn text-white padding  margins remove"/>
                            </div>
                        </div>
                    </div>`;
                     }   
                        
                        
                        
                        /* generateTr(p);
                        $('.remove').click(removeFromCart);*/
                    
            
                    /*html +=`    </tbody>
                        </table>`;*/
            
                    $("#content").html(html);
                    $('.remove').click(removeFromCart);
                    $('.minus').click(removeOne);
                    $('.plus').click(addOne);
                    }
            
            //<button onclick='removeFromCart(${p.id})'><i class="fa-solid fa-trash-xmark"></i></button>
            // funkcija koja uklanja pojedinacni red, tj. objekat iz niza iz local storage-a / korpe
            function removeFromCart() {
                var idProduct = $(this).data("id");
                let products = getItemFromLocalStorage("cart");
                let filtered = products.filter(p => p.id != idProduct);
            
                setItemToLocalStorage("cart", filtered);
                let productsFromCart = getItemFromLocalStorage("cart");
                if(productsFromCart == null)
                {
                    showEmptyCart();
                }
                   else{showCart();} 
                
                
                
            }
            function addOne()
            {
                let decide = $(this).data("id");
               products = getItemFromLocalStorage("cart");
                for(let p of products){
                    if(p.id == decide){
                        p.qty++;
                        break;
                        }
                    }
                    setItemToLocalStorage("cart", products);
                    showCart();
            }

            function removeOne(){

                let decide = $(this).data("id");
                let newArray = [];
                articlesInCart = getItemFromLocalStorage("cart");
                for(let a of articlesInCart){
                    if(a.id == decide){
                        if(a.qty > 1){
                            a.qty--;
                        }
                        else{
                            continue
                        }
                    }
                    newArray.push(a);
                }
                articlesInCart = newArray;
                setItemToLocalStorage("cart", articlesInCart);
                showCart();
            }
    function showEmptyCart()
    {
        let html=`<h1 class="text-center"><b>Your cart is empty</b></h1>`;
        $('.content').css('background-image','url(images/empty-cart2.png)');
        $('.content').html(html);
    }





    function proveri()
    {
        var greska=document.getElementsByClassName("greska");
var p=document.getElementById("exampleFormControlSelect1");
reg = /^[A-ZČĆŽŠĐ][a-zčćžšđ]{1,18}\s[A-ZČĆŽŠĐ][a-zčćžšđ]{1,18}$/;
reg2 =  /^[a-zA-Z0-9]([a-z]|[0-9])+.?-?_?([a-z]|[0-9]).?([az]|[0-9])@[a-z]{3,}.([a-z]{2,4}.)?([a-z]{2,4})$/g;
reg3=/^[06]{1}[0-9]{8}$/;
var br=0;
if(polje1.value==null || polje1.value==="" || !polje1.value.match(reg))
{
    greska[0].innerHTML="<b>Enter first and last name! Primer John Doe</b>";
    br++;
}
else 
{
  greska[0].innerHTML="";
}
  if(polje2.value==null || polje2.value==="" || !polje2.value.match(reg2))
{
  greska[1].innerHTML="<b>Enter correct e-mail! Example: nikola@gmail.com</b>";
  br++;
}
else 
{
  greska[1].innerHTML="";
}

if(polje3.value==null ||polje3.value==="" || polje3.value.match(reg3))
{
  greska[2].innerHTML="<b>Enter correct phone number! Example 06325481197<b>";
  br++;
}
else{
  greska[2].innerHTML="";
}
if(p.value=="Choose")
{
  greska[3].innerHTML="<b>You have to answer the question!</b>";
  br++;
}
else
{
  greska[3].innerHTML="";
}

if(!($("#nisamrobot").is(':checked')))
{
    greska[4].innerHTML="<b>You must indicate that you are not a robot!</b>";
    br++;
}
else{greska[4].innerHTML="";}
console.log(br);
if(br == 0)
{
    let html="<p class='text-success'><b>You have successfully completed the product purchase!<b></p>";
    $(".poruka").html(html);
}

}

function ukupno()
{
    var qt=0;
    let products = getItemFromLocalStorage("cart");
    for(let p of products)
    {
        qt = qt+ parseFloat(p.qty) * parseFloat(p.price.currentPrice)*1000;
    }
    let html="Total price is : " + qt + "$";
    $(".ukupno").html(html);
}


}




