const { NRelaciones } = require('../negocio/NRelaciones');

// Mock para la capa de datos (DRelaciones)
const mockRelacionesDAO = {
    obtenerRelaciones: jest.fn(),
    registrarRelacion: jest.fn()
};

describe('NRelaciones', () => {
    let relacionesNegocio;

    beforeEach(() => {
        // Limpiar todos los mocks antes de cada prueba
        jest.clearAllMocks();
        relacionesNegocio = new NRelaciones(mockRelacionesDAO);
    });

    describe('obtenerRelaciones', () => {
        test('debe devolver las relaciones cuando la consulta es exitosa', (done) => {
            // Preparar
            const relacionesMock = [
                { id: 1, miembro1_id: 1, miembro2_id: 2, parentesco_id: 1, miembro1_nombre: 'Juan Pérez', miembro2_nombre: 'María Pérez', tipo_parentesco: 'Padre' },
                { id: 2, miembro1_id: 2, miembro2_id: 3, parentesco_id: 2, miembro1_nombre: 'María Pérez', miembro2_nombre: 'Ana Gómez', tipo_parentesco: 'Madre' }
            ];
            mockRelacionesDAO.obtenerRelaciones.mockImplementation((callback) => {
                callback(null, relacionesMock);
            });

            // Actuar
            relacionesNegocio.obtenerRelaciones((error, relaciones) => {
                // Verificar
                expect(error).toBeNull();
                expect(relaciones).toEqual(relacionesMock);
                expect(mockRelacionesDAO.obtenerRelaciones).toHaveBeenCalledTimes(1);
                done();
            });
        });

        test('debe devolver error cuando la consulta falla', (done) => {
            // Preparar
            const errorMock = new Error('Error de base de datos');
            mockRelacionesDAO.obtenerRelaciones.mockImplementation((callback) => {
                callback(errorMock, null);
            });

            // Actuar
            relacionesNegocio.obtenerRelaciones((error, relaciones) => {
                // Verificar
                expect(error).toBe(errorMock);
                expect(relaciones).toBeNull();
                expect(mockRelacionesDAO.obtenerRelaciones).toHaveBeenCalledTimes(1);
                done();
            });
        });
    });

    describe('registrarRelacion', () => {
        test('debe registrar una relación correctamente', (done) => {
            // Preparar
            const datosRelacion = {
                miembro1_id: 1,
                miembro2_id: 2,
                parentesco_id: 1
            };
            mockRelacionesDAO.registrarRelacion.mockImplementation((datos, callback) => {
                callback(null);
            });

            // Actuar
            relacionesNegocio.registrarRelacion(datosRelacion, (error) => {
                // Verificar
                expect(error).toBeNull();
                expect(mockRelacionesDAO.registrarRelacion).toHaveBeenCalledWith(datosRelacion, expect.any(Function));
                done();
            });
        });

        test('debe devolver error cuando el registro falla', (done) => {
            // Preparar
            const datosRelacion = {
                miembro1_id: 1,
                miembro2_id: 2,
                parentesco_id: 1
            };
            const errorMock = new Error('Error al registrar relación');
            mockRelacionesDAO.registrarRelacion.mockImplementation((datos, callback) => {
                callback(errorMock);
            });

            // Actuar
            relacionesNegocio.registrarRelacion(datosRelacion, (error) => {
                // Verificar
                expect(error).toBe(errorMock);
                expect(mockRelacionesDAO.registrarRelacion).toHaveBeenCalledWith(datosRelacion, expect.any(Function));
                done();
            });
        });
    });
});