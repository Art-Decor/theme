const typeAttrsMap = {
	117: ['Size', 'Canvas Wrap', 'Canvas Type', 'Floating Frame'],
	118: ['Size', 'Frame', 'Fine Art Print Types', 'Mat', 'Mat Width'],
	119: ['Fine Art Print Types', 'Size', 'Mat', 'Mat Width', 'Frame'],
	120: ['Size', 'Thickness', 'Hanging System'],
	121: ['Metal Print Options', 'Size', 'Corner Options', 'Hanging System'],
	122: ['Wood Printing Options', 'Size', 'Hanging System'],
}

optionsListenerInit()

;(function ($) {
	Drupal.behaviors.addToCart = {
		attach: function (context, settings) {
			$('.commerce-order-item-add-to-cart-form', context).on(
				'submit',
				function () {
					const checkboxInputs = document.querySelectorAll(
						'[data-options-checkboxes] input'
					)
					const radioInputs = document.querySelectorAll(
						'[data-option-hidden="false"] input[data-input-group]'
					)
					if (checkboxInputs && radioInputs) {
						radioInputs.forEach((el) => {
							if (el.checked) {
								setCheckByValue(el.value, checkboxInputs)
							}
						})
					}
				}
			)

			$('[data-input-group="option13"]')[0]?.click() // Default Type select

		},
	}
})(jQuery)

window.addEventListener('DOMContentLoaded', () => {
	;(function ($) {
		$(document).on('click', function () {
			$(
				'[data-parent=".js-form-item-field-options"] + div.collapse.in'
			).collapse('hide')
		})
	})(jQuery)
})

function optionsListenerInit() {
	document.addEventListener('change', (event) => {
		const input = event.target

		if (Object.keys(typeAttrsMap).includes(input.value)) {
			const attributeElements = document.querySelectorAll(
				'[data-option-label]'
			)
			if (input.value && attributeElements)
				toggleVisibleAttributes(input.value, attributeElements)
		}
		setDisplayedVal(input)
		setDisplayedPrice()
		setButtonState()
	})
}

function setDisplayedPrice() {
	const basePriceContainer = document.querySelector('[data-price-base]')
	const displayPriceContainer = document.querySelector(
		'[data-price-displayed]'
	)
	const selectedRadios = document.querySelectorAll(
		'[data-option-hidden="false"] input[data-input-group]:checked'
	)
	if (!basePriceContainer || !displayPriceContainer || !selectedRadios) {
		return
	}
	const basePrice = basePriceContainer.dataset.priceBase
	const hasComma = basePrice.includes(',')

	let optionsPriceSum = parseFloat(basePrice)
	selectedRadios.forEach((input) => {
		let parent = input.parentElement
		let optionPriceContainer = parent.querySelector('[data-option-price]')
		if (!optionPriceContainer) return

		let optionPrice = optionPriceContainer.dataset.optionPrice

		if (optionPrice) {
			optionsPriceSum += parseFloat(optionPrice.replace(',', '.'))
		}
	})
	let currPrice = displayPriceContainer.dataset.priceDisplayed
	optionsPriceSum = optionsPriceSum.toFixed(2)
	if (hasComma) {
		optionsPriceSum = optionsPriceSum.replace('.', ',')
	}

	displayPriceContainer.innerText = displayPriceContainer.innerText.replace(
		currPrice,
		optionsPriceSum
	)
	displayPriceContainer.dataset.priceDisplayed = optionsPriceSum
}

function toggleVisibleAttributes(typeId, attrElements) {
	const attrElementsFiltered = Array.from(attrElements).filter(
		(el) => el.dataset.optionLabel !== 'Type'
	)
	attrElementsFiltered.forEach((el) => {
		el.classList.add('!hidden')
		el.dataset.optionHidden = true
		el.required = false
		setChildInputsRequire(el, false)
	})

	const labelsArray = typeAttrsMap[typeId]
	labelsArray.forEach((label, index) => {
		const attrContainer = Array.from(attrElementsFiltered).find(
			(el) => el.dataset.optionLabel == label
		)
		if (attrContainer) {
			attrContainer.classList.remove('!hidden')
			attrContainer.dataset.optionHidden = false
			setChildInputsRequire(attrContainer, true)
			attrContainer.style.order = index + 2
		}
	})
	setButtonState()
}

function setDisplayedVal(input) {
	const inputGroup = input.dataset.inputGroup
	if (!inputGroup || !input.labels) {
		return
	}

	const displayField = document.querySelector(
		`[data-group-selected=${inputGroup}]`
	)
	if (!displayField) return

	const miniatureField = document.querySelector(
		`[data-group-miniature=${inputGroup}]`
	)
	if (miniatureField) {
		let inputMiniatureSrc = input.labels[0].querySelector(
			'[data-option-miniature] img'
		)?.src

		if (inputMiniatureSrc) {
			miniatureField.classList.remove('!hidden')
			miniatureField.src = inputMiniatureSrc
		} else {
			miniatureField.classList.add('!hidden')
		}
	}

	const valueLabel = input.dataset.inputLabel

	if (valueLabel) {
		displayField.textContent = valueLabel
	}
}

function setCheckByValue(externalVal, checkboxInputs) {
	const foundCheckbox = Array.from(checkboxInputs).find(
		(checkboxInput) => checkboxInput.value == externalVal
	)
	if (!foundCheckbox) {
		return
	}
	foundCheckbox.checked = true
}

function setChildInputsRequire(el, value) {
	const childInputs = el.querySelectorAll('input')
	if (childInputs) {
		childInputs.forEach((input) => (input.required = value))
	}
}

function setButtonState() {
	const formEl = document.querySelector(
		'.commerce-order-item-add-to-cart-form'
	)
	const buttonEl = document.querySelector('.button--add-to-cart')

	if (formEl && buttonEl) {
		const isValid = formEl.checkValidity()
		buttonEl.disabled = !isValid
	}
}
