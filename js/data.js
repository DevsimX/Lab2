const countries = [
    { name: "Canada", continent: "North America", cities: ["Calgary","Montreal","Toronto"], photos: ["canada1.jpg","canada2.jpg","canada3.jpg"] },
    { name: "United States", continent: "North America", cities: ["Boston","Chicago","New York","Seattle","Washington"], photos: ["us1.jpg","us2.jpg"] },
    { name: "Italy", continent: "Europe", cities: ["Florence","Milan","Naples","Rome"], photos: ["italy1.jpg","italy2.jpg","italy3.jpg","italy4.jpg","italy5.jpg","italy6.jpg"] },
    { name: "Spain", continent: "Europe", cities: ["Almeria","Barcelona","Madrid"], photos: ["spain1.jpg","spain2.jpg"] }
];
window.onload = function () {
    let country = new Array(4);
    let f_container = document.getElementsByClassName("flex-container");
    for(let i = 0 ; i < 4 ; i++){
        country[i] = document.createElement("div");

        country[i].className = "item";

        let h2 = document.createElement("h2");

        h2.innerHTML = countries[i].name;

        let h3 = document.createElement("h3");

        h3.innerHTML = countries[i].continent;

        let inner_box = document.createElement("div");

        inner_box.className = "inner-box";

        let inner_box_h2 = document.createElement("h2");

        inner_box_h2.innerHTML = "Cities";

        inner_box.appendChild(inner_box_h2);

        let ul = document.createElement("ul");

        for(let j = 0 ; j < countries[i].cities.length ; j++){

            let li = document.createElement("li");

            li.innerHTML = countries[i].cities[j];

            ul.appendChild(li)
        }

        inner_box.appendChild(ul);

        let inner_box_photo = document.createElement("div");

        inner_box_photo.className = "inner-box";

        let inner_box_photo_h2 = document.createElement("h2");

        inner_box_photo_h2.innerHTML = "Popular Photos";

        inner_box_photo.appendChild(inner_box_photo_h2);

        for(let k = 0 ; k < countries[i].photos.length ; k++){

            let photo = document.createElement("img");

            photo.className = "photo";

            photo.src = "images/" + countries[i].photos[k];

            inner_box_photo.appendChild(photo);
        }

        let button = document.createElement("button");

        let p = document.createElement("p");

        p.innerHTML = "Visit";

        button.appendChild(p);

        country[i].append(h2,h3,inner_box,inner_box_photo,button);

        f_container[0].appendChild(country[i]);

    }
};
