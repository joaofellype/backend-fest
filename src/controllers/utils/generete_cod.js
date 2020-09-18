
function generete(){
    let codigo ='';
    for(var i=0;i<5;i++){
        codigo += Math.floor(Math.random()*10);
    }

    return codigo;
}

export default generete;