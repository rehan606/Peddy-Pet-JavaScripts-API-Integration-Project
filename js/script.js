
// Bismillah-Hir-Rahmanir-Rahim

/*
-------------------------------------------
*              Table of content           *
-------------------------------------------

** 01. ALL Category Loded From API
** 02. Load Category Items
** 03. Loader  Spinner
** 04. Display ALL Categories
** 05. All Pets Loaded From API
** 06. Display ALL Pets Data
** 07. Display Pet Details by PopUP Modal
** 08. Selection by like icon click
** 09. Adop Modal With Countdown Timer
** 10. Scroll section With Button Click
** 11. Sorting pets by price (descending ordered)
**** 11-1. Get short by price Button
**** 11-2. Load data from api 
**** 11-3. Sorting data display 

*/


//01. ALL Category Loded Loded From API

const categories = async() => {
    const response = await fetch(`https://openapi.programming-hero.com/api/peddy/categories/`)
    const data = await response.json()
    displayAllCategories(data.categories)

    
}
categories()


//02. Load Category Items
const loadCategoryItems = async(id ) => {
    
    const response = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`)
    const data = await response.json()
    displayPetsData(data.data)
    
    
};




// 03. Loader  Spinner
const loaderSpinner = () => {
    document.getElementById('spinner').style.display="block";
    setTimeout(function () {
        displayAllCategories()
    },2000)
};



// 04. Display ALL Categories

const displayAllCategories = (category) => {
    
    // get category container by id
    const categoryContainer = document.getElementById('category-container')
   
    category.forEach(categories => {
        const div = document.createElement('div')
        
        // Distructuring Category object
        const {id, category, category_icon} = categories

        // Create inner html in parent div
        div.innerHTML = `
            <button  onclick="loaderSpinner()" class="w-full" >
                <div id="btn-${id}"  onclick="loadCategoryItems('${categories.category}')" class=" category-btn border hover:border-[#010d78]  px-20 py-4 flex items-center justify-center gap-3 rounded-lg hover:rounded-full transition-all hover:bg-[#010d7811] bg-[#010d78] group cursor-pointer">
            
                    <div class="image w-12 h-12 ">
                        <img src="${category_icon}" alt="" class="w-full">
                    </div>
                    <h2 class=" group-hover:text-black font-bold text-lg text-yellow-300" >${category}</h2>
                    
                </div>
            </button>
        `
        // inject innerhtm in parent div
        categoryContainer.appendChild(div)
    } )
    
}




// 05. All Pets Loaded From API

const allPets = async() => {
    const response = await fetch(`https://openapi.programming-hero.com/api/peddy/pets`)
    const data =await response.json()
    displayPetsData(data.pets)
}

allPets()

// 06. Display ALL Pets Data

const displayPetsData = (pet) => {
    // Spinner display none when complete loading
    document.getElementById('spinner').style.display="none";
    // Get Html container id by GetElementsById 
    const itemsContainer = document.getElementById('items-container');
    itemsContainer.innerHTML = ""
    
    if(pet.length == 0){

        // Remove grid container when category items length is zero.
        itemsContainer.classList.remove("grid")

        // create inner html
        itemsContainer.innerHTML = `
            <div class="bg-slate-100 rounded-lg border border-yellow-400  ">             
                <div class="content-header ">
                    <div class="hero-content ">
                        <div class="max-w-md text-center py-10">
                            <div class=" w-20 h-20 mx-auto mb-8">
                                <img src="images/error.webp" alt="" class="w-full">
                            </div>
                            <h1 class="text-3xl font-bold">Adopt  Your  Best Friend</h1>
                            <p class="py-6"> Here are some top product recommendations to ensure your feline friend's well-being and happiness.</p>
                        </div>
                    </div>
                </div>
            </div>
        
        `;
        return;
    } else{

        itemsContainer.classList.add("grid")
    }
    

    pet.forEach(data => {
        // Create a div with JavaScript DOM
        const div = document.createElement('div')

        // Distructuring Object
        const {petId,image,pet_name,breed,date_of_birth,gender,price} = data

        // create inner Html
        div.innerHTML = `       
            <div class=" bg-base-100 shadow-xl rounded-lg border  p-4">
                <figure>
                    <img
                        src=" ${image}"
                        alt="Pet Image" class="w-full rounded-lg" />
                </figure>

                <div class="mt-6">
                    <h2 class="text-xl font-bold text-[#010d78] mb-2"> ${pet_name ?`${pet_name}`: 'Not Available'} </h2>
                    <div class="space-y-1 mb-3">
                        <p class="text-md font-semibold text-gray-500"><i class="fa-solid fa-table-cells-large mr-2"></i> Breed: ${breed ?`${breed}`: 'Not Available'}</p>
                        <p class="text-md font-semibold text-gray-500"> <i class="fa-regular fa-calendar mr-2"></i> Birth: ${date_of_birth ?`${date_of_birth}`: 'Not Available'}</p>
                        <p class="text-md font-semibold text-gray-500"><i class="fa-solid fa-mercury mr-2"></i> Gender: ${gender ?`${gender}`: 'Not Available'}</p>
                        <p class="text-md font-semibold text-gray-500"><i class="fa-solid fa-hand-holding-dollar mr-2"></i> Price : ${price ?`${price}`: 'Not Available'} <span>$</span> </p>
                    </div>

                    <hr>

                    <div class="card-actions justify-between mt-3">
                        <button onclick="selectByLike('${data.image}')" class="btn border border-gray-600 bg-white font-semibold text-lg text-[#010d78]  hover:bg-[#010d78] hover:text-yellow-400"><i class="fa-regular fa-thumbs-up"></i></button>
                        <button onclick="adopModal()" class="btn border border-gray-600 bg-white font-semibold text-lg text-[#010d78]  hover:bg-[#010d78] hover:text-yellow-400">Adopt</button>
                        <button onclick="petDetails('${petId}')" class="btn border border-gray-600 bg-white font-semibold text-lg text-[#010d78] hover:bg-[#010d78] hover:text-yellow-400">Details</button>
                    </div>
                </div>
            </div>

        `
        // inject or push inner html in parent div.
        itemsContainer.appendChild(div)

    });

   
}



