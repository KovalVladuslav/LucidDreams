import './App.css';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import MultiInput from "./MultiInput"

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className='container'>
        <MultiInput />
      </div>
    </QueryClientProvider>
  );
}

export default App;
