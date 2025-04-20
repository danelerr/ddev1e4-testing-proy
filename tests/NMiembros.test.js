const { NMiembros } = require('../negocio/NMiembros');

// Mock para la capa de datos (DMiembros)
const mockMiembrosDAO = {
    obtenerMiembros: jest.fn(),
    registrarMiembro: jest.fn(),
    eliminarMiembro: jest.fn(),
    obtenerHombres: jest.fn(),
    obtenerMujeres: jest.fn(),
    obtenerNombre: jest.fn()
};

describe('NMiembros', () => {
    let miembrosNegocio;

    beforeEach(() => {
        // Limpiar todos los mocks antes de cada prueba
        jest.clearAllMocks();
        // Crear una instancia de NMiembros con el mock DAO
        miembrosNegocio = new NMiembros(mockMiembrosDAO);
    });

    describe('obtenerMiembros', () => {
        test('debe devolver los miembros cuando la consulta es exitosa', (done) => {
            // Preparar
            const miembrosMock = [
                { id: 1, nombres: 'Juan', apellidos: 'Pérez' },
                { id: 2, nombres: 'María', apellidos: 'González' }
            ];
            mockMiembrosDAO.obtenerMiembros.mockImplementation((callback) => {
                callback(null, miembrosMock);
            });

            // Actuar
            miembrosNegocio.obtenerMiembros((error, miembros) => {
                // Verificar
                expect(error).toBeNull();
                expect(miembros).toEqual(miembrosMock);
                expect(mockMiembrosDAO.obtenerMiembros).toHaveBeenCalledTimes(1);
                done();
            });
        });

        test('debe devolver error cuando la consulta falla', (done) => {
            // Preparar
            const errorMock = new Error('Error de base de datos');
            mockMiembrosDAO.obtenerMiembros.mockImplementation((callback) => {
                callback(errorMock, null);
            });

            // Actuar
            miembrosNegocio.obtenerMiembros((error, miembros) => {
                // Verificar
                expect(error).toBe(errorMock);
                expect(miembros).toBeNull();
                expect(mockMiembrosDAO.obtenerMiembros).toHaveBeenCalledTimes(1);
                done();
            });
        });
    });

    describe('registrarMiembro', () => {
        test('debe registrar un miembro correctamente', (done) => {
            // Preparar
            const nuevoMiembro = {
                nombres: 'Pedro',
                apellidos: 'Rodríguez',
                sexo: 'M',
                fecha_nacimiento: '1990-01-01',
                estado_civil: 'Soltero',
                ci: '12345678',
                domicilio: 'Calle 123',
                celular: '77712345'
            };
            mockMiembrosDAO.registrarMiembro.mockImplementation((miembro, callback) => {
                callback(null);
            });

            // Actuar
            miembrosNegocio.registrarMiembro(nuevoMiembro, (error) => {
                // Verificar
                expect(error).toBeNull();
                expect(mockMiembrosDAO.registrarMiembro).toHaveBeenCalledWith(nuevoMiembro, expect.any(Function));
                done();
            });
        });

        test('debe devolver error cuando el registro falla', (done) => {
            // Preparar
            const nuevoMiembro = { /* datos del miembro */ };
            const errorMock = new Error('Error al registrar');
            mockMiembrosDAO.registrarMiembro.mockImplementation((miembro, callback) => {
                callback(errorMock);
            });

            // Actuar
            miembrosNegocio.registrarMiembro(nuevoMiembro, (error) => {
                // Verificar
                expect(error).toBe(errorMock);
                expect(mockMiembrosDAO.registrarMiembro).toHaveBeenCalledWith(nuevoMiembro, expect.any(Function));
                done();
            });
        });
    });

    // Puedes añadir más pruebas para otros métodos (eliminarMiembro, obtenerHombres, etc.)
});