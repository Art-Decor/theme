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

// function setCheckByValue(externalValue,checkboxInputs){
//     const foundCheckbox = Array.from(checkboxInputs).find(checkboxInput => checkboxInput.value == externalValue )
//     if (!foundCheckbox) {
//         return
//     }
//     foundCheckbox.checked = true
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
        
        if (!input.value) return

        if (input.dataset.inputGroup) {
            clearCheckGroup(input.dataset.inputGroup)
        }
        setCheckByValue(input.value)
        setDisplayedVal(input)

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

function clearCheckGroup(inputGroup) {
    const radioInputs = document.querySelectorAll(`input[data-input-group="${inputGroup}"]`)
    radioInputs.forEach(input => setCheckByValue(input.value,false))
}

function setCheckByValue(externalValue, value = true){
    const checkboxInputs = document.querySelectorAll('[data-options-checkboxes] input')

    if (!checkboxInputs) return

    const foundInput = Array.from(checkboxInputs).find(el => el.value == externalValue)

    if (!foundInput) return

    foundInput.checked = value
}