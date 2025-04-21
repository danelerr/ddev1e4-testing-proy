const { NBautizos } = require('../negocio/NBautizos');

// Mock para la capa de datos (DBautizos)
const mockBautizosDAO = {
    obtenerBautizos: jest.fn(),
    registrarBautizo: jest.fn(),
    eliminarBautizo: jest.fn()
};

function createDate(year, month, day) {
    return new Date(year, month - 1, day);
}

describe('NBautizos', () => {
    let bautizosNegocio;

    beforeEach(() => {
        // Limpiar todos los mocks antes de cada prueba
        jest.clearAllMocks();
        bautizosNegocio = new NBautizos(mockBautizosDAO);
    });

    describe('obtenerBautizos', () => {
        test('debe devolver los bautizos formateados cuando la consulta es exitosa', (done) => {
            // Preparar
            const bautizosMock = [
                { id: 1, fecha: createDate(2025, 1, 15), miembro_nombre: 'Juan Pérez', pastor_nombre: 'Pedro Gómez' },
                { id: 2, fecha: createDate(2025, 2, 20), miembro_nombre: 'Ana García', pastor_nombre: 'Pedro Gómez' }
            ];
            mockBautizosDAO.obtenerBautizos.mockImplementation((callback) => {
                callback(null, bautizosMock);
            });

            // Actuar
            bautizosNegocio.obtenerBautizos((error, bautizos) => {
                // Verificar
                expect(error).toBeNull();
                expect(bautizos).toHaveLength(2);
                expect(bautizos[0].fecha).toBe('15/01/2025');
                expect(bautizos[1].fecha).toBe('20/02/2025');
                expect(mockBautizosDAO.obtenerBautizos).toHaveBeenCalledTimes(1);
                done();
            });
        });

        test('debe devolver error cuando la consulta falla', (done) => {
            // Preparar
            const errorMock = new Error('Error de base de datos');
            mockBautizosDAO.obtenerBautizos.mockImplementation((callback) => {
                callback(errorMock, null);
            });

            // Actuar
            bautizosNegocio.obtenerBautizos((error, bautizos) => {
                // Verificar
                expect(error).toBe(errorMock);
                expect(bautizos).toBeNull();
                expect(mockBautizosDAO.obtenerBautizos).toHaveBeenCalledTimes(1);
                done();
            });
        });
    });

    describe('registrarBautizo', () => {
        test('debe registrar un bautizo correctamente', (done) => {
            // Preparar
            const datosBautizo = {
                fecha: createDate(2025, 4, 19),
                miembro_id: 1,
                pastor_id: 2,
                lugar: 'Iglesia Central'
            };
            
            mockBautizosDAO.registrarBautizo.mockImplementation((datos, callback) => {
                callback(null);
            });

            // Actuar
            bautizosNegocio.registrarBautizo(datosBautizo, (error) => {
                // Verificar
                expect(error).toBeNull();
                expect(mockBautizosDAO.registrarBautizo).toHaveBeenCalledWith(datosBautizo, expect.any(Function));
                done();
            });
        });

        test('debe devolver error cuando el registro falla', (done) => {
            // Preparar
            const datosBautizo = {
                fecha: createDate(2025, 4, 19),
                miembro_id: 1,
                pastor_id: 2,
                lugar: 'Iglesia Central'
            };
            
            const errorMock = new Error('Error al registrar');
            mockBautizosDAO.registrarBautizo.mockImplementation((datos, callback) => {
                callback(errorMock);
            });

            // Actuar
            bautizosNegocio.registrarBautizo(datosBautizo, (error) => {
                // Verificar
                expect(error).toBe(errorMock);
                expect(mockBautizosDAO.registrarBautizo).toHaveBeenCalledWith(datosBautizo, expect.any(Function));
                done();
            });
        });
    });

    describe('eliminarBautizo', () => {
        test('debe eliminar un bautizo correctamente', (done) => {
            // Preparar
            const idBautizo = 1;
            
            mockBautizosDAO.eliminarBautizo.mockImplementation((id, callback) => {
                callback(null);
            });

            // Actuar
            bautizosNegocio.eliminarBautizo(idBautizo, (error) => {
                // Verificar
                expect(error).toBeNull();
                expect(mockBautizosDAO.eliminarBautizo).toHaveBeenCalledWith(idBautizo, expect.any(Function));
                done();
            });
        });

        test('debe devolver error cuando la eliminación falla', (done) => {
            // Preparar
            const idBautizo = 1;
            const errorMock = new Error('Error al eliminar');
            
            mockBautizosDAO.eliminarBautizo.mockImplementation((id, callback) => {
                callback(errorMock);
            });

            // Actuar
            bautizosNegocio.eliminarBautizo(idBautizo, (error) => {
                // Verificar
                expect(error).toBe(errorMock);
                expect(mockBautizosDAO.eliminarBautizo).toHaveBeenCalledWith(idBautizo, expect.any(Function));
                done();
            });
        });
    });

    describe('formatoFecha', () => {
        test('debe formatear la fecha correctamente', () => {
            // Preparar
            const fecha = createDate(2025, 4, 19);
            
            // Actuar
            const resultado = bautizosNegocio.formatoFecha(fecha);
            
            // Verificar
            expect(resultado).toBe('19/04/2025');
        });
        
        test('debe añadir ceros a los días y meses menores de 10', () => {
            // Preparar
            const fecha = createDate(2025, 1, 5);
            
            // Actuar
            const resultado = bautizosNegocio.formatoFecha(fecha);
            
            // Verificar
            expect(resultado).toBe('05/01/2025');
        });
    });
});