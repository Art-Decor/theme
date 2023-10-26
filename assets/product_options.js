// window.addEventListener('DOMContentLoaded',() => {
//     syncOptionsHandler()
//     if (jQuery) {
//         jQuery(document).on('ajaxComplete',syncOptionsHandler)
//     }
// });


// function syncOptionsHandler() {    
//     const displayedInputs = document.querySelectorAll('[data-drupal-selector="edit-purchased-entity-wrapper"] input')
//     const optionsWrapper = document.querySelector('[data-drupal-selector="edit-field-options-wrapper"]')
//     const optionsInputs = document.querySelectorAll('[data-drupal-selector="edit-field-options-wrapper"] input')    

//     if (optionsWrapper) {
//         optionsWrapper.classList.add('!hidden');
//     }

//     if (optionsInputs) {
//         clearCheckboxes(optionsInputs)
//     }

//     if (displayedInputs && optionsInputs) {
//         displayedInputs.forEach(displayedInput=>{
//             if (displayedInput.checked) {
//                 clearCheckboxes(optionsInputs)
//                 setCheckByValue(displayedInput.value,optionsInputs)
//             }
//         })
//     }
// }

// function clearCheckboxes(inputs){
//     inputs.forEach(element => {
//         element.checked = false
//     });
// }

optionsListenerInit()

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

const typeAttrsMap = {
    117: ['Size','Canvas Wrap','Canvas Type','Floating Frame'],
    118: ['Size','Frame','Fine Art Print Types','Mat','Mat Width'],
    119: ['Fine Art Print Types','Size','Mat','Mat Width','Frame'],
    120: ['Size','Thickness','Hanging System'],
    121: ['Metal Print Options','Size','Corner Options','Hanging System'],
    122: ['Wood Printing Options','Size','Hanging System']
}

function toggleVisibleAttributes(typeId,attrElements){
    const attrElementsFiltered = Array.from(attrElements).filter(el => el.dataset.optionLabel !== 'Type')
    attrElementsFiltered.forEach(el => el.classList.add('!hidden'))

    const labelsArray = typeAttrsMap[typeId]
    labelsArray.forEach((label,index) => {
        const attrContainer = Array.from(attrElementsFiltered).find(el => el.dataset.optionLabel == label)
        if (attrContainer) {
            attrContainer.classList.remove('!hidden')
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

// function clearCheckGroup(inputGroup) {
//     const radioInputs = document.querySelectorAll(`input[data-input-group="${inputGroup}"]`)
//     radioInputs.forEach(input => setCheckByValue(input.value,false))
// }

// function setCheckByValue(externalValue, value = true){
//     const checkboxInputs = document.querySelectorAll('[data-options-checkboxes] input')

//     if (!checkboxInputs) return

//     const foundInput = Array.from(checkboxInputs).find(el => el.value == externalValue)

//     if (!foundInput) return

//     foundInput.checked = value
// }


window.addEventListener('DOMContentLoaded',()=>{
    (function($) {
        Drupal.behaviors.addToCart = {
          attach: function(context, settings) {
            $('.commerce-order-item-add-to-cart-form', context).on('submit', function () {
                const checkboxInputs = document.querySelectorAll('[data-options-checkboxes] input')
                const radioInputs = document.querySelectorAll('input[data-input-group]')
                if (checkboxInputs && radioInputs) {
                    radioInputs.forEach(el => {
                        if (el.checked) {
                            setCheckByValue(el.value,checkboxInputs)
                        }
                    })
                }
                debugger;
            });
          }
        }
      })(jQuery);
})

function setCheckByValue(externalVal,checkboxInputs){
    const foundCheckbox = Array.from(checkboxInputs).find(checkboxInput => checkboxInput.value == externalVal )
    if (!foundCheckbox) {
        return
    }
    foundCheckbox.checked = true
}
