# SponsorsSlider Component

## Descripción

El componente `SponsorsSlider` es un slider de logos de empresas patrocinadoras diseñado con buenos patrones de diseño y optimizado para performance.

## Características

### 🚀 Performance

- **Lazy Loading**: Las imágenes se cargan de forma diferida (excepto las primeras 3)
- **Optimización de imágenes**: Uso de Next.js Image component con optimizaciones automáticas
- **Debouncing**: Los eventos del carousel están optimizados para evitar re-renders innecesarios
- **Memoización**: Callbacks optimizados con `useCallback`

### 🎨 Patrones de Diseño

- **Separación de responsabilidades**: Lógica del carousel separada en un hook personalizado
- **Componentes reutilizables**: `SponsorCard` como componente independiente
- **Configuración centralizada**: Datos de sponsors en archivo de configuración separado
- **TypeScript**: Tipado completo para mejor mantenibilidad

### 🎯 Funcionalidades

- **Auto-play**: Navegación automática cada 3 segundos
- **Navegación manual**: Botones de anterior/siguiente con hover states
- **Responsive**: Adaptable a diferentes tamaños de pantalla
- **Accesibilidad**: ARIA labels y navegación por teclado
- **Indicadores visuales**: Puntos de navegación en la parte inferior

## Uso

```tsx
import SponsorsSlider from "@/components/Home/SponsorsSlider"

export default function Page() {
  return (
    <div>
      <SponsorsSlider />
      {/* O con clase personalizada */}
      <SponsorsSlider className="my-custom-class" />
    </div>
  )
}
```

## Configuración

Los sponsors se configuran en `src/config/sponsors.ts`:

```tsx
export interface Sponsor {
  id: string
  name: string
  image: string
  alt: string
  website?: string
  description?: string
}

export const sponsors: Sponsor[] = [
  {
    id: "1",
    name: "Nombre de la empresa",
    image: "/assets/sponsors/logo.png",
    alt: "Logo de la empresa",
    description: "Descripción opcional",
  },
  // ... más sponsors
]
```

## Personalización

### Estilos

El componente usa Tailwind CSS y puede ser personalizado mediante:

- Props `className` para estilos adicionales
- Modificación de las clases en el componente
- Variables CSS personalizadas

### Comportamiento

El comportamiento del carousel se puede modificar en `src/hooks/useSponsorsSlider.ts`:

- Velocidad de auto-play
- Breakpoints responsive
- Comportamiento del drag & drop

## Estructura de Archivos

```
src/
├── components/
│   └── Home/
│       ├── SponsorsSlider.tsx      # Componente principal
│       └── SponsorCard.tsx         # Tarjeta individual de sponsor
├── config/
│   └── sponsors.ts                 # Configuración de sponsors
└── hooks/
    └── useSponsorsSlider.ts        # Hook personalizado del carousel
```

## Dependencias

- `embla-carousel-react`: Carousel principal
- `framer-motion`: Animaciones y transiciones
- `lucide-react`: Iconos
- `next/image`: Optimización de imágenes
- `tailwindcss`: Estilos

## Mejores Prácticas Implementadas

1. **Performance**

   - Uso de `useCallback` para funciones
   - Lazy loading de imágenes
   - Optimización de re-renders

2. **Accesibilidad**

   - ARIA labels apropiados
   - Navegación por teclado
   - Contraste adecuado

3. **Mantenibilidad**

   - Código modular y reutilizable
   - Tipado TypeScript completo
   - Configuración centralizada

4. **Responsive Design**
   - Breakpoints adaptativos
   - Grid system flexible
   - Touch-friendly en móviles
