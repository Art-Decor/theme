let timeout;
let initialQuantities = {};

window.addEventListener('DOMContentLoaded', () => {
    const quantityInputs = document.querySelectorAll('.quantity-edit-input');
    const quantityButtons = document.querySelectorAll('.number-btn');
    const updateCartButton = document.getElementById('edit-submit');
    
    quantityButtons.forEach((button)=>{
        button.addEventListener('click',()=>{
            button.parentElement?.querySelector('input')?.dispatchEvent(new Event('input'))
        })
    })
    
    quantityInputs.forEach(function(quantityInput, index) {
        initialQuantities[index] = parseInt(quantityInput.value);
        quantityInput.addEventListener('input', function() {
    
            clearTimeout(timeout);

            if (quantityInput.value == '') {
                quantityInput.value = 1
            }
    
            timeout = setTimeout(function() {
                const currentQuantity = parseInt(quantityInput.value, 10);
                if (currentQuantity !== initialQuantities[index]) {
                    setDisabledStyles()
                    updateCartButton.click();
                }
            }, 800);
        });
    
    });

    function setDisabledStyles(){
        const checkoutButton = document.getElementById('edit-checkout');
        const couponButton = document.querySelector('[data-drupal-selector="edit-coupon-redemption-apply"]')

        checkoutButton.disabled = true
        couponButton.disabled = true
        quantityInputs.forEach((quantityInput)=>{
            quantityInput.blur()
            quantityInput.parentElement.classList.add('pointer-events-none','opacity-50')
        })

    }

})