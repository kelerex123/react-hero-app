import {shallow} from 'enzyme'
import { authReducer } from '../../auth/authReducer'
import { types } from '../../types/types'

describe('Pruebas en authReducer', () => {

    test('debe de retornar el estado por defecto', () => {
        const state = {
            logged: false,
        }
        const newState = authReducer(state, {});

        expect(newState).toEqual(state);
    })

    test('debe de autenticar  y colocar el name del usuario', () => {
        const state = {
            logged: false,
        }

        const action = {
            type: types.login,
            payload: {
                name: 'Bryan'
            }
        }
        const newState = authReducer(state, action);

        expect(newState.name).toBe('Bryan');
        expect(newState.logged).toBe(true);

    })

    test('debe de borrar el name del usuario y logged en false', () => {
        const state = {
            name: 'Bryan',
            logged: true
        }

        const action = {
            type: types.logout
        }
        const newState = authReducer(state, action);

        expect(newState.logged).toBe(false);
        expect(newState.name).toBe(undefined);
    })

})