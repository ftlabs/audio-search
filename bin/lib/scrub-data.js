module.exports = function(o, whiteList){

	const nO = Object.assign({}, o);

	for(key in o){
		if(whiteList.indexIf(key) < 0){
			delete nO[key];
		}
	}

	return nO;

}