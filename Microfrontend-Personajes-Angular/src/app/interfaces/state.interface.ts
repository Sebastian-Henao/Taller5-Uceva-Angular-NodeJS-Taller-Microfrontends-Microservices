/**
 * Representa los posibles estados de un proceso o flujo
 * asincronico
 * 
 * @remarks
 * Se utiliza comunmente para indicar el estado actual de 
 * una operacion, como una llamada HTTP o la carga de datos
 * 
 * @public
 */
export type State =
  /** Estado inicial, antes de que comience el proceso */
  | 'init'
  /** El proceso esta en curso */
  | 'loading'
  /** El proceso finalizo correctamente */
  | 'success'
  /** Ocurrio un error durante el proceso */
  | 'error';

  /**
   * Estados posibles de una alerta
   * 
   * @remarks
   * Define el estado visual o funcional de una alerta,
   * normalmente asociado a procesos en curso o fallidos
   * 
   * @public
   */
export type AlertState = 
  /** La alaerta indica que hay un proceso en curso */
  | 'loading'
  /** La alerta indica que ocurrio un error */
  | 'error';