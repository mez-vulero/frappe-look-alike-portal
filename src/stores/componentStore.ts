
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Component {
  id: string;
  name: string;
  description: string;
  code: string;
  createdAt: string;
}

interface ComponentStore {
  components: Component[];
  addComponent: (component: Component) => void;
  updateComponent: (id: string, component: Partial<Component>) => void;
  removeComponent: (id: string) => void;
}

export const useComponentStore = create<ComponentStore>()(
  persist(
    (set) => ({
      components: [],
      addComponent: (component) => 
        set((state) => ({ 
          components: [...state.components, component] 
        })),
      updateComponent: (id, updatedComponent) => 
        set((state) => ({
          components: state.components.map(component => 
            component.id === id ? { ...component, ...updatedComponent } : component
          )
        })),
      removeComponent: (id) => 
        set((state) => ({
          components: state.components.filter(component => component.id !== id)
        })),
    }),
    {
      name: 'component-store',
    }
  )
);
