document.addEventListener("DOMContentLoaded", function () {
    const boxes = document.querySelectorAll(".box");
    const radioButtons = document.querySelectorAll("input[name='option']");
    const totalPriceElement = document.getElementById("total-price");
    const addToCartButton = document.querySelector(".btn");
    document.querySelectorAll(".select-boxs, .selectcontainer").forEach(box => box.style.display = "none");
    boxes.forEach(box => {
        box.addEventListener("click", function (event) {
            if (event.target.type === 'radio') {
                return;
            }
            document.querySelectorAll(".select-boxs, .selectcontainer").forEach(box => box.style.display = "none");
            const selectBoxes = box.querySelectorAll(".select-boxs, .selectcontainer");
            selectBoxes.forEach(selectBox => selectBox.style.display = "flex");
        });
    });
    radioButtons.forEach(radio => {
        radio.addEventListener("change", function () {
            const selectedUnit = parseFloat(this.value);
            totalPriceElement.textContent = selectedUnit.toFixed(2);
            document.querySelectorAll(".select-boxs, .selectcontainer").forEach(box => box.style.display = "none");
            const parentBox = this.closest(".box");
            const selectBoxes = parentBox.querySelectorAll(".select-boxs, .selectcontainer");
            selectBoxes.forEach(selectBox => selectBox.style.display = "flex");
        });
    });
    addToCartButton.addEventListener("click", function () {
        const selectedRadio = document.querySelector("input[name='option']:checked");
        if (!selectedRadio) {
            alert("Please select a unit option!");
            return;
        }

        const selectedProduct = selectedRadio.parentElement.textContent.trim();
        const parentBox = selectedRadio.closest(".box");

        const selectedSizes = Array.from(parentBox.querySelectorAll(".innersize select")).map(select => select.value);
        const selectedColors = Array.from(parentBox.querySelectorAll(".colorselect select")).map(select => select.value);

        const cartData = {
            product: selectedProduct,
            price: totalPriceElement.textContent,
            sizes: selectedSizes,
            colors: selectedColors
        };

        localStorage.setItem("cartData", JSON.stringify(cartData));

        window.location.href = "cart.html";
    });
});


