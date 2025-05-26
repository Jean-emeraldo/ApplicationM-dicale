document.addEventListener('DOMContentLoaded', () => {
    // Liste de médicaments pour l'autocomplétion
    const medicaments = [
        "Paracétamol", "Ibuprofène", "Amoxicilline", "Doliprane", "Kardégic",
        "Levothyrox", "Spasfon", "Voltaren", "Augmentin", "Zyrtec",
        "Xanax", "Lexomil", "Dafalgan", "Efferalgan", "Smecta",
        "Imodium", "Gaviscon", "Mopral", "Lanzor", "Nexium",
        "Ventoline", "Seretide", "Symbicort", "Singulair", "Flixotide"
    ];

    // Initialiser l'autocomplétion
    const inputElement = document.getElementById("medicament");
    if (inputElement) {
        autocomplete(inputElement, medicaments);
    }
});

/**
 * Fonction d'autocomplétion
 * @param {HTMLInputElement} inp - Champ d'entrée
 * @param {Array} arr - Liste des suggestions
 */
function autocomplete(inp, arr) {
    let currentFocus;

    inp.addEventListener("input", function () {
        const val = this.value;
        closeAllLists();
        if (!val) return false;

        currentFocus = -1;

        // Créer un conteneur pour les suggestions
        const listContainer = document.createElement("div");
        listContainer.setAttribute("id", this.id + "autocomplete-list");
        listContainer.setAttribute("class", "autocomplete-items");
        this.parentNode.appendChild(listContainer);

        // Ajouter les suggestions correspondantes
        arr.forEach(item => {
            if (item.substr(0, val.length).toUpperCase() === val.toUpperCase()) {
                const suggestionItem = document.createElement("div");
                suggestionItem.innerHTML = `<strong>${item.substr(0, val.length)}</strong>${item.substr(val.length)}`;
                suggestionItem.innerHTML += `<input type='hidden' value='${item}'>`;

                suggestionItem.addEventListener("click", function () {
                    inp.value = this.querySelector("input").value;
                    closeAllLists();
                });

                listContainer.appendChild(suggestionItem);
            }
        });
    });

    inp.addEventListener("keydown", function (e) {
        let items = document.getElementById(this.id + "autocomplete-list");
        if (items) items = items.getElementsByTagName("div");

        if (e.keyCode === 40) { // Flèche bas
            currentFocus++;
            addActive(items);
        } else if (e.keyCode === 38) { // Flèche haut
            currentFocus--;
            addActive(items);
        } else if (e.keyCode === 13) { // Entrée
            e.preventDefault();
            if (currentFocus > -1 && items) {
                items[currentFocus].click();
            }
        }
    });

    /**
     * Ajouter la classe "active" à un élément
     * @param {HTMLCollection} items - Liste des suggestions
     */
    function addActive(items) {
        if (!items) return false;
        removeActive(items);
        if (currentFocus >= items.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = items.length - 1;
        items[currentFocus].classList.add("autocomplete-active");
    }

    /**
     * Supprimer la classe "active" de tous les éléments
     * @param {HTMLCollection} items - Liste des suggestions
     */
    function removeActive(items) {
        Array.from(items).forEach(item => item.classList.remove("autocomplete-active"));
    }

    /**
     * Fermer toutes les listes de suggestions
     * @param {HTMLElement} [elmnt] - Élément déclencheur
     */
    function closeAllLists(elmnt) {
        const items = document.getElementsByClassName("autocomplete-items");
        Array.from(items).forEach(item => {
            if (elmnt !== item && elmnt !== inp) {
                item.parentNode.removeChild(item);
            }
        });
    }

    // Fermer les listes de suggestions en cliquant ailleurs
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}
