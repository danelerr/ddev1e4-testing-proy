const { NMinisterios } = require('../negocio/NMinisterio');

// Mock para la capa de datos (DMinisterios)
const mockMinisteriosDAO = {
    obtenerMinisterios: jest.fn(),
    obtenerMinisterio: jest.fn()
};

describe('NMinisterios', () => {
    let ministeriosNegocio;

    beforeEach(() => {
        // Limpiar todos los mocks antes de cada prueba
        jest.clearAllMocks();
        // Crear una instancia de NMinisterios con el mock DAO
        ministeriosNegocio = new NMinisterios(mockMinisteriosDAO);
    });

    describe('obtenerMinisterios', () => {
        test('debe devolver los ministerios cuando la consulta es exitosa', (done) => {
            // Preparar
            const ministeriosMock = [
                { id: 1, nombre: 'Pastor' },
                { id: 2, nombre: 'Diácono' },
                { id: 3, nombre: 'Maestro' }
            ];
            mockMinisteriosDAO.obtenerMinisterios.mockImplementation((callback) => {
                callback(null, ministeriosMock);
            });

            // Actuar
            ministeriosNegocio.obtenerMinisterios((error, ministerios) => {
                // Verificar
                expect(error).toBeNull();
                expect(ministerios).toEqual(ministeriosMock);
                expect(mockMinisteriosDAO.obtenerMinisterios).toHaveBeenCalledTimes(1);
                done();
            });
        });

        test('debe devolver error cuando la consulta falla', (done) => {
            // Preparar
            const errorMock = new Error('Error de base de datos');
            mockMinisteriosDAO.obtenerMinisterios.mockImplementation((callback) => {
                callback(errorMock, null);
            });

            // Actuar
            ministeriosNegocio.obtenerMinisterios((error, ministerios) => {
                // Verificar
                expect(error).toBe(errorMock);
                expect(ministerios).toBeNull();
                expect(mockMinisteriosDAO.obtenerMinisterios).toHaveBeenCalledTimes(1);
                done();
            });
        });
    });

    describe('obtenerMinisterio', () => {
        test('debe devolver el nombre del ministerio cuando la consulta es exitosa', (done) => {
            // Preparar
            const idMinisterio = 1;
            const resultadoMock = [{ nombre: 'Pastor Principal' }];
            mockMinisteriosDAO.obtenerMinisterio.mockImplementation((id, callback) => {
                callback(null, resultadoMock);
            });

            // Actuar
            ministeriosNegocio.obtenerMinisterio(idMinisterio, (error, nombre) => {
                // Verificar
                expect(error).toBeNull();
                expect(nombre).toBe('Pastor Principal');
                expect(mockMinisteriosDAO.obtenerMinisterio).toHaveBeenCalledWith(idMinisterio, expect.any(Function));
                done();
            });
        });

        test('debe devolver null cuando no se encuentra el ministerio', (done) => {
            // Preparar
            const idMinisterio = 999;
            const resultadoVacioMock = [];
            mockMinisteriosDAO.obtenerMinisterio.mockImplementation((id, callback) => {
                callback(null, resultadoVacioMock);
            });

            // Actuar
            ministeriosNegocio.obtenerMinisterio(idMinisterio, (error, nombre) => {
                // Verificar
                expect(error).toBeNull();
                expect(nombre).toBeNull();
                expect(mockMinisteriosDAO.obtenerMinisterio).toHaveBeenCalledWith(idMinisterio, expect.any(Function));
                done();
            });
        });

        test('debe devolver error cuando la consulta falla', (done) => {
            // Preparar
            const idMinisterio = 1;
            const errorMock = new Error('Error de base de datos');
            mockMinisteriosDAO.obtenerMinisterio.mockImplementation((id, callback) => {
                callback(errorMock, null);
            });

            // Actuar
            ministeriosNegocio.obtenerMinisterio(idMinisterio, (error, nombre) => {
                // Verificar
                expect(error).toBe(errorMock);
                expect(nombre).toBeNull();
                expect(mockMinisteriosDAO.obtenerMinisterio).toHaveBeenCalledWith(idMinisterio, expect.any(Function));
                done();
            });
        });
    });
});