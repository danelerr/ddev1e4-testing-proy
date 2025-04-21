const { NCargos } = require('../negocio/NCargos');

const mockCargosDAO = {
    obtenerCargos: jest.fn(),
    registrarCargo: jest.fn(),
    darDeBaja: jest.fn()
};

// Función para crear fechas sin problemas de zona horaria
function createDate(year, month, day) {
    return new Date(year, month - 1, day);
}

describe('NCargos', () => {
    let cargosNegocio;
    let realDate;

    beforeEach(() => {
        // Guardar la implementación original de Date
        realDate = global.Date;
        
        // Limpiar todos los mocks antes de cada prueba
        jest.clearAllMocks();
        
        // Crear una instancia de NCargos con el mock DAO
        cargosNegocio = new NCargos(mockCargosDAO);
    });
    
    afterEach(() => {
        // Restaurar el constructor original de Date
        global.Date = realDate;
    });

    describe('obtenerCargos', () => {
        test('debe devolver los cargos formateados cuando la consulta es exitosa', (done) => {
            // Preparar
            const cargosMock = [
                { id: 1, fecha_inicio: createDate(2025, 1, 15), ministerio_nombre: 'Pastor', miembro_nombre: 'Juan Pérez' },
                { id: 2, fecha_inicio: createDate(2025, 2, 20), ministerio_nombre: 'Diácono', miembro_nombre: 'Maria Gómez' }
            ];
            mockCargosDAO.obtenerCargos.mockImplementation((callback) => {
                callback(null, cargosMock);
            });

            // Actuar
            cargosNegocio.obtenerCargos((error, cargos) => {
                // Verificar
                expect(error).toBeNull();
                expect(cargos).toHaveLength(2);
                expect(cargos[0].fecha_inicio).toBe('15/01/2025');
                expect(cargos[1].fecha_inicio).toBe('20/02/2025');
                expect(mockCargosDAO.obtenerCargos).toHaveBeenCalledTimes(1);
                done();
            });
        });

        test('debe devolver error cuando la consulta falla', (done) => {
            // Preparar
            const errorMock = new Error('Error de base de datos');
            mockCargosDAO.obtenerCargos.mockImplementation((callback) => {
                callback(errorMock, null);
            });

            // Actuar
            cargosNegocio.obtenerCargos((error, cargos) => {
                // Verificar
                expect(error).toBe(errorMock);
                expect(cargos).toBeNull();
                expect(mockCargosDAO.obtenerCargos).toHaveBeenCalledTimes(1);
                done();
            });
        });
    });

    describe('registrarCargo', () => {
        test('debe registrar un cargo correctamente', (done) => {
            // Preparar
            const mockHoy = createDate(2025, 4, 19);
            global.Date = jest.fn(() => mockHoy);
            
            const datosCargo = {
                miembro_id: 1,
                ministerio_id: 2
            };
            
            const cargoEsperado = {
                fecha_inicio: mockHoy,
                vigente: 1,
                miembro_id: 1,
                ministerio_id: 2
            };
            
            mockCargosDAO.registrarCargo.mockImplementation((cargo, callback) => {
                callback(null);
            });

            // Actuar
            cargosNegocio.registrarCargo(datosCargo, (error) => {
                // Verificar
                expect(error).toBeUndefined();
                expect(mockCargosDAO.registrarCargo).toHaveBeenCalledWith(cargoEsperado, expect.any(Function));
                done();
            });
        });

        test('debe devolver error cuando el registro falla', (done) => {
            // Preparar
            const datosCargo = {
                miembro_id: 1,
                ministerio_id: 2
            };
            
            const errorMock = new Error('Error al registrar');
            mockCargosDAO.registrarCargo.mockImplementation((cargo, callback) => {
                callback(errorMock);
            });

            // Actuar
            cargosNegocio.registrarCargo(datosCargo, (error) => {
                // Verificar
                expect(error).toBe(errorMock);
                expect(mockCargosDAO.registrarCargo).toHaveBeenCalled();
                done();
            });
        });
    });

    describe('darDeBaja', () => {
        test('debe dar de baja un cargo correctamente', (done) => {
            // Preparar
            const mockHoy = createDate(2025, 4, 19);
            global.Date = jest.fn(() => mockHoy);
            
            const idCargo = 1;
            
            mockCargosDAO.darDeBaja.mockImplementation((id, fecha, callback) => {
                callback(null);
            });

            // Actuar
            cargosNegocio.darDeBaja(idCargo, (error) => {
                // Verificar
                expect(error).toBeUndefined();
                expect(mockCargosDAO.darDeBaja).toHaveBeenCalledWith(idCargo, mockHoy, expect.any(Function));
                done();
            });
        });

        test('debe devolver error cuando la baja falla', (done) => {
            // Preparar
            const idCargo = 1;
            const errorMock = new Error('Error al dar de baja');
            
            mockCargosDAO.darDeBaja.mockImplementation((id, fecha, callback) => {
                callback(errorMock);
            });

            // Actuar
            cargosNegocio.darDeBaja(idCargo, (error) => {
                // Verificar
                expect(error).toBe(errorMock);
                expect(mockCargosDAO.darDeBaja).toHaveBeenCalled();
                done();
            });
        });
    });

    describe('formatoFecha', () => {
        test('debe formatear la fecha correctamente', () => {
            // Preparar - usamos una fecha específica sin mock global
            const fecha = createDate(2025, 4, 19);
            
            // Actuar
            const resultado = cargosNegocio.formatoFecha(fecha);
            
            // Verificar
            expect(resultado).toBe('19/04/2025');
        });
        
        test('debe añadir ceros a los días y meses menores de 10', () => {
            // Preparar - usamos una fecha específica sin mock global
            const fecha = createDate(2025, 1, 5);
            
            // Actuar
            const resultado = cargosNegocio.formatoFecha(fecha);
            
            // Verificar
            expect(resultado).toBe('05/01/2025');
        });
    });
});