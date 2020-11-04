let rocket:Rocket; 
let rockets: Rocket[]=[]; 


const form=<HTMLFormElement>document.getElementById("form_rocket"); 


function createRocket(code:string, thursters: number, maxPower: number[]){
     
    if(code=='LDSF5A32'&&rocket==undefined){
        alert("Crea rocket1")
    }else{
        let existe=existeRocket(code); 
        if(existe===true){
            alert("Este rocket ya existe!")
        }else if(existe===false){
        let coet=new Rocket(code, thursters, maxPower);
        rockets.push(coet); 
        console.log(coet); 
        console.log(rockets); 
        rocket=coet;
        let i:any;
        i=rocketVerifyIndex(rocket.code);
        createProgressBar(i); 
        }
    }
}


function createRocketByForm(){
    let existe=false;   
    if(rocket==undefined){
        alert("Crea rocket 1"); 
    } else if(rockets.length===1) {
        alert("Crea rocket 2"); 
    } else if(rockets.length>=2) {
        let code:string=(<HTMLInputElement>document.getElementById("coderocket")).value;
        let thursters_form:string=(<HTMLInputElement>document.getElementById("thurstersrocket")).value;
        let maxPower_form:string=(<HTMLInputElement>document.getElementById("maxpowerrocket")).value;
        let thursters=Number(thursters_form); 
        let maxPower=maxPower_form.split(",").map(Number);
        let rocketvalidate=validateRocket(code,thursters_form,maxPower_form)
        if(rocketvalidate===true){
            existe=existeRocket(code);
            if(existe===true){
                alert("Este rocket ya existe!")
            }else{ 
                let coet=new Rocket(code,thursters, maxPower);
                rockets.push(coet); 
                console.log(coet); 
                console.log(rockets);
                rocket=coet; 
                let i:any;
                i=rocketVerifyIndex(rocket.code);
                alert(`rocket${(i+1)} creado!`);
               

            }
            
                
        }
                         
    }
     
}





function existeRocket(code:string){
    let existe=false; 
    for(let i=0; i<rockets.length; i++){
        if(rockets[i].code===code){
            existe=true; 
        }
    }
    return existe; 
}


function rocketVerifyIndex(code:string){
    for(let i=0; i<rockets.length; i++){
        if(rockets[i].code===code){
            return i; 
        }
    }
}


function validateRocket(code:string,thursters_form:string,maxPower_form:string){
   

    let acumErrores:number = 0;
    let form=(<HTMLFormElement>document.getElementById("form_rocket")); 
    form.classList.remove('is-invalid');
  

    if(code==""){
        (<HTMLInputElement>document.getElementById("coderocket")).classList.add("is-invalid"); 
        (<HTMLElement>document.getElementById("errorCode")).textContent = "Añade el codigo";
        acumErrores++;
    }else if(code.length!=8){
        (<HTMLInputElement>document.getElementById("coderocket")).classList.add("is-invalid"); 
        (<HTMLElement>document.getElementById("errorCode")).textContent = "8 carateres";
        acumErrores++;
    }
   
    if(thursters_form==""){
        (<HTMLInputElement>document.getElementById("thurstersrocket")).classList.add("is-invalid"); 
        (<HTMLElement>document.getElementById("errorThursters")).textContent = "Añade los propulsores";
        acumErrores++;
    }else if(isNaN(Number(thursters_form))){
        (<HTMLInputElement>document.getElementById("thurstersrocket")).classList.add("is-invalid"); 
        (<HTMLElement>document.getElementById("errorThursters")).textContent = "Es un numero";
        acumErrores++;
    }

    

    if(maxPower_form==""){
        (<HTMLInputElement>document.getElementById("maxpowerrocket")).classList.add("is-invalid"); 
        (<HTMLElement>document.getElementById("errorMaxPower")).textContent = "Añade la potencia máxima";
        acumErrores++;
    } else if(validarNumDePotencias(maxPower_form,thursters_form)===false){
        (<HTMLInputElement>document.getElementById("maxpowerrocket")).classList.add("is-invalid"); 
        (<HTMLElement>document.getElementById("errorMaxPower")).textContent = `${Number(thursters_form)} propulsores  entre comas`;
        acumErrores++;
    } else if(validarEsMultiplo(maxPower_form)===false){
        (<HTMLInputElement>document.getElementById("maxpowerrocket")).classList.add("is-invalid"); 
        (<HTMLElement>document.getElementById("errorMaxPower")).textContent = "Multiplos de 10";
        acumErrores++;
    } 

    if (acumErrores > 0) { 
        return false;
    } else {
        return true;
    }


}

function validarEsMultiplo(maxPower_form:string){
    let maxPower=maxPower_form.split(",").map(Number);
    console.log(maxPower); 
    let num;
    let count=0; 
    for(let i=0; i<maxPower.length; i++){
        num=maxPower[i]/10
        if(!Number.isInteger(num)){
            count+=1
        }
    }
    if(count==0){
        return true; 
    }else{
        return false; 
    }    

}


