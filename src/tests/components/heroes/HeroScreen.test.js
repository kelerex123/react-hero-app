import {shallow, mount} from 'enzyme';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { HeroScreen } from '../../../components/heroes/HeroScreen';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

describe('Pruebas en <HeroScreen />', () => {

    test('no debe de mostrar el HeroScreen si no hay un héroe en el URL', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero']}>
                <Routes>
                    <Route path='/hero' element={<HeroScreen />}/>
                    <Route path='/marvel' element={<h1>No hero Page</h1>}/>
                </Routes>
            </MemoryRouter>
        );

        expect(wrapper.find('h1').text().trim()).toBe('No hero Page');
    })

    test('debe de mostrar un hero si el parámetro existe y se encuentra', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Routes>
                    <Route path='/hero/:heroId' element={<HeroScreen />}/>
                    <Route path='/marvel' element={<h1>No hero Page</h1>}/>
                </Routes>
            </MemoryRouter>
        );

        expect(wrapper.find('.row').exists()).toBe(true);

    })

    test('debe de regresar a la pagina de heroes de marvel al hacer click en regresar', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Routes>
                    <Route path='/hero/:heroId' element={<HeroScreen />}/>
                </Routes>
            </MemoryRouter>
        );

        wrapper.find('button').simulate('click');

        expect(mockNavigate).toHaveBeenCalledWith(-1);

    });


    test('debe de mostrar el No Hero Page si no tenemos un héroe', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider12312323']}>
                <Routes>
                    <Route path='/hero/:heroId' element={<HeroScreen />}/>
                    <Route path='/marvel' element={<h1>No hero Page</h1>}/>
                </Routes>
            </MemoryRouter>
        );

        expect(wrapper.find('h1').text().trim()).toBe('No hero Page');

    })

})