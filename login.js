//*getting form data and submitting
async function formSubmitted(event) {
    event.preventDefault(); // Prevent the default form submission

    const userName = document.getElementById("userName").value;
    const password = document.getElementById("password").value;

    // Create JSON object with the form data
    const formData = {
        userName: userName,
        password: password,
    };

    // URL to your backend endpoint
    const apiUrl = `https://homelystack-backend.vercel.app/login`;

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const responseData = await response.json();
        console.log(responseData);
        if(responseData.isLogin != true){
            alert("Wrong username or password")
            return ;
        }
        // Handle the response data here
        setCookie(responseData.id,responseData.isLogin)
        setTimeout(
                window.location.href = "./landing/landing.html"
                ,1000
        )
    } catch (error) {
        console.error("Error:", error);
    }
}


async function setCookie(id, isLogin){
    
    document.cookie = `id=${id};`;
    document.cookie = `isLogin=${isLogin}; `;

}