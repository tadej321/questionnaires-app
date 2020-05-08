import {Questionnaire} from '../../models/questionnaire.model';
import {Question} from '../../models/question.model';
import * as QuestionnaireActions from './questionnaire-list.actions';

export interface State {
  questionnaires: Questionnaire[];
  editedQuestionnaire: Questionnaire;
  editedQuestionnaireId: string;
}

const initialState: State = {
  questionnaires: [
    new Questionnaire(
      'test 1',
      [
          new Question('test question 1', 0, 0, 0, 0, 0, 'questionId1' ),
          new Question('test question 2', 0, 0, 0, 0, 0, 'questionId2' )
        ],
      ['none'],
      new Date(),
      'testQId1'
      ),
    new Questionnaire(
      'test 2',
      [new Question('test question 2', 0, 0, 0, 0, 0 )],
      ['none'],
      new Date(),
      'testQId2'
    ),
    new Questionnaire(
      'test 3',
      [new Question('test question 3', 0, 0, 0, 0, 0 )],
      ['none'],
      new Date(),
      'testQId3'
    )
  ],
  editedQuestionnaire: null,
  editedQuestionnaireId: null
};

export function QuestionnaireListReducer(
  state: State = initialState,
  action: QuestionnaireActions.QuestionnaireListActions
) {
  let questionnaire;
  let index;
  let updatedQuestionnaire;
  let updatedQuestionnaires;
  let updatedQuestions;

  switch (action.type) {
    case QuestionnaireActions.ADD_QUESTIONNAIRE:
      const asda = [... state.questionnaires, action.payload];
      console.log(asda);
      return {...state, questionnaires: asda};

    case QuestionnaireActions.REMOVE_QUESTION:
      questionnaire = state.questionnaires.find(x => x.id === state.editedQuestionnaireId);

      updatedQuestions = questionnaire.questions.filter((q, qIndex) => {
        return q.id !== action.payload;
      });

      updatedQuestionnaire = {... questionnaire};
      updatedQuestionnaire.questions = updatedQuestions;

      updatedQuestionnaires = [... state.questionnaires];
      index = updatedQuestionnaires.indexOf(questionnaire);
      updatedQuestionnaires[index] = updatedQuestionnaire;

      return {
        ...state,
        questionnaires: updatedQuestionnaires,
        editedQuestionnaire: updatedQuestionnaire
      };

    case QuestionnaireActions.UPDATE_QUESTIONNAIRE:
      questionnaire = state.questionnaires.find(x => x.id === state.editedQuestionnaireId);
      updatedQuestionnaire = {...action.payload};

      updatedQuestionnaires = [...state.questionnaires];
      index = updatedQuestionnaires.indexOf(questionnaire);
      updatedQuestionnaires[index] = updatedQuestionnaire;

      return {
        ...state,
        questionnaires: updatedQuestionnaires,
        editedQuestionnaire: updatedQuestionnaire
      };

    case QuestionnaireActions.DELETE_QUESTIONNAIRE:

      return {
        ...state,
        questionnaires: state.questionnaires.filter((q, qIndex) => {
          return q.id !== action.payload;
        })
      };

    case QuestionnaireActions.START_EDIT:
      return {
        ...state,
        editedQuestionnaireId: action.payload,
        editedQuestionnaire: {...state.questionnaires.find(x => x.id === action.payload)}
      };

    case QuestionnaireActions.STOP_EDIT:
      return {
        ...state,
        editedQuestionnaire: null,
        editedQuestionnaireId: null
      };


    default:
      return state;
  }
}
