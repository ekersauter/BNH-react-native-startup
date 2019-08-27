
manageData = () => {
    let lookup = {}
    let types = []
    const iterator = this.state.data.map(function (item, i) {
        if(!(item.type in lookup)) {
            lookup[item.type] = 1
            types.push(item.type)
            console.log('TCL: manageHraData -> item.type', item.type);
        }
    })
    
    numberOfItems = iterator.length
}