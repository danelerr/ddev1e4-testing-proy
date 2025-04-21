const { NMatrimonios } = require('../negocio/NMatrimonio');

// Mock para la capa de datos (DMatrimonios)
const mockMatrimoniosDAO = {
    obtenerMatrimonios: jest.fn(),
    registrarMatrimonio: jest.fn(),
    eliminarMatrimonio: jest.fn()
};

// Función para crear fechas sin problemas de zona horaria
function createDate(year, month, day) {
    return new Date(year, month - 1, day);
}

describe('NMatrimonios', () => {
    let matrimoniosNegocio;

    beforeEach(() => {
        // Limpiar todos los mocks antes de cada prueba
        jest.clearAllMocks();
        // Crear una instancia de NMatrimonios con el mock DAO
        matrimoniosNegocio = new NMatrimonios(mockMatrimoniosDAO);
    });

    describe('obtenerMatrimonios', () => {
        test('debe devolver los matrimonios formateados cuando la consulta es exitosa', (done) => {
            // Preparar
            const matrimoniosMock = [
                { id: 1, fecha: createDate(2025, 1, 15), esposo_nombre: 'Juan Pérez', esposa_nombre: 'Ana García', pastor_nombre: 'Pedro Gómez' },
                { id: 2, fecha: createDate(2025, 2, 20), esposo_nombre: 'Carlos Rodríguez', esposa_nombre: 'María López', pastor_nombre: 'Pedro Gómez' }
            ];
            mockMatrimoniosDAO.obtenerMatrimonios.mockImplementation((callback) => {
                callback(null, matrimoniosMock);
            });

            // Actuar
            matrimoniosNegocio.obtenerMatrimonios((error, matrimonios) => {
                // Verificar
                expect(error).toBeNull();
                expect(matrimonios).toHaveLength(2);
                expect(matrimonios[0].fecha).toBe('15/01/2025');
                expect(matrimonios[1].fecha).toBe('20/02/2025');
                expect(mockMatrimoniosDAO.obtenerMatrimonios).toHaveBeenCalledTimes(1);
                done();
            });
        });

        test('debe devolver error cuando la consulta falla', (done) => {
            // Preparar
            const errorMock = new Error('Error de base de datos');
            mockMatrimoniosDAO.obtenerMatrimonios.mockImplementation((callback) => {
                callback(errorMock, null);
            });

            // Actuar
            matrimoniosNegocio.obtenerMatrimonios((error, matrimonios) => {
                // Verificar
                expect(error).toBe(errorMock);
                expect(matrimonios).toBeNull();
                expect(mockMatrimoniosDAO.obtenerMatrimonios).toHaveBeenCalledTimes(1);
                done();
            });
        });
    });

    describe('registrarMatrimonio', () => {
        test('debe registrar un matrimonio correctamente', (done) => {
            // Preparar
            const datosMatrimonio = {
                fecha: createDate(2025, 4, 19),
                esposo_id: 1,
                esposa_id: 2,
                pastor_id: 3,
                lugar: 'Iglesia Central',
                testigo1: 'Roberto Gómez',
                testigo2: 'Laura Fernández'
            };
            
            mockMatrimoniosDAO.registrarMatrimonio.mockImplementation((datos, callback) => {
                callback(null);
            });

            // Actuar
            matrimoniosNegocio.registrarMatrimonio(datosMatrimonio, (error) => {
                // Verificar
                expect(error).toBeNull();
                expect(mockMatrimoniosDAO.registrarMatrimonio).toHaveBeenCalledWith(datosMatrimonio, expect.any(Function));
                done();
            });
        });

        test('debe devolver error cuando el registro falla', (done) => {
            // Preparar
            const datosMatrimonio = {
                fecha: createDate(2025, 4, 19),
                esposo_id: 1,
                esposa_id: 2,
                pastor_id: 3,
                lugar: 'Iglesia Central',
                testigo1: 'Roberto Gómez',
                testigo2: 'Laura Fernández'
            };
            
            const errorMock = new Error('Error al registrar');
            mockMatrimoniosDAO.registrarMatrimonio.mockImplementation((datos, callback) => {
                callback(errorMock);
            });

            // Actuar
            matrimoniosNegocio.registrarMatrimonio(datosMatrimonio, (error) => {
                // Verificar
                expect(error).toBe(errorMock);
                expect(mockMatrimoniosDAO.registrarMatrimonio).toHaveBeenCalledWith(datosMatrimonio, expect.any(Function));
                done();
            });
        });
    });

    describe('eliminarMatrimonio', () => {
        test('debe eliminar un matrimonio correctamente', (done) => {
            // Preparar
            const idMatrimonio = 1;
            
            mockMatrimoniosDAO.eliminarMatrimonio.mockImplementation((id, callback) => {
                callback(null);
            });

            // Actuar
            matrimoniosNegocio.eliminarMatrimonio(idMatrimonio, (error) => {
                // Verificar
                expect(error).toBeNull();
                expect(mockMatrimoniosDAO.eliminarMatrimonio).toHaveBeenCalledWith(idMatrimonio, expect.any(Function));
                done();
            });
        });

        test('debe devolver error cuando la eliminación falla', (done) => {
            // Preparar
            const idMatrimonio = 1;
            const errorMock = new Error('Error al eliminar');
            
            mockMatrimoniosDAO.eliminarMatrimonio.mockImplementation((id, callback) => {
                callback(errorMock);
            });

            // Actuar
            matrimoniosNegocio.eliminarMatrimonio(idMatrimonio, (error) => {
                // Verificar
                expect(error).toBe(errorMock);
                expect(mockMatrimoniosDAO.eliminarMatrimonio).toHaveBeenCalledWith(idMatrimonio, expect.any(Function));
                done();
            });
        });
    });

    describe('formatoFecha', () => {
        test('debe formatear la fecha correctamente', () => {
            // Preparar
            const fecha = createDate(2025, 4, 19);
            
            // Actuar
            const resultado = matrimoniosNegocio.formatoFecha(fecha);
            
            // Verificar
            expect(resultado).toBe('19/04/2025');
        });
        
        test('debe añadir ceros a los días y meses menores de 10', () => {
            // Preparar
            const fecha = createDate(2025, 1, 5);
            
            // Actuar
            const resultado = matrimoniosNegocio.formatoFecha(fecha);
            
            // Verificar
            expect(resultado).toBe('05/01/2025');
        });
    });
});