// 07. Display Pet Details by PopUP Modal
const petDetails = async(petId) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`)
    const data = await response.json()
    console.log(data.petData)


    // Distructuring Object
    const {image,pet_name,breed,gender,date_of_birth, price,vaccinated_status, pet_details} = data.petData

    // get modal container
    const modalContainer = document.getElementById('modal-container')

    // create inner html
    modalContainer.innerHTML = `
        <dialog id="my_modal_5" class="modal modal-middle ">
            <div class="modal-box">
                <figure>
                    <img src="${image}" alt="cat" class="w-full rounded-lg" />
                </figure>
    
                <h2 class="text-xl font-bold text-[#010d78] mb-2 mt-4"> ${pet_name} </h2>
    
                <div class=" flex flex-col md:flex-row md:gap-7 mb-3">
                    <div class="">
                        <p class="text-sm md:text-md font-semibold text-gray-500"><i class="fa-solid fa-table-cells-large mr-2"></i> Breed: ${breed ?`${breed}`: 'Not Available'}</p>
                        <p class="text-sm md:text-md font-semibold text-gray-500"><i class="fa-solid fa-mercury mr-2"></i> Gender: ${gender ?`${gender}`: 'Not Available'}</p>

                        <p class="text-sm md:text-md font-semibold text-gray-500"><i class="fa-solid fa-mercury mr-2"></i> Vaccinated Status: ${vaccinated_status ?`${vaccinated_status}`: 'Not Available' }</p>
                    </div>
    
                    <div class="">
                        <p class="text-sm md:text-md font-semibold text-gray-500"> <i class="fa-regular fa-calendar mr-2"></i> Birth: ${date_of_birth ? `${date_of_birth}`: 'Not Available'}</p>
                        <p class="text-sm md:text-md font-semibold text-gray-500"><i class="fa-solid fa-hand-holding-dollar mr-2"></i> Price : ${price ? `${price} $`: 'Not Available'} </p>
                    </div>
                </div>
    
                <hr>
    
                <h2 class="text-lg font-semibold text-[#010d78]  mt-2"> Details Informations </h2>
                <p class="py-4">${pet_details}</p>
    
                <div class="modal-action">
                    <form method="dialog" class="mx-auto">
                        <!-- if there is a button in form, it will close the modal -->
                        <button class=" btn w-64 sm:w-96  bg-[#010d78] text-white hover:text-[#010d78] hover:border-[#010d78]">Cancel</button>
                    </form>
                </div>
            </div>
        </dialog>
    
    `
    // call modal function 
    my_modal_5.showModal()
 
}



// 08. Selection by like icon click
const selectByLike = (image) => {

    // select parents container
    const selectionContainer = document.getElementById('selection-container');
    // Create a div
    const div = document.createElement('div')
    // Add innerHtm in creating DIV
    div.innerHTML = `
        <div class="image rounded-lg border p-2">
            <img src="${image}" alt="" class="rounded-lg">
        </div>
    `
    // inject inner html in parent div
    selectionContainer.appendChild(div)
}


// 09. Adop Modal With Countdown Timer
const adopModal = () => {
    const adopModalContainer = document.getElementById('adop-modal-container');

    // create innerHtm in  modal content into the container
    adopModalContainer.innerHTML = `
        <dialog id="my_modal_6" class="modal sm:modal-middle text-center w-64 md:w-96 mx-auto">
            <div class="modal-box bg-white">
                <img src="https://img.icons8.com/?size=64&id=e2vVSsJfvibw&format=png" alt="" class="mx-auto">
                <h3 class="text-xl font-bold text-black mb-2">Congrats!</h3>
                <p class="py-4 text-sm">Adoption process is starting for your pet!</p>
                <span id="countdown-timer" class="text-2xl font-bold">3</span> 
               
            </div>
        </dialog>
    `;

    // Show the modal
    document.getElementById('my_modal_6').showModal();

    // Countdown timer 
    let counter = 3; 

    // get countdown element by id
    const countdownElement = document.getElementById('countdown-timer');
    
    // countdown condition
    const countdownInterval = setInterval(() => {
        if (counter > 0) {
            countdownElement.textContent = counter; 
            counter--;
        } else {
            clearInterval(countdownInterval); 
            // close modal when time out
            document.getElementById('my_modal_6').close(); 
        }
    }, 1000); // 1 second interval
};


// 10. Scroll section With Button Click
document.getElementById("goto-adopt").addEventListener("click", function(event) {
    event.preventDefault(); 
    document.getElementById("content").scrollIntoView({
      behavior: "smooth" 
    });
});



// 11. Sorting pets by price (descending ordered)

// 11-1. Get short by price Button
document.getElementById('sort-descending-btn').addEventListener('click',function(event){
    event.preventDefault()
    loadShortData()

})

// 11-2. Load data from api 
const loadShortData = async() => {
    const response = await fetch(`https://openapi.programming-hero.com/api/peddy/pets/`)
    const data =await response.json()
    shortDataDisplay(data.pets)
}

