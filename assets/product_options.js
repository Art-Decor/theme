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
    document.addEventListener('change',()=>{
        let inputGroup = input.dataset.inputGroup
        if (!inputGroup || !input.labels) {
            return
        }
        
        let displayField = document.querySelector(`[data-group-selected=${inputGroup}]`)
        
        if (!displayField) {
            return
        }
        
        let valueLabel = input.labels[0].innerText 

        if (valueLabel) {
            displayField.textContent = valueLabel
        }
    })
}