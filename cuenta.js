// cuenta.js
export class Cuenta {
  constructor(numero, saldo = 0, movimientos = []) {
    this.numero = numero
    this.saldo = saldo
    this.movimientos = movimientos
  }
  consultarSaldo() {
    return this.saldo
  }
  registrarMovimiento(tipo, monto) {
    this.movimientos.push({ tipo, monto, fecha: new Date().toISOString() })
    this.guardarEnLocalStorage()
  }
  consultarMovimientos() {
    return this.movimientos
  }
  guardarEnLocalStorage() {
    const data = {
      numero: this.numero,
      saldo: this.saldo,
      movimientos: this.movimientos,
    }
    localStorage.setItem(`cuenta_${this.numero}`, JSON.stringify(data))
  }
   static consultarSaldoDesdeLocalStorage(numeroCuenta) {
    const data = JSON.parse(localStorage.getItem(`cuenta_${numeroCuenta}`))
    return data ? data.saldo : null
  }
}
