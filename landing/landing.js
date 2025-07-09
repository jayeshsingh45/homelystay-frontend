var itemCount = 0;

let list = [];

async function fetchAllListingData() {
    const apiUrl = "https://homelystack-backend.vercel.app/showAllListing";

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            // headers: {
            //     "Content-Type": "application/json",
            // },
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const responseData = await response.json();
        console.log(responseData);
        list = responseData

        setTimeout(
        addCode()

            ,2000)
        
    } catch (error) {
        console.error("Error:", error);
    }
}

function addCode(){
    let listLen = list.length
    while(listLen > 0){
        for(i=1;i<=3;i++){
            if(listLen > 0){
                addElement(i,list[listLen-1].location,list[listLen-1].price,
                    list[listLen-1].image,list[listLen-1].description,list[listLen-1]._id)
                listLen--;
            }
        }
    }
}
    
function addElement(column,location,price,image,desc,_id){
    var getElement = document.getElementById('multipleBox'+column)

    getElement.innerHTML += 
    `
        <div class="shadow-lg p-3 card mb-3 text-start rounded-4">

            <img src="${image}" class="rounded-4 card-img-top" alt="...">

            <div class="card-body clearfix">
            <h2 class="card-title">${price}/day</h2>
            <h5 class="card-text">${location}</h5>
            
            <p class="card-text">${desc}</p>
            
                 <a class="p-2 ms-atuo btn btn-success float-end" onClick=bookNow("${_id}")>Book Now</a>
            </div>
        </div>
    `
}

function bookNow(id){
    console.log(id)

    // Simulate a mouse click:
    window.location.href = `../book/book.html?rentalId=${id}`;
}


function runFunctionOnWebpageLoad(){
    fetchAllListingData()
}