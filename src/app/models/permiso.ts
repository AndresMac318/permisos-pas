export interface Permiso {
    idPermiso?: number; 
    idAdministrativo: number,
    idEmpleado: number;
    fpermiso: string;
    fsalida: string;
    fentrada: string;
    observaciones?: string,
    codMotivo: number,
}