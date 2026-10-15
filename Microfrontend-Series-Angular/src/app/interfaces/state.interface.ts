/**
 * Representa los posibles estados de un proceso asincrónico
 * (por ejemplo, una petición HTTP).
 *
 * @example
 * let state: State = 'loading';
 */
export type State =
  /** Estado inicial, antes de que comience el proceso */
  | 'init'
  /** El proceso está en curso */
  | 'loading'
  /** El proceso finalizó correctamente */
  | 'success'
  /** Ocurrió un error durante el proceso */
  | 'error';
