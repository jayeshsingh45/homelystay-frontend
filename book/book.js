const queryParams = new URLSearchParams(window.location.search);

//get the value of "name"
const rentalId = queryParams.get('rentalId');
// console.log(id)

function getCookie(cookieName) {
    let cookies = document.cookie;
    let cookieArray = cookies.split("; ");

    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i];
        let [name, value] = cookie.split("=");

        if (name === cookieName) {
            return decodeURIComponent(value);
        }
    }

    return null;
}

let username = getCookie("id");
let isLogin = getCookie("isLogin")


if(isLogin == true){

}

//get data from server about this listing
async function getData(){
    const apiUrl = "https://homelystack-backend.vercel.app/infoAboutListing";

    const  queryParamData = {
        "_id":`${rentalId}`
    };


    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(queryParamData),

        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const responseData = await response.json();
        console.log(responseData)
        setDataToHTML(
            responseData.image,
            responseData.price,
            responseData.location,
            responseData.description
        )
    } catch (error) {
        console.error("Error==========:", error);
    }
}


function setDataToHTML(imgURL,price,location,description){
    document.getElementById("image").src = imgURL
    document.getElementById("price").innerText = price + "/day"
    document.getElementById("location").innerText = location
    document.getElementById("description").innerHTML = description
}



function runOnLoad(){
    getData()
}


let fromYearOutside
let fromMonthOutside
let fromDayOutside

let toYearOutside
let toMonthOutside
let toDayOutside
function getSelectedDate() {
    const selectedFromDateElement = document.getElementById("selectedFromDate");
    const selectedFromDate = selectedFromDateElement.value;

    const selectedToDateElement = document.getElementById("selectedToDate");
    const selectedToDate = selectedToDateElement.value;

    // Check if a date is selected
    if (selectedToDate) {
        console.log(selectedToDate)
        const fromText = selectedFromDate;
        const toText = selectedToDate;

        // Regular expression to match year, month, and day
        const pattern = /(\d{4})-(\d{2})-(\d{2})/;

        // Extract matches using destructuring
        const [fromFullMatch, fromYear, fromMonth, fromDay] = pattern.exec(fromText) || [];
        const [toFullMatch, toYear, toMonth, toDay] = pattern.exec(toText) || [];

        if (toFullMatch) {
            fromDayOutside = fromDay;
            fromMonthOutside = fromMonth
            fromYearOutside = fromYear

            toDayOutside = toDay;
            toMonthOutside = toMonth
            toYearOutside = toYear

            
            
        } else {
            console.log("Invalid date format.");
        }
      // Further processing of the date can be done here 
      //  (e.g., convert to different format, send to server)
    } else {
      document.getElementById("result").textContent = "Please select a date.";
    }
  }

  //get data from server about this listing
async function postData(){
    const apiUrl = "https://homelystack-backend.vercel.app/bookListing";

    const  jsonData = {
        "userId": username,
        "rentalListing": rentalId,
        "fromDate": fromDayOutside,
        "fromMonth": fromMonthOutside,
        "fromYear": fromYearOutside,
        "toDate": toDayOutside,
        "toMonth": toMonthOutside,
        "toYear": toYearOutside
    };


    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(jsonData),

        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const responseData = await response.json();
        console.log(responseData.price)
    } catch (error) {
        console.error("Error==========:", error);
    }
}

function finalBook(){
    getSelectedDate()
    postData().then(() =>{
        window.location.href = `../payment/payment.html?rentalId=${rentalId}`;
        
    })

    
}

