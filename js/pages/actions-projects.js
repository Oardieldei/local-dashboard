const addProjectWrapper = document.querySelector('.add_project')

export function openSideBlock() {
	addProjectWrapper.classList.remove('side_block-hide')
}

export function closeSideBlock() {
	addProjectWrapper.classList.add('side_block-hide')
	addProjectWrapper.querySelectorAll('.side_block__item').forEach(elem => {
		elem.classList.remove('error-input')
		elem.children[1].value = ''
	})
}

export function addCancelBtnListener() {
	addProjectWrapper.querySelector('.add_project__btn_cancel').addEventListener('click', closeSideBlock)
}

