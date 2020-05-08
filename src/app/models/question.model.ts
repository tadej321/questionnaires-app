
export class Question {
  id?: string;
  description: string;
  scale1: number;
  scale2: number;
  scale3: number;
  scale4: number;
  scale5: number;

 constructor(
   description: string,
   scale1: number,
   scale2: number,
   scale3: number,
   scale4: number,
   scale5: number,
   id?: string,
 ) {
  this.id = id;
  this.description = description;
  this.scale1 = scale1;
  this.scale2 = scale2;
  this.scale3 = scale3;
  this.scale4 = scale4;
  this.scale5 = scale5;
 }

}
