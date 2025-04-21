const { NParentesco } = require('../negocio/NParentesco');

// Mock para la capa de datos (DParentesco)
const mockParentescoDAO = {
    obtenerParentescos: jest.fn(),
    obtenerParentesco: jest.fn()
};

describe('NParentesco', () => {
    let parentescoNegocio;

    beforeEach(() => {
        // Limpiar todos los mocks antes de cada prueba
        jest.clearAllMocks();
        // Crear una instancia de NParentesco con el mock DAO
        parentescoNegocio = new NParentesco(mockParentescoDAO);
    });

    describe('obtenerParentescos', () => {
        test('debe devolver los parentescos cuando la consulta es exitosa', (done) => {
            // Preparar
            const parentescosMock = [
                { id: 1, tipo_parentesco: 'Padre' },
                { id: 2, tipo_parentesco: 'Madre' },
                { id: 3, tipo_parentesco: 'Hijo/a' }
            ];
            mockParentescoDAO.obtenerParentescos.mockImplementation((callback) => {
                callback(null, parentescosMock);
            });

            // Actuar
            parentescoNegocio.obtenerParentescos((error, parentescos) => {
                // Verificar
                expect(error).toBeNull();
                expect(parentescos).toEqual(parentescosMock);
                expect(mockParentescoDAO.obtenerParentescos).toHaveBeenCalledTimes(1);
                done();
            });
        });

        test('debe devolver error cuando la consulta falla', (done) => {
            // Preparar
            const errorMock = new Error('Error de base de datos');
            mockParentescoDAO.obtenerParentescos.mockImplementation((callback) => {
                callback(errorMock, null);
            });

            // Actuar
            parentescoNegocio.obtenerParentescos((error, parentescos) => {
                // Verificar
                expect(error).toBe(errorMock);
                expect(parentescos).toBeNull();
                expect(mockParentescoDAO.obtenerParentescos).toHaveBeenCalledTimes(1);
                done();
            });
        });
    });

    describe('obtenerTipoParentescos', () => {
        test('debe devolver el tipo de parentesco cuando la consulta es exitosa', (done) => {
            // Preparar
            const idTipo = 1;
            const resultadoMock = [{ tipo_parentesco: 'Padre' }];
            mockParentescoDAO.obtenerParentesco.mockImplementation((id, callback) => {
                callback(null, resultadoMock);
            });

            // Actuar
            parentescoNegocio.obtenerTipoParentescos(idTipo, (error, tipo) => {
                // Verificar
                expect(error).toBeNull();
                expect(tipo).toBe('Padre');
                expect(mockParentescoDAO.obtenerParentesco).toHaveBeenCalledWith(idTipo, expect.any(Function));
                done();
            });
        });

        test('debe devolver error cuando la consulta falla', (done) => {
            // Preparar
            const idTipo = 1;
            const errorMock = new Error('Error de base de datos');
            mockParentescoDAO.obtenerParentesco.mockImplementation((id, callback) => {
                callback(errorMock, null);
            });

            // Actuar
            parentescoNegocio.obtenerTipoParentescos(idTipo, (error, tipo) => {
                // Verificar
                expect(error).toBe(errorMock);
                expect(tipo).toBeUndefined();
                expect(mockParentescoDAO.obtenerParentesco).toHaveBeenCalledWith(idTipo, expect.any(Function));
                done();
            });
        });
    });
});