import {shallow, mount} from 'enzyme';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AuthContext } from '../../../auth/AuthContext';
import { Navbar } from '../../../components/ui/Navbar';
import { types } from '../../../types/types';


const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

describe('Prueva en <Navbar />', () => {

    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: true,
            name: 'Bryan'
        }
    }

    const wrapper = mount(
        <AuthContext.Provider value={contextValue}>
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>
            {/* <MemoryRouter initialEntries={ ['/'] }>
                <Routes>
                    <Route path="/" element={<Navbar />} />
                </Routes>
            </MemoryRouter> */}
        </AuthContext.Provider>
    )

    test('debe de mostrarse correctamente', () => {

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.text-info').text().trim()).toBe('Bryan');

    })

    test('debe de llamar el logout y navigate', () => {

        wrapper.find('button').simulate('click');
        expect(contextValue.dispatch).toHaveBeenCalledWith({
            type: types.logout,
            payload: {
                logged: false
            }
        });

        expect(mockNavigate).toHaveBeenCalledWith('/login',{"replace": true})

    })


})