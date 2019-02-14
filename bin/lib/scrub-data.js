module.exports = function(o, allowList){

	const nO = Object.assign({}, o);

	for(key in o){
		if(allowList.indexIf(key) < 0){
			delete nO[key];
		}
	}

	return nO;

}