let timeout;
let initialQuantities = {};

window.addEventListener('DOMContentLoaded', () => {
    const quantityInputs = document.querySelectorAll('.quantity-edit-input');
    const quantityButtons = document.querySelectorAll('.number-btn');
    const updateCartButton = document.getElementById('edit-submit');
    const checkoutButton = document.getElementById('edit-checkout');
    
    quantityButtons.forEach((button)=>{
        button.addEventListener('click',()=>{
            button.parentElement?.querySelector('input')?.dispatchEvent(new Event('input'))
        })
    })
    
    quantityInputs.forEach(function(quantityInput, index) {
        initialQuantities[index] = parseInt(quantityInput.value);
        quantityInput.addEventListener('input', function() {
    
            clearTimeout(timeout);
    
            timeout = setTimeout(function() {
                const currentQuantity = parseInt(quantityInput.value, 10);
                if (currentQuantity !== initialQuantities[index]) {
                    setDisabledStyles()
                    updateCartButton.click();
                }
            }, 1500);
        });
    
    });

    function setDisabledStyles(){
        checkoutButton.disabled = true
        quantityInputs.forEach((quantityInput)=>{
            quantityInput.blur()
            quantityInput.parentElement.classList.add('pointer-events-none','opacity-50')
        })

    }

})