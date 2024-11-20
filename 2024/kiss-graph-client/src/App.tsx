import ProtectedRoutes from './providers/ProtectedRoutes'
import QueryWrapper from './providers/QueryWrapper'


function App() {
  return (
    <QueryWrapper>
      <div className='App'>
        <div className='content'>
          <ProtectedRoutes />
        </div>
      </div>
    </QueryWrapper>
  )
}


export default App
