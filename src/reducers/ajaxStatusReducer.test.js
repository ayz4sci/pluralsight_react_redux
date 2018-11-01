import ajaxStatusReducer from './ajaxStatusReducer';
import * as types from '../actions/actionTypes';

describe( 'Ajax Status Reducer', () => {
    it('should increase the ajaxCallsInProgress count when passed BEGIN_AJAX_CALL', () => {
        const ajaxCallsInProgressState = ajaxStatusReducer(0, { type: types.BEGIN_AJAX_CALL});
        expect(ajaxCallsInProgressState).toEqual(1);
    });
    it('should decrease the ajaxCallsInProgress count when passed any action ending in _SUCCESS', () => {
        const ajaxCallsInProgressState = ajaxStatusReducer(1, { type: types.UPDATE_AUTHORS_SUCCESS});
        expect(ajaxCallsInProgressState).toEqual(0);
    });
});