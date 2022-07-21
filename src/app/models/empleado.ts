export interface Empleado {
    cedula:      number;
    apellido1:   string;
    apellido2?:  string;
    nombre1:     string;
    nombre2?:    string;
    email:       string;
    password?:   string;
    telefono:    number;
    direccion:   string;
    sexo:        string;
    fnacimiento: string;
    firma?:      string;
    rol?:        string;
    /* idEmpleado?:  number; */
}