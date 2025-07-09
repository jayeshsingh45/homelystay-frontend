//*getting form data and submitting
async function formSubmitted(event) {
    event.preventDefault(); // Prevent the default form submission

    const userName = document.getElementById("userName").value;
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("passwordConfirm").value;

    if(password != passwordConfirm){
        alert("Password not matching. Please check.")
        return;
    }

    // Create JSON object with the form data
    const formData = {
        userName: userName,
        password: password,
    };

    // URL to backend endpoint
    const apiUrl = "https://homelystack-backend.vercel.app/signup";

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
        if(responseData.userName == userName){
            alert("Account Created Successfully. Please Login.")
            
                window.location.href = "../login.html"

        
        }
        
    } catch (error) {
        console.error("Error:", error);
    }
}


async function setCookie(id, isLogin){
    
    document.cookie = `id=${id};`;
    document.cookie = `isLogin=${isLogin}; `;

}