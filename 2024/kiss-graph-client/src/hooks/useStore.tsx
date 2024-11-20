import { create } from 'zustand'
import { persist } from 'zustand/middleware'


export type StateType = {

}


const useStore = create(
  persist<StateType>(
    set => ({

    }),
    {
      name: 'main-storage',
      // storage: createJSONStorage(() => sessionStorage)
    }
  )
)


export default useStore
