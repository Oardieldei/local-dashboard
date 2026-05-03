export function changeSidebarState(btn, sidebar) {
	btn.addEventListener('click', () => {
		btn.classList.toggle('sidebar_arrow__clicked')
		sidebar.classList.toggle('sidebar-hide')
	})
}