// 11-3. Sorting data display 
const shortDataDisplay = (short) => {
    // Get container
    const shortingDataContainer = document.getElementById('items-container');
    // Empty previews data from container
    shortingDataContainer.innerHTML=""
    // Add grid class 
    shortingDataContainer.classList.add('grid')

    // Item sort by price
    short.sort((a, b) => b.price - a.price);

    short.forEach(item => {
        // Create a div in data container
        const div = document.createElement('div')
       
        // Distructuring Object
        const {petId,image,pet_name,breed,date_of_birth,gender,price} = item

        // Add innerHtm in creating DIV
        div.innerHTML = `    
            
            <div class=" bg-base-100 shadow-xl rounded-lg border  p-4">
                <figure>
                    <img
                        src=" ${image}"
                        alt="Pet Image" class="w-full rounded-lg" />
                </figure>

                <div class="mt-6">
                    <h2 class="text-xl font-bold text-[#010d78] mb-2"> ${pet_name ?`${pet_name}`: 'Not Available'} </h2>
                    <div class="space-y-1 mb-3">
                        <p class="text-md font-semibold text-gray-500"><i class="fa-solid fa-table-cells-large mr-2"></i> Breed: ${breed ?`${breed}`: 'Not Available'}</p>
                        <p class="text-md font-semibold text-gray-500"> <i class="fa-regular fa-calendar mr-2"></i> Birth: ${date_of_birth ?`${date_of_birth}`: 'Not Available'}</p>
                        <p class="text-md font-semibold text-gray-500"><i class="fa-solid fa-mercury mr-2"></i> Gender: ${gender ?`${gender}`: 'Not Available'}</p>
                        <p class="text-md font-semibold text-gray-500"><i class="fa-solid fa-hand-holding-dollar mr-2"></i> Price : ${price ?`${price}`: 'Not Available'} <span>$</span> </p>
                    </div>

                    <hr>

                    <div class="card-actions justify-between mt-3">
                        <button onclick="selectByLike('${item.image}')" class="btn border border-gray-600 bg-white font-semibold text-lg text-[#010d78]  hover:bg-[#010d78] hover:text-yellow-400"><i class="fa-regular fa-thumbs-up"></i></button>
                        <button onclick="adopModal()" class="btn border border-gray-600 bg-white font-semibold text-lg text-[#010d78]  hover:bg-[#010d78] hover:text-yellow-400">Adopt</button>
                        <button onclick="petDetails('${petId}')" class="btn border border-gray-600 bg-white font-semibold text-lg text-[#010d78] hover:bg-[#010d78] hover:text-yellow-400">Details</button>
                    </div>
                </div>
            </div>

        `;
        // Append innerHtml in data container
        shortingDataContainer.appendChild(div)

    })

}

shortDataDisplay()




/// END for the day

