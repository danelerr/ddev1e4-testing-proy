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

    describe('eliminarMiembro', () => {
        test('debe eliminar un miembro correctamente', (done) => {
            // Preparar
            const idMiembro = 1;
            mockMiembrosDAO.eliminarMiembro.mockImplementation((id, callback) => {
                callback(null);
            });

            // Actuar
            miembrosNegocio.eliminarMiembro(idMiembro, (error) => {
                // Verificar
                expect(error).toBeNull();
                expect(mockMiembrosDAO.eliminarMiembro).toHaveBeenCalledWith(idMiembro, expect.any(Function));
                done();
            });
        });

        test('debe devolver error cuando la eliminación falla', (done) => {
            // Preparar
            const idMiembro = 1;
            const errorMock = new Error('Error al eliminar');
            mockMiembrosDAO.eliminarMiembro.mockImplementation((id, callback) => {
                callback(errorMock);
            });

            // Actuar
            miembrosNegocio.eliminarMiembro(idMiembro, (error) => {
                // Verificar
                expect(error).toBe(errorMock);
                expect(mockMiembrosDAO.eliminarMiembro).toHaveBeenCalledWith(idMiembro, expect.any(Function));
                done();
            });
        });
    });

    describe('obtenerHombres', () => {
        test('debe devolver los miembros hombres cuando la consulta es exitosa', (done) => {
            // Preparar
            const hombresMock = [
                { id: 1, nombres: 'Juan', apellidos: 'Pérez', sexo: 'M' },
                { id: 3, nombres: 'Pedro', apellidos: 'Rodríguez', sexo: 'M' }
            ];
            mockMiembrosDAO.obtenerHombres.mockImplementation((callback) => {
                callback(null, hombresMock);
            });

            // Actuar
            miembrosNegocio.obtenerHombres((error, hombres) => {
                // Verificar
                expect(error).toBeNull();
                expect(hombres).toEqual(hombresMock);
                expect(mockMiembrosDAO.obtenerHombres).toHaveBeenCalledTimes(1);
                done();
            });
        });

        test('debe devolver error cuando la consulta falla', (done) => {
            // Preparar
            const errorMock = new Error('Error de base de datos');
            mockMiembrosDAO.obtenerHombres.mockImplementation((callback) => {
                callback(errorMock, null);
            });

            // Actuar
            miembrosNegocio.obtenerHombres((error, hombres) => {
                // Verificar
                expect(error).toBe(errorMock);
                expect(hombres).toBeNull();
                expect(mockMiembrosDAO.obtenerHombres).toHaveBeenCalledTimes(1);
                done();
            });
        });
    });

    describe('obtenerMujeres', () => {
        test('debe devolver las miembros mujeres cuando la consulta es exitosa', (done) => {
            // Preparar
            const mujeresMock = [
                { id: 2, nombres: 'María', apellidos: 'González', sexo: 'F' },
                { id: 4, nombres: 'Ana', apellidos: 'López', sexo: 'F' }
            ];
            mockMiembrosDAO.obtenerMujeres.mockImplementation((callback) => {
                callback(null, mujeresMock);
            });

            // Actuar
            miembrosNegocio.obtenerMujeres((error, mujeres) => {
                // Verificar
                expect(error).toBeNull();
                expect(mujeres).toEqual(mujeresMock);
                expect(mockMiembrosDAO.obtenerMujeres).toHaveBeenCalledTimes(1);
                done();
            });
        });

        test('debe devolver error cuando la consulta falla', (done) => {
            // Preparar
            const errorMock = new Error('Error de base de datos');
            mockMiembrosDAO.obtenerMujeres.mockImplementation((callback) => {
                callback(errorMock, null);
            });

            // Actuar
            miembrosNegocio.obtenerMujeres((error, mujeres) => {
                // Verificar
                expect(error).toBe(errorMock);
                expect(mujeres).toBeNull();
                expect(mockMiembrosDAO.obtenerMujeres).toHaveBeenCalledTimes(1);
                done();
            });
        });
    });

    describe('obtenerNombre', () => {
        test('debe devolver el nombre cuando la consulta es exitosa', (done) => {
            // Preparar
            const idMiembro = 1;
            const resultadoMock = [{ nombres: 'Juan Carlos' }];
            mockMiembrosDAO.obtenerNombre.mockImplementation((id, callback) => {
                callback(null, resultadoMock);
            });

            // Actuar
            miembrosNegocio.obtenerNombre(idMiembro, (error, nombre) => {
                // Verificar
                expect(error).toBeNull();
                expect(nombre).toBe('Juan Carlos');
                expect(mockMiembrosDAO.obtenerNombre).toHaveBeenCalledWith(idMiembro, expect.any(Function));
                done();
            });
        });

        test('debe devolver null cuando no se encuentra el miembro', (done) => {
            // Preparar
            const idMiembro = 999;
            const resultadoVacioMock = [];
            mockMiembrosDAO.obtenerNombre.mockImplementation((id, callback) => {
                callback(null, resultadoVacioMock);
            });

            // Actuar
            miembrosNegocio.obtenerNombre(idMiembro, (error, nombre) => {
                // Verificar
                expect(error).toBeNull();
                expect(nombre).toBeNull();
                expect(mockMiembrosDAO.obtenerNombre).toHaveBeenCalledWith(idMiembro, expect.any(Function));
                done();
            });
        });

        test('debe devolver error cuando la consulta falla', (done) => {
            // Preparar
            const idMiembro = 1;
            const errorMock = new Error('Error de base de datos');
            mockMiembrosDAO.obtenerNombre.mockImplementation((id, callback) => {
                callback(errorMock, null);
            });

            // Actuar
            miembrosNegocio.obtenerNombre(idMiembro, (error, nombre) => {
                // Verificar
                expect(error).toBe(errorMock);
                expect(nombre).toBeNull();
                expect(mockMiembrosDAO.obtenerNombre).toHaveBeenCalledWith(idMiembro, expect.any(Function));
                done();
            });
        });
    });
});