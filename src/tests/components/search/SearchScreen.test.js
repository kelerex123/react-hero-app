import {shallow, mount} from 'enzyme';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { SearchScreen } from '../../../components/search/SearchScreen';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));


describe('Pruebas en <SearchScreen />', () => {
  

    test('debe de mostrarse correctamente con valores por defecto', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={ ['/search'] }>
                <Routes>
                    <Route path="/search" element={<SearchScreen />} />
                </Routes>
            </MemoryRouter>
        ); 

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.alert-info').text().trim()).toBe('Busca un heroe');
    })

    test('debe de mostrar a Batman y el input con el valor del querystring', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={ ['/search?q=batman'] }>
                <Routes>
                    <Route path="/search" element={<SearchScreen />} />
                </Routes>
            </MemoryRouter>
        ); 

        
        expect(wrapper.find('input').prop('value')).toBe('batman');
        expect(wrapper).toMatchSnapshot();
    })

    test('debe de mostrar un error si no se encuentra el heroe', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={ ['/search?q=batman123'] }>
                <Routes>
                    <Route path="/search" element={<SearchScreen />} />
                </Routes>
            </MemoryRouter>
        ); 

        expect(wrapper.find('.alert-danger').text().trim()).toBe('No hay un heroe con batman123');
        expect(wrapper).toMatchSnapshot();
        
    })

    test('debe de llamar al navigate al momento de buscar un heroe', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={ ['/search'] }>
                <Routes>
                    <Route path="/search" element={<SearchScreen />} />
                </Routes>
            </MemoryRouter>
        ); 

        wrapper.find('input').simulate('change', {target:{value: 'batman', name: 'searchText'}})
        expect(wrapper.find('input').prop('value')).toBe('batman');

        wrapper.find('form').simulate('submit',{preventDefault() {}});
        expect(mockNavigate).toHaveBeenCalledWith(`?q=batman`);
        // expect(wrapper.find('.alert-danger').text().trim()).toBe('No hay un heroe con batman123');
        // expect(wrapper).toMatchSnapshot();
        
    });

})