function validarNumDePotencias(maxPower_form:string, thursters_form:string){
    let maxPower=maxPower_form.split(",").map(Number);
    let thursters=Number(thursters_form); 
    if(maxPower.length===thursters){
        return true; 
    }else{
        return false; 
    }
}




function createProgressBar(i:number){
    let progressInfo= document.getElementById("coet"); 
    let progressbar= document.createElement('div'); 
    progressbar.innerHTML= ` 
        <div class="col-12">
            <label>Rocket ${(i+1)}:</label>
            <div class="progress">
            <div id="progress-bar${(i+1)}" class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%">
            </div>
        </div>
    `;
    console.log(progressbar); 
    progressInfo?.appendChild(progressbar); 
    


}


function accelerateRocket(code:string){
    let i:any;
    i=rocketVerifyIndex(code);
    rocket=rockets[i];
   
    if(rocket==undefined){
        alert("Primero tienes que crear el rocket"); 
    }else{    
    
        if(JSON.stringify(rocket.getActualPower())==JSON.stringify(rocket.getMaxPower())){
            console.log(JSON.stringify(rocket.getActualPower()));
            console.log(JSON.stringify(rocket.getMaxPower()));
            alert("La aceleracion esta al maximo!"); 
        }else{ 
            let rocketInfo= document.getElementById("rocketInfo"); 
            let element= document.createElement('div'); 
            element.innerHTML= `<div>Actual Power Rocket${(i+1)}: ${rocket.accelerar()}</div>`;
            console.log(element); 
            rocketInfo?.appendChild(element); 
            pintarProgressBar(i);
        } 
    }

}


function breakRocket(code: string){
    let i:any;
    i=rocketVerifyIndex(code);
    rocket=rockets[i];
    let breakRocket=isBreak(rocket); 
    if(rocket==undefined){
        alert("Primero tienes que crear el rocket");
    }else if((rocket.getActualPower()).length===0){
        alert("Para frenar es necesario acelerar!!!");
    }else{
        if(breakRocket===true){
            alert(`El rocket ${(i+1)} ya ha frenado!!`); 
        }else{
            let rocketInfo= document.getElementById("rocketInfo"); 
            let element= document.createElement('div'); 
            element.innerHTML= `<div>Actual Power Rocket${(i+1)}: ${rocket.frenar()}</div>`;
            console.log(element); 
            rocketInfo?.appendChild(element); 
            pintarProgressBar(i);
        
    
        }    


    } 

}


function isBreak(rocket:Rocket){
    let count=0;
    let potencia= rocket.getMaxPower(); 
 
    let breakRocket=rocket.getActualPower();
    for(let i=0; i<potencia.length; i++){
        if(breakRocket[i]==0){
            count+=1; 
        }
    }
    if(count===potencia.length){
        return true; 
    } 
    else if(count!=potencia.length){
        return false; 
    }   

}


function printRocket(code:string){
    let i:any;
    i=rocketVerifyIndex(code);
    rocket=rockets[i]; 
    if(rocket==undefined){
        alert("Primero tienes que crear el rocket");
    }
    let rocketInfo= document.getElementById("rocketInfo"); 
    let element= document.createElement('div'); 
    element.innerHTML= `<div>${rocket.toString()}</div>`;
    console.log(element); 
    rocketInfo?.appendChild(element); 
   
}


function printAllRockets(){
    if(rockets.length==0){
        alert("Primero tienes que crear un rocket");
    }else{
        let rocketInfo= document.getElementById("rocketInfo"); 
        let element= document.createElement('div'); 
        element.innerHTML= `<div>All rockets:</div>`;
        console.log(element); 
        rocketInfo?.appendChild(element);
        for(let j=0; j<rockets.length;j++){
            let rocketInfo= document.getElementById("rocketInfo"); 
            let element= document.createElement('div'); 
            element.innerHTML= `<li>${rockets[j].toString()}</li>`;
            console.log(element); 
            rocketInfo?.appendChild(element); 
        }

    }
    
}

function pintarProgressBar(i:number){
    let suma=0;
    let total=0;
    let width;  
    let arr=rocket.getActualPower(); 
    for(let z=0; z<arr.length; z++){
        suma+=arr[z]; 
        console.log(suma);    
    }
    let arr2=rocket.getMaxPower();
    for(let j=0; j<arr2.length; j++){
        total+=arr2[j]; 
    }    
    width=(suma/total)*100;  
    
    let progress=(<HTMLElement>document.getElementById(`progress-bar${(i+1)}`)); 
    progress.style.width = width+"%";
 
}



if (form){
    form.addEventListener("blur", (event:any) => {
    if (event.target.value != "") event.target.classList.remove("is-invalid");
    },  true); 
}   



