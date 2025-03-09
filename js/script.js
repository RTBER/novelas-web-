document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.getElementById("searchInput");
    const filterSelect = document.getElementById("filterSelect");
    const novelas = document.querySelectorAll(".link-novela"); // Eliminé ".novelas-container" en caso de que no exista

    function filterNovels() {
        const searchText = searchInput.value.toLowerCase();
        const selectedGenre = filterSelect.value;

        novelas.forEach(link => {
            const novela = link.querySelector(".novela");
            const title = novela.querySelector("h3").textContent.toLowerCase();
            const genres = novela.getAttribute("data-genero").split(","); // Convertimos en array

            const matchesSearch = title.includes(searchText);
            const matchesGenre = selectedGenre === "all" || genres.includes(selectedGenre); // Comprobamos si el género está en el array

            if (matchesSearch && matchesGenre) {
                link.classList.remove("hidden");
            } else {
                link.classList.add("hidden");
            }
        });
    }

    searchInput.addEventListener("input", filterNovels);
    filterSelect.addEventListener("change", filterNovels);
});
