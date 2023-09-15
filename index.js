import teste from "./files/teste.json";
import { transpiler } from "./transpiler";

console.time('rinha')
transpiler(teste.expression);
console.timeEnd('rinha')