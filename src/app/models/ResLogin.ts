export interface ResLogin {
    cedula:           number;
    apellido1:        string;
    apellido2:        string;
    nombre1:          string;
    nombre2:          string;
    email:            string;
    password:         number;
    telefono:         string;
    direccion:        string;
    sexo:             string;
    fnacimiento:      Date;
    firma:            Firma;
    rol:              string;
    idAdministrativo?: number;
    idEmpleado?: number;
}

export interface Firma {
    type: string;
    data: number[];
}