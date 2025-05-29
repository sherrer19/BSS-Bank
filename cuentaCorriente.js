import {Cuenta} from "./cuenta.js"
export class CuentaCorriente extends Cuenta {
  constructor(numero,saldo,movimientos, sobregiro) {
    super(numero,saldo,movimientos)
    this.sobregiro = sobregiro
  }

  realizarRetiro(monto) {
    if (monto <= this.saldo + this.sobregiro) {
      this.saldo -= monto
      this.registrarMovimiento("retiro", monto)
      return true
    } else {
      return false
    }
  }
  realizarConsignacion(monto) {
    this.saldo += monto
    this.registrarMovimiento("consignación", monto)
  }
}