// cuentaAhorros.js
import { Cuenta } from "./cuenta.js"

export class CuentaAhorros extends Cuenta {
  constructor(numero, saldo = 0, movimientos = [], interesMensual = 0.02) {
    super(numero, saldo, movimientos)
    this.interesMensual = interesMensual
    this.tipoCuenta = "CtaAhorros"
  }

  realizarRetiro(monto, registrarMovimiento = true) {
    if (monto <= this.saldo) {
      this.saldo -= monto
      if (registrarMovimiento) {
        this.registrarMovimiento("retiro", monto)
      }
      this.guardarEnLocalStorage()
      return true
    }
    return false
  }
  realizarConsignacion(monto) {
    this.saldo += monto
    this.registrarMovimiento("consignación", monto)
    this.guardarEnLocalStorage()
  }
  realizarTransferencia(destino, monto) {
    if (this.realizarRetiro(monto, false)) {
      this.realizarConsignacion(monto)
      this.registrarMovimiento(`Transferencia a ${destino.numero}`, monto)
      this.guardarEnLocalStorage()
      this.guardarEnLocalStorage()
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
      tipoCuenta: this.tipoCuenta
    }
    localStorage.setItem(`cuenta_${this.numero}`, JSON.stringify(cuenta))
  }
  static cargarDesdeLocalStorage(numero) {
    const data = JSON.parse(localStorage.getItem(`cuenta_${numero}`))
    if (data) {
      return new CuentaAhorros(
        data.numero,
        data.saldo,
        data.movimientos,
        data.interesMensual
      )
    }
    return null
  }
}