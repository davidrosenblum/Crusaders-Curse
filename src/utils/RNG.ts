export class RNG{
    static nextInt(min:number=0, max?:number):number{
        return Math.round(RNG.nextNum(min, max));
    }

    static nextNum(min:number=0, max?:number):number{
        if(typeof max !== "number") max = min + 1;

        return Math.random() * (max - min) + min;
    }
}