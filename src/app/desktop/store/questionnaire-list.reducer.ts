import {Questionnaire} from '../../models/questionnaire.model';
import * as QuestionnaireActions from './questionnaire-list.actions';
import {WebSocketService} from '../web-socket.service';

export interface State {
  questionnaires: Questionnaire[];
  editedQuestionnaire: Questionnaire;
  editedQuestionnaireId: string;
}

const initialState: State = {
  questionnaires: [],
  editedQuestionnaire: null,
  editedQuestionnaireId: null
};

export function QuestionnaireListReducer(
  state: State = initialState,
  action: QuestionnaireActions.QuestionnaireListActions
) {

  switch (action.type) {
    case QuestionnaireActions.SET_QUESTIONNAIRES:
      const editedQuestionnaire = action.payload.find(x => x._id === state.editedQuestionnaireId);
      return {
        ... state,
        questionnaires: [...action.payload],
        editedQuestionnaire
      };

    case QuestionnaireActions.OPEN_QUESTIONNAIRE:

      return {
        ...state,
        editedQuestionnaireId: action.payload,
        editedQuestionnaire: {...state.questionnaires.find(x => x._id === action.payload)}
      };

    case QuestionnaireActions.CLOSE_QUESTIONNAIRE:
      return {
        ...state,
        editedQuestionnaire: null,
        editedQuestionnaireId: null
      };


    default:
      return state;
  }
}
