-- script para crear la base de datos de la iglesia
-- fecha de creación: 19 de abril de 2025

-- eliminar tablas si existen para evitar errores en ejecuciones repetidas (opcional, útil para desarrollo)
drop table if exists cargos;
drop table if exists relaciones;
drop table if exists parentesco;
drop table if exists matrimonios;
drop table if exists bautizos;
drop table if exists ministerios;
drop table if exists miembros;

-- tabla para almacenar la información de los miembros de la iglesia
create table miembros (
    id int(11) not null auto_increment,
    nombres varchar(100) not null,
    apellidos varchar(100) not null,
    sexo varchar(1), -- 'm' para masculino, 'f' para femenino, u otro sistema que definan
    fecha_nacimiento datetime,
    estado_civil varchar(1) not null, -- 's' soltero, 'c' casado, 'v' viudo, 'd' divorciado, etc.
    ci int(11) unique, -- cédula de identidad, unique para evitar duplicados
    domicilio varchar(255) default null, -- aumentado el tamaño por si 50 es poco
    celular int(11) default null,
    primary key (id)
) engine=innodb default charset=utf8mb4;

-- tabla para almacenar los diferentes ministerios de la iglesia
create table ministerios (
    id int(11) not null auto_increment,
    nombre varchar(100) not null,
    primary key (id)
) engine=innodb default charset=utf8mb4;

-- tabla para registrar los bautizos de los miembros
create table bautizos (
    id int(11) not null auto_increment,
    fecha datetime not null,
    miembro_id int(11) not null,
    primary key (id),
    constraint fk_bautizos_miembro
        foreign key (miembro_id) references miembros(id)
        on delete restrict on update cascade -- opcional: define qué pasa si se elimina/actualiza un miembro
) engine=innodb default charset=utf8mb4;

-- tabla para registrar los matrimonios realizados en la iglesia
create table matrimonios (
    id int(11) not null auto_increment,
    fecha datetime not null,
    novio_id int(11) not null,
    novia_id int(11) not null,
    primary key (id),
    constraint fk_matrimonios_novio
        foreign key (novio_id) references miembros(id)
        on delete restrict on update cascade,
    constraint fk_matrimonios_novia
        foreign key (novia_id) references miembros(id)
        on delete restrict on update cascade
) engine=innodb default charset=utf8mb4;


-- tabla para definir los tipos de parentesco (padre, hijo, hermano, cónyuge, etc.)
create table parentesco (
    id int(11) not null auto_increment,
    tipo_parentesco varchar(50) not null unique, -- unique para evitar tipos duplicados
    primary key (id)
) engine=innodb default charset=utf8mb4;

-- tabla de relación para vincular miembros entre sí según un tipo de parentesco
-- esto permite relaciones muchos a muchos (un miembro puede tener varios parientes)
create table relaciones (
    primer_miembro_id int(11) not null,
    segundo_miembro_id int(11) not null,
    parentesco_id int(11) not null,
    primary key (primer_miembro_id, segundo_miembro_id, parentesco_id),
    constraint fk_relaciones_miembro1
        foreign key (primer_miembro_id) references miembros(id)
        on delete cascade on update cascade,
    constraint fk_relaciones_miembro2
        foreign key (segundo_miembro_id) references miembros(id)
        on delete cascade on update cascade,
    constraint fk_relaciones_parentesco
        foreign key (parentesco_id) references parentesco(id)
        on delete restrict on update cascade
) engine=innodb default charset=utf8mb4;

-- tabla para asignar cargos a los miembros dentro de los ministerios
create table cargos (
    id int(11) not null auto_increment,
    fecha_inicio datetime default null,
    fecha_fin datetime default null,
    vigente bit(1) default b'1', -- 1 para vigente, 0 para no vigente
    miembro_id int(11) not null,
    ministerio_id int(11) not null,
    primary key (id),
    constraint fk_cargos_miembro
        foreign key (miembro_id) references miembros(id)
        on delete cascade on update cascade, -- si se borra el miembro, se borra el cargo
    constraint fk_cargos_ministerio
        foreign key (ministerio_id) references ministerios(id)
        on delete restrict on update cascade -- no permitir borrar ministerio si tiene cargos
) engine=innodb default charset=utf8mb4;