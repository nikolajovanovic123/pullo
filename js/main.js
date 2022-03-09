window.onload = function(){

    const links=[
        {
            "id" : 1,
            "name" : "Home",
            "link" : "index.html"
        },
        {
            "id" : 2,
            "name" : "Collection",
            "link" : "Collection.html"
        },
        {
            "id" : 3,
            "name" : "Author",
            "link" : "#"
        },
        {
            "id" : 4,
            "name" : "Contact",
            "link" : "contact.html"
        }

    ];
    const menuDiv = document.getElementById('nav');
    let html="";
    for(const stavka of links)
    {
        html+=`<a class="nav-item nav-link" href="${stavka.link}">${stavka.name}</a>`;
    }
    menuDiv.innerHTML=html;

    // -----------------------------------------------------------------------------------------------------------------

    const slides=[
        {
            "id" : 1,
            "name" : "Running Shoes",
            "description" : "train with the best running boots",
            "img" : {
                "src" : "running-shoes.png",
                "alt" : "running shoes"
            }
        },
        {
            "id" : 2,
            "name" : "Football Shoes",
            "description" : "train with the best football boots",
            "img" : {
                "src" : "footballboots1.png",
                "alt" : "football shoes"
            }
        },
        {
            "id" : 3,
            "name" : "Basketball Shoes",
            "description" : "train with the best basketball boots",
            "img" : {
                "src" : "basketboots2.png",
                "alt" : "basketball shoes"
            }
        },
        {
            "id" : 4,
            "name" : "Tennis Shoes",
            "description" : "train with the best tennis boots",
            "img" : {
                "src" : "tennisboots1.png",
                "alt" : "tennis shoes"
            }
        }
    ];
    const divCarousel = document.getElementById("carinner");
    let html2="";
    for(const stavka2 of slides)
    {
        html2+=`<div class="carousel-item ${stavka2.id == 1 ? 'active' : ''}">
        <div class="row">
        <div class="col-sm-2 padding_0">
            <p class="mens_taital">${stavka2.name}</p>
            <div class="page_no">${stavka2.id}/4</div>
            <p class="mens_taital_2">${stavka2.name}</p>
        </div>
        <div class="col-sm-5">
            <div class="banner_taital">
                <h1 class="banner_text">New ${stavka2.name} </h1>
                <p class="lorem_text">${stavka2.description}</p>
                <button class="buy_bt"><a href="collection.html">Buy Now</a></button>
                <button class="more_bt">See More</button>
            </div>
        </div>
        <div class="col-sm-5">
            <div class="shoes_img"><img src="images/${stavka2.img.src}" alt="${stavka2.img.alt}"></div>
        </div>
    </div>
    </div>`;
    }
    divCarousel.innerHTML=html2;

    //----------------------------------------------------------------------------------------------------------------------------------------------------



    const product =[
        
        {

            "id" : 1,
            "name" : "NIKE AIR MAX VG-R M",
            "stars" :4,
            "price" : 60,
            "img":
            {
                "src" : "boots1.jpg"
            }

        },
        {

            "id" : 2,
            "name" : "997 M",
            "stars" :5,
            "price" : 100,
            "img":
            {
                "src" : "boots2.jpg"
            }
        },
        {

            "id" : 3,
            "name" : "AIR STRATUS MAGLEV M",
            "stars" :5,
            "price" : 50,
            "img":
            {
                "src" : "boots3.jpg"
            }

        }

    ];
    const product2 =[
        
        {

            "id" : 1,
            "name" : "NIKE AIR MAX VG-R M",
            "stars" :4,
            "price" : 60,
            "img":
            {
                "src" : "boots4.jpg"
            }

        },
        {

            "id" : 5,
            "name" : "UNO 2 M",
            "stars" :5,
            "price" : 100,
            "img":
            {
                "src" : "boots51.jpg"
            }
        },
        {

            "id" : 6,
            "name" : "NIKE AIR MAX ALPHA TRAINER 4 M",
            "stars" :5,
            "price" : 50,
            "img":
            {
                "src" : "boots6.jpg"
            }

        }

    ];
    const productsDiv2=document.getElementById("products2Div");
    let html4="";

    const productsdiv1 = document.getElementById("products1Div");
    let html3="";
    for(const stavka3 of product)
    {
        html3+=`<div class="col-sm-4">
        <div class="best_shoes">
            <p class="best_text">${stavka3.name}</p>
            <div class="shoes_icon"><img src="images/${stavka3.img.src}"></div>
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
                    <div class="shoes_price">$ <span style="color: #ff4e5b;">${stavka3.price}</span></div>
                </div>
            </div>
        </div>
    </div>`;
    }
    productsdiv1.innerHTML=html3;
    /*html3+=`<div class="buy_now_bt">
    <button class="buy_text">Buy Now</button>
</div>`;*/
for(const stavka4 of product2)
    {
        html4+=`<div class="col-sm-4"><div class="best_shoes">
            <p class="best_text">${stavka4.name}</p>
            <div class="shoes_icon"><img src="images/${stavka4.img.src}"></div>
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
                    <div class="shoes_price">$ <span style="color: #ff4e5b;">${stavka4.price}</span></div>
                </div>
            </div>
        </div>
    </div>`;
    }
    productsDiv2.innerHTML=html4;

}
