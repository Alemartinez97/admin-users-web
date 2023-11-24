interface IUser {
    name: string,
    surname: string,
    age: number | string,
    dni: number | string,
    email: string,
    password?: string,
    phone: number | string,
    role: string,
    tableData?: any
}