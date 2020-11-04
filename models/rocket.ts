class Rocket{
    code:string;
    thursters:number;
    maxPower:number[];
    actualPower:number[]; 
    
     
   
    constructor(code:string,thursters:number,maxPower:number[]){
        this.code=code;
        this.thursters=thursters;
        this.maxPower=maxPower;  
        this.actualPower=[];
       
      
        
    }
    toString() {
        return `Rocket ${this.code}: ${this.maxPower} has ${this.thursters} thursters.`;
    }

    getActualPower(){
       return this.actualPower; 
    }

    getMaxPower(){
        return this.maxPower; 
    } 
    
    accelerar(){
        for(let i=0; i<this.maxPower.length; i++){
            if(this.actualPower[i]==undefined){
                this.actualPower[i]=0; 
            }
            if((this.maxPower[i]-this.actualPower[i])>0){
                this.actualPower[i]+=10; 
                
            }
        }
        console.log(this.actualPower);
            return this.actualPower;   
      
        
    } 

    frenar(){
        
        for(let i=0; i<this.maxPower.length; i++){
            if(this.actualPower[i]>=10){
                this.actualPower[i]-=10;      
            }   
        }
        return this.actualPower;          
    }

 

  
}
    
