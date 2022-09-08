let today = new Date();
let lat
let lon

// Set current time
function updateTime() {
    const time = new Date()
    document.getElementById('time-el').textContent = time.toLocaleTimeString("en-us", {timeStyle: "short"})
}

setInterval(updateTime, 1000)


// Here, timeStyle : short helps get rid of the seconds from time we get and toLocaleTimeString will convert the time to string value

// Set current date
let date = (today.toLocaleString('default', { month: 'long' }))+' '+today.getDate()+', '+today.getFullYear();
document.getElementById('date-el').textContent = date

// fetch background
fetch('https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature')
    .then(response => response.json())
    .then(data => {
        document.body.style.backgroundImage = `url("${data.urls.regular}")`
        document.getElementById('background-image-author').textContent = `Image by: ${data.user.name}`
    })
    .catch(err => {
        console.log(err)
        document.body.style.backgroundImage = `url("https://images.unsplash.com/photo-1560008511-11c63416e52d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDIxMTc&ixlib=rb-1.2.1&q=80&w=1080")`
		document.getElementById("background-image-author").textContent = `Image By: Dodi Achmad`
    })

// fetch weather

// navigator.geolocation.getCurrentPosition(position => {
//     fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`)
//         .then(res => {
//             if (!res.ok) {
//                 throw Error("Weather data not available")
//             }
//             return res.json()
//         })
//         .then(data => {
//             console.log(data)
//             document.getElementById('temp-el').textContent = Math.round(parseInt(data.main.temp))
//         document.getElementById('place-el').textContent = data.name
//         })
// });


if (navigator.geolocation) {
    /* geolocation is available */
    
    navigator.geolocation.getCurrentPosition((position) => {
        console.log(position)
         fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`)
        .then(response => {
            if (!response.ok) {
                throw("Weather information not available")
            }
            return response.json()
        })
        .then(data => {
            console.log(data)
            console.log("icon: ",data.weather[0].icon)
            // document.getElementById('temp-el').textContent = 
            document.getElementById('place-el').textContent = data.name
            // document.getElementById('weather-icon').src = ``
            document.getElementById('temp').innerHTML = 
            `<img id="weather-icon" class="icon" src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
            <p id="temp-el">${Math.round(parseInt(data.main.temp))}°</p>`
        })
        .catch(err => {
            document.getElementById('temp-el').textContent = '0'
            document.getElementById('place-el').innerHTML = `
                    <p>No Man's Land</p>
                    <p class="error">Geolocation not available</p>
                `
        })
    }) 
} 



// fetch these 4 crypto currency

let cryptoArray = ['bitcoin','dogecoin','ethereum', 'litecoin']

for (const currency of cryptoArray) {
    console.log("currency: ",currency)
    fetch(`https://api.coingecko.com/api/v3/coins/${currency}`)
    .then(res => {
        if (!res.ok) {
            throw Error("Something went wrong")
        }
        return res.json()
    })
    .then(data => {
        document.getElementById('crypto-el').innerHTML += `
        <div id="${currency}-el" class="currency">
            <img class="thumbnail" src="${data.image.thumb}" alt="${currency} thumbnail" />
            <p id="${currency}-value"><strong>${data.localization.en}: </strong> $ ${data.market_data.current_price.usd}</p>
        </div>
        `
    })
    .catch(err => {
        console.log(err) //For user information
        document.getElementById('crypto-el').innerHTML = `
            <p>Cannot load crypto data</p>
            <p class="error">*Check your console for more information</p>
        `
    })
}
