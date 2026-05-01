export function getEffectiveCapacity(capacityAllocation, projectFit) {
	let effCapa = capacityAllocation * projectFit
	return +effCapa.toFixed(3)
}