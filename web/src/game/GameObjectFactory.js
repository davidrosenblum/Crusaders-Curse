import { getGameObjectType } from "./GameObjects";

export class GameObjectFactory{
    static create(options){
        let {type, x, y, anim, name, team, objectID} = options;

        let Type = getGameObjectType(type);

        if(Type){
            let object = new Type(x, y, name, objectID, team);

            if(anim) object.playAnimation(anim);

            if(name) object.setNametag(name);

            return object;
        }

        return null;
    }
}