const typeAttrsMap = {
    117: ['Size','Canvas Wrap','Canvas Type','Floating Frame'],
    118: ['Size','Frame','Fine Art Print Types','Mat','Mat Width'],
    119: ['Fine Art Print Types','Size','Mat','Mat Width','Frame'],
    120: ['Size','Thickness','Hanging System'],
    121: ['Metal Print Options','Size','Corner Options','Hanging System'],
    122: ['Wood Printing Options','Size','Hanging System']
}

optionsListenerInit()

window.addEventListener('DOMContentLoaded',()=>{
    (function($) {
        Drupal.behaviors.addToCart = {
          attach: function(context, settings) {
            $('.commerce-order-item-add-to-cart-form', context).on('submit', function () {
                const checkboxInputs = document.querySelectorAll('[data-options-checkboxes] input')
                const radioInputs = document.querySelectorAll('[data-option-hidden="false"] input[data-input-group]')
                if (checkboxInputs && radioInputs) {
                    radioInputs.forEach(el => {
                        if (el.checked) {
                            setCheckByValue(el.value,checkboxInputs)
                        }
                    })
                }
            });
          }
        }
      })(jQuery);
})

function optionsListenerInit(){
    document.addEventListener('change',(event)=>{
        const input = event.target
        
        if (Object.keys(typeAttrsMap).includes(input.value) ) {
            const attributeElements = document.querySelectorAll('[data-option-label]')
            if (input.value && attributeElements) toggleVisibleAttributes(input.value,attributeElements)
        }
        setDisplayedVal(input)

    })
}

function toggleVisibleAttributes(typeId,attrElements){
    const attrElementsFiltered = Array.from(attrElements).filter(el => el.dataset.optionLabel !== 'Type')
    attrElementsFiltered.forEach(el => {
        el.classList.add('!hidden');
        el.dataset.optionHidden = true;
        el.required = false
        setChildInputsRequire(el,false)
    })

    const labelsArray = typeAttrsMap[typeId]
    labelsArray.forEach((label,index) => {
        const attrContainer = Array.from(attrElementsFiltered).find(el => el.dataset.optionLabel == label)
        if (attrContainer) {
            attrContainer.classList.remove('!hidden')
            attrContainer.dataset.optionHidden = false
            setChildInputsRequire(attrContainer,true)
            attrContainer.style.order = index + 2
        } 
    })
}

function setDisplayedVal(input) {
    const inputGroup = input.dataset.inputGroup
    if (!inputGroup || !input.labels) {
        return
    }

    const inputContainer = document.querySelector(`.js-form-item-field-options #${inputGroup}`) 
    if (jQuery && inputContainer) {
        jQuery(inputContainer).collapse('hide')
    }
    
    const displayField = document.querySelector(`[data-group-selected=${inputGroup}]`)
    
    if (!displayField) {
        return
    }
    
    const valueLabel = input.labels[0].innerText 

    if (valueLabel) {
        displayField.textContent = valueLabel
    }    
}

function setCheckByValue(externalVal,checkboxInputs){
    const foundCheckbox = Array.from(checkboxInputs).find(checkboxInput => checkboxInput.value == externalVal )
    if (!foundCheckbox) {
        return
    }
    foundCheckbox.checked = true
}

function setChildInputsRequire(el,value){
    const childInputs = el.querySelectorAll('input')
    if (childInputs) {
        childInputs.forEach(input => input.required = value)
    }
}
