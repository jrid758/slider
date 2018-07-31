import { IEffect } from "./effectI";

export interface IComp {
    id: string;
    type: string;

    copy: string;
    video: any;
    image: any;

    left: number;
    top: number;

    scaleC: number;
    alphaC: number;
    widthC: number;
    heightC: number;

    zdepth: number;
    color: string;
    effects: IEffect[]; 
}