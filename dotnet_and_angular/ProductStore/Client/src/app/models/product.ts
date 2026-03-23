/**
 * The interface is a purely compile-time construct for type-hinting
 * and conformity in Typescript. It doesn’t translate to a concrete
 * JavaScript class during runtime.
 */
export interface Product {
  id: number;
  name: string;
  description: string | null;
  price: number;
  isAvailable: boolean;
}
