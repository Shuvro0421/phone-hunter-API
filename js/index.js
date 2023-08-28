const loadPhone = async (searchText = 'apple', isShowAll) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await response.json();
    phones = data.data;
    displayPhones(phones, isShowAll);
}

const displayPhones = (phones, isShowAll) => {

    const phoneContainer = document.getElementById('phone-container');
    // clear cards
    phoneContainer.textContent = '';
    const showAll = document.getElementById('show-all');

    // show all remove show all
    if (phones.length > 12 && !isShowAll) {
        showAll.classList.remove('hidden');
    }
    else {
        showAll.classList.add('hidden');
    }

    // phone slicing
    if (!isShowAll) {
        phones = phones.slice(0, 12);
    }




    // getting single data
    phones.forEach(phone => {
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card p-4 bg-gray-300 shadow-xl`;
        phoneCard.innerHTML = `

            <figure><img class="rounded-xl" src="${phone.image}" alt="phone" /></figure>
            <div class="card-body flex flex-col space-y-2 items-center justify-center">
            <h2 class="card-title ">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-end">
                <button class="btn btn-primary" onclick = "showDetails('${phone.slug}')">Show Details</button>
            </div>
            </div>
        
        `
        // append child
        phoneContainer.appendChild(phoneCard);
    });

    // loading 
    loading(false);

    // showing no phone found
    if (phones.length === 0) {
        const phoneCard = document.createElement('div');
        phoneCard.classList = `text-2xl font-semibold mt-4`
        phoneCard.innerHTML = `
            <p>Phones not found</p>
        `;

        phoneContainer.appendChild(phoneCard);
    }





}

// search
const handleSearch = (isShowAll) => {
    loading(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhone(searchText, isShowAll);
}

// loader
const loading = (isLoading) => {
    const loadingInfinity = document.getElementById('loading-infinity');

    if (isLoading) {
        loadingInfinity.classList.remove('hidden');
    }
    else {
        loadingInfinity.classList.add('hidden');
    }


}

// show all
const showAllPhones = () => {
    handleSearch(true);
}

// show modal
const showDetails = async (id) => {

    const response = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await response.json();
    const phones = data.data;
    console.log(phones);

    showPhoneDetails(phones);

}

const showPhoneDetails = (phone) => {

    const showDetailContainer = document.getElementById('show-detail-container');
    showDetailContainer.innerHTML = `
    
        <img class="rounded-lg" src="${phone.image}" alt="">
        <p class ="font-normal"><span class ="font-bold text-red-500">Storage: </span> ${phone?.mainFeatures?.storage}</p>
        <p class ="font-normal"><span class ="font-bold text-red-500">GPS: </span> ${phone?.others?.GPS ? phone.others.GPS : 'No GPS Available'}</p>
        <p class ="font-normal"><span class ="font-bold text-red-500">GPS: </span> ${phone?.mainFeatures?.chipSet ? phone.mainFeatures.chipSet : 'No Chipset Available'}</p>
    
    `

    my_modal.showModal();

}




// load phone
loadPhone();