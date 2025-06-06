import {Cuenta} from "./cuenta.js"
export class CuentaCorriente extends Cuenta {
  constructor(numero,saldo,movimientos, sobregiro) {
    super(numero,saldo,movimientos)
    this.sobregiro = sobregiro
  }

realizarRetiro(monto) {
  if (this.saldo - monto >= -this.sobregiro) {
    this.saldo -= monto 
    this.registrarMovimiento("retiro", monto) 
    this.guardarEnLocalStorage() 
    return true 
  }
  return false 
}

realizarConsignacion(monto) {
  if (this.saldo < 0) {
    const deuda = Math.abs(this.saldo) 
    if (monto >= deuda) {
      this.saldo = monto - deuda 
    } else {
      this.saldo += monto 
    }
  } else {
    this.saldo += monto 
  }
  this.registrarMovimiento("consignación", monto) 
  this.guardarEnLocalStorage() 
}
realizarTransferencia(destino, monto) {
  if (this.realizarRetiro(monto, false)) {
    destino.realizarConsignacion(monto)  
    this.registrarMovimiento(`Transferencia a ${destino.numero}`, monto)
    this.guardarEnLocalStorage()
    destino.guardarEnLocalStorage()  
    return true
  }
  return false
}
  registrarMovimiento(tipo, monto) {
    const movimiento = {
      tipo,
      monto,
      fecha: new Date().toISOString()
    }
    this.movimientos.push(movimiento)
  }
 guardarEnLocalStorage() {
  const cuenta = {
    numero: this.numero,
    saldo: this.saldo,
    movimientos: this.movimientos,
    interesMensual: this.interesMensual,
    tipoCuenta: this.tipoCuenta,
    sobregiro: this.sobregiro
  } 
  localStorage.setItem(`cuenta_${this.numero}`, JSON.stringify(cuenta)) 
}
  static cargarDesdeLocalStorage(numero) {
    const data = JSON.parse(localStorage.getItem(`cuenta_${numero}`))
    if (data) {
      return new CuentaCorriente(
  data.numero,
  data.saldo,
  data.movimientos,
  data.sobregiro
      )
    }
    return null
  }
}