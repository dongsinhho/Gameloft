let chuoi = "akladalksdlkqqsadqotmwpomz"

const sort = (chuoi) => {
	if(chuoi.length< 2) return chuoi
	const key = chuoi.length - 1
	let left = ""
	let right = ""
	
	for(let i = 0; i < key; i++) {
		if (chuoi[i] < chuoi[key]) {
			left = left + chuoi[i]
		} else {
			right = right + chuoi[i]
		}
	}
	return sort(left)+chuoi[key]+sort(right)
}

console.log(sort(chuoi))