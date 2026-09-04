# Modelado de Amenazas: Sistema de Autenticación y API de Usuarios

**Fecha:** 2026-08-31  
**Versión:** 1.0  
**Autores:** [Nombre del Alumno / Equipo]

## 1. Diagrama de Flujo de Datos (DFD) con Mermaid.js

A continuación se muestra la arquitectura lógica del sistema, los flujos de datos y las fronteras de confianza (Trust Boundaries) que separan las zonas seguras de las inseguras.

```mermaid
graph TD
    %% Definición de Estilos y Fronteras de Confianza
    classDef internet fill:#f9f,stroke:#333,stroke-width:2px;
    classDef secureZone fill:#bbf,stroke:#333,stroke-width:2px;
    
    %% Actores y Componentes
    Usuario["Usuario (Navegador/App)"] -->|"1. Envía Credenciales (HTTPS)"| API["API Gateway / Backend"]
    Admin["Administrador de Red"] -->|"5. Mantenimiento (SSH)"| BD[("Base de Datos SQL")]
    
    API -->|"2. Consulta / Guarda Usuario"| BD
    API -->|"3. Valida Token"| Auth["Servicio de Auth Externo (OAuth)"]
    
    %% Fronteras de Confianza
    subgraph Frontera de Internet (Insegura)
        Usuario
    end
    
    subgraph Red Interna de la Empresa (Zona Segura)
        API
        BD
        Auth
    end

    %% Aplicar Estilos
    class Usuario internet;
    class API,BD,Auth secureZone;
