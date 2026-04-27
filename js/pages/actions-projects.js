export function addProjSideblockSwitchStance() {
	const addProjectWrapper = document.querySelector('.add_project')
	const openAddingSideBlock = () => {
		addProjectWrapper.classList.remove('side_block-hide')
	}

	const closeAddingSideBlock = () => {
		addProjectWrapper.classList.add('side_block-hide')
	}

	document.querySelector('.add_project__open_btn').addEventListener('click', openAddingSideBlock)
	addProjectWrapper.querySelector('.add_project__btn_cancel').addEventListener('click', closeAddingSideBlock)
}
