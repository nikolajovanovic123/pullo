
window.onload=function()
{

    let kategorije = [];

    dohvatiPodatke("producers", showProducersList);
    $("#range").change(filterChange);
    $("#pricediscount").change(filterChange);
    $("#sort").change(filterChange);
    $("#tbPronadji").keyup(filterChange);
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
        $(".producer").change(filterByProducer);
    }




    function showProducts(products){
        
        products = pretraziProizvode(products);
        products = sort(products);
        products = filterDiscount(products);
        products= filterByProducer(products);
        products=filterPrice(products);
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
                
            </div>
        </div>`;
        }
        if(html.length != 0){productDiv.innerHTML=html;}
        else{productDiv.innerHTML="<h2>NOT SEARCHED PRODUCTS...</h2>"}
        
    }
    function filterPrice(products)
    {
        var vrednost = $("#range").val();
        //console.log(vrednost);
        return Object.values(products).filter(product => parseInt(product.price.currentPrice) <= vrednost);
        
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
    
        let producersIds = [];
        $.each($("input[name='producer']:checked"), function(){
            producersIds.push(parseInt($(this).val()));
        });
        if(producersIds.length != 0){
		return Object.values(products).filter(x => x.producersIds.include(y.producer));
        }

       
		return products;
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
    function showNumbers(numbers1)
    {
        let html3 = "";
        for(let numberId of numbers1)
        {
            for(let numberOb of this.numbers)
            {
                if(numbers1[numberId] == numberOb.id)
                {
                    
                        html3+=`<span class="numbers">${numberOb.number}</span>`;
                    
                }
            }
        }
        return html3;
    }





    var rangeSlider = function(){
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
      
      rangeSlider();
}

