import {shallow, mount} from 'enzyme'
import { MemoryRouter } from 'react-router-dom'
import { PrivateRoute } from '../../routers/PrivateRoute'

describe('Pruebas en <PrivateRoute />', () => {

    Storage.prototype.setItem = jest.fn();
    
    const ChildrenComponent = () => {
      return (
        <span>Aver!</span>
      )
    }
    

    test('debe de mostrar el componente si esta autenticado y guardar en localstorage', () => {
        
        const wrapper = mount(
            <MemoryRouter>
                <PrivateRoute isAuthenticated={true} children={<ChildrenComponent/>}/>
            </MemoryRouter>
        )
        
        expect(wrapper.find('span').exists()).toBe(true);
        expect(localStorage.setItem).toHaveBeenCalledWith('lastPath', '/');

    })

    test('debe de bloquear el componente no autenticado', () => {
        
        const wrapper = shallow(
            <MemoryRouter>
                <PrivateRoute isAuthenticated={false} children={<ChildrenComponent />}/>
            </MemoryRouter>
        )
        
        expect(wrapper.find('span').exists()).toBe(false);
        expect(wrapper.html()).toBe('');

    })
   
})