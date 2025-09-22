# Bookstore - Aplicación para Gestión de Autores - Parcial 1 WEB Julian David Gonzalez - 202311757
Esta es una aplicación web desarrollada con Next.js que permite a los usuarios ver, crear, editar, eliminar y marcar como favoritos a diferentes autores. 
**Arquitectura de la Solución:**
La arquitectura de esta aplicación se basa en una clara separación de responsabilidades para garantizar la mantenibilidad y escalabilidad del código. Se divide en tres capas principales: la capa de estado, la capa de componentes (UI) y la capa de acceso a datos y validación.

## 1. Capa de Estado Global (Zustand)
El estado global, que incluye la lista de autores y los favoritos, se maneja de forma centralizada con Zustand. Esta librería proporciona un store reactivo que vive fuera del árbol de componentes de React, evitando así el "prop drilling" y permitiendo que cualquier componente acceda o modifique el estado de forma directa y eficiente.

Ejemplo de la definición del estado en `src/store/authorStore.ts`:

```ts
interface AuthorState {
  authors: Author[];
  favorites: Set<number>;
  loading: boolean;
  error: string | null;
  loadAuthors: () => Promise<void>;
  toggleFavorite: (id: number) => void;
  // ...otras acciones
}

export const useAuthorStore = create<AuthorState>((set) => ({
  // ...
}));
```
## 2. Capa de Componentes (React y Next.js)
La interfaz de usuario está construida con React y TypeScript, utilizando el App Router de Next.js para enrutamiento basado en archivos. Los componentes se han diseñado para ser reutilizables. Por ejemplo, el componente AuthorList.tsx se reutiliza tanto en la página principal (/authors) como en la de favoritos (/favorites), adaptando su comportamiento mediante props.

Ejemplo de la reutilización de AuthorList en src/app/favorites/page.tsx:

```ts
import AuthorList from "@/components/AuthorList";

export default function FavoritesPage() {
  // Se pasa una prop para que el componente sepa que debe filtrar por favoritos.
  return <AuthorList showOnlyFavorites={true} />;
}

```
## 3. Parte B: Opción Desarrollada - Accesibilidad
Para la Parte B del parcial, se ha desarrollado la Opción 1: Accesibilidad.

Se implementaron mejoras significativas para asegurar que la aplicación sea usable por personas con distintas capacidades.
### Navegación con Teclado
- No uses el ratón. Navega por toda la aplicación usando únicamente la tecla Tab para moverte entre elementos interactivos (botones, tarjetas, campos de formulario) y Shift + Tab para retroceder.  
- Verifica que:  
  - Siempre haya un contorno de foco visible (un "anillo" de color) alrededor del elemento seleccionado.  
  - La tabulación siga un orden lógico y predecible.  

### Uso de un Lector de Pantalla
- Activa el lector de pantalla de tu sistema operativo (p. ej., Narrador en Windows con Ctrl + Win + Enter o VoiceOver).  

**En el formulario de creación/edición:**  
- Navega a un campo y comete un error (p. ej., dejarlo vacío) esto mediante zod.  
- Escucharás cómo el lector de pantalla anuncia el mensaje de error específico gracias a los atributos `aria-invalid` y `aria-describedby`.  

Fragmento de `AuthorForm.tsx` que lo implementa:
```ts
<Input
  id="name"
  {...register("name")}
  aria-invalid={!!errors.name}
  aria-describedby={errors.name ? "name-error" : undefined}
/>
{errors.name && <p id="name-error" role="alert">{errors.name.message}</p>}
```

**En la lista de autores:**
- Escucharás descripciones claras como "Button, edit Gabriel García Márquez" o "Button, add to favorites,etc. Esto gracias a los atributos aria-label y aria-pressed.

Fragmento de AuthorList.tsx que lo implementa:
```ts
<Button
  onClick={() => toggleFavorite(author.id)}
  aria-label={isFavorite ? `Remove ${author.name} from favorites` : `Add ${author.name} to favorites`}
  aria-pressed={isFavorite}
>
  <Heart />
</Button>
```
## Instrucciones para Correr la App
1. Clonar el repositorio:
```ts
git clone <URL_DEL_REPOSITORIO>
cd <NOMBRE_DE_LA_CARPETA>
```
2. Instalar las dependencias:
```ts
npm install
```
3. Iniciar el servidor:
```ts
npm run dev
```
4. Abrir la aplicación:
```ts
Abre tu navegador y visita http://localhost:3000
```