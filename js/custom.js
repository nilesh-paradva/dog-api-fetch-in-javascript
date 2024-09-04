const getBreeds = document.getElementById("get-breeds");
const breedImag = document.getElementById("breedsImage");

const fetchBreeds = () => {
    fetch("https://dog.ceo/api/breeds/list/all").then(res1 => res1.json()).then(res2 => {
        let breedsGet = res2.message;

        for (let key in breedsGet) {
            if (breedsGet[key].length === 0) {
                getBreeds.innerHTML += `<li class="my-2 activeHover nav-link px-2 py-2 fw-bold rounded-3" onclick="BreedClick('${key}', this)" style="transition:all 0.3s"><a href="javascript:void(0)" class="d-block co-white text-capitalize" style="transition:all 0.3s">${key}</a></li>`;
            } else {

                let list = `<ul class="drop-list list-unstyled bg-info p-3 my-2 rounded-3">`;
                breedsGet[key].forEach(element => {
                    list += `<li class="my-2"><a href="javascript:void(0)" class="d-block bg-success text-capitalize py-2 px-2 rounded-3 text-white">${element}</a></li>`;
                });
                list += `</ul>`;

                getBreeds.innerHTML += `<li class="my-2 activeHover nav-link rounded-3 dropdown" onclick="BreedClick('${key}', this)"> <a href="javascript:void(0)" style="transition:all 0.3s" class="px-2 py-2 fw-bold rounded-3 d-flex align-items-center justify-content-between co-white dropdown text-capitalize"> <span>${key}</span><i class="fa-solid fa-angle-down ms-2 mt-1"></i></a>${list}</li>`;
            }
        }

        const defaultBreed = 'akita';
        const defaultElement = document.querySelector(`#get-breeds [onclick*="${defaultBreed}"]`);
        if (defaultElement)BreedClick(defaultBreed, defaultElement);
        
    }).catch(error => {
        console.log("error", error);
    });
};

const BreedClick = (breed, clickElement) => {
    document.querySelectorAll('#get-breeds .active').forEach(activeItem => {
        activeItem.classList.remove('active');
    });

    if (clickElement) {
        clickElement.classList.add('active');
        const isDropdown = clickElement.classList.contains('dropdown');

        if (isDropdown) {
            const parent = clickElement;
            document.querySelectorAll('.dropdown').forEach(dropdown => dropdown !== parent ? dropdown.classList.remove('open') : null);
            parent.classList.toggle('open');
        }
    }

    fetch(`https://dog.ceo/api/breed/${breed}/images`).then(res => res.json()).then(list => {

        let imgList = list.message;
        breedImag.innerHTML = "";
        imgList.forEach(imgURL => {
            breedImag.innerHTML += `
                    <div class="col-xxl-4">
                                    <div class="data-view rounded-3 d-flex flex-wrap row-gap-1">
                                        <img src="${imgURL}" class="rounded-4 border border-3 border-success" style="height: 380px; width: 360px;" alt="">
                                    </div>
                                </div>
                `;
        });
    }).catch(error => {
        console.log("error 404", error);
    });
};

fetchBreeds();