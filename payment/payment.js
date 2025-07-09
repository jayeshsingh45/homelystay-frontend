const queryParams = new URLSearchParams(window.location.search);
//get the value of "name"
const rentalId = queryParams.get('rentalId');



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
        setDataToHTML(responseData.day_difference,responseData.price)
    } catch (error) {
        console.error("Error==========:", error);
    }
}

function setDataToHTML(dayDifference,price){
    document.getElementById('noOfDay').innerText = "No. of day: "+dayDifference

    document.getElementById('showTotal').innerText = " Your Total is: " +  dayDifference * price

}

function payNow(){
    alert("Payment successful.")

    window.location.href = `../mybooking/mybooking.html`;

}