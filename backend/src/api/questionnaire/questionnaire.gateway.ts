import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse
} from '@nestjs/websockets';
import {Logger} from '@nestjs/common';
import {Server, Socket} from 'socket.io';

interface EditPayload {
  clientId: string
  editor: string;
  editing: string;
}

@WebSocketGateway()
export class QuestionnaireGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  private editingQuestionnaires: EditPayload[] = [

  ];

  @WebSocketServer() wss: Server;

  private  logger: Logger = new Logger('AppGateway');

  afterInit(server: Server): any {
    this.logger.log('Initialized');
  }

  @SubscribeMessage('editStart')
  onEditStart(client: Socket, payload: EditPayload): void {
    const questionnaire = this.editingQuestionnaires.find(q => q.editing === payload.editing);
    if (questionnaire) {
      this.wss.emit('editStart', questionnaire);
    } else {
      this.editingQuestionnaires.push({clientId: client.id, editor: payload.editor, editing: payload.editing});
      this.logger.log(this.editingQuestionnaires);
      this.wss.emit('editStart', payload);
    }
  }

  @SubscribeMessage('editStop')
  onEditStop(client: Socket, payload: EditPayload): void {
    this.editingQuestionnaires = this.editingQuestionnaires.filter((q, qIndex) => {
      return q.editor !== payload.editor || q.editing !== payload.editing;
    });
    this.logger.log(this.editingQuestionnaires);
    const questionnaire = this.editingQuestionnaires.find(q => q.editing === payload.editing);
    if (questionnaire) {
      this.wss.emit('editStop', false);
    } else {
      this.wss.emit('editStop', true);
    }
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log('Client connected: ' + client.id);
  }

  handleDisconnect(client: Socket): any {
    this.logger.log('Client disconnected: ' + client.id);
    this.editingQuestionnaires = this.editingQuestionnaires.filter((q, qIndex) => {
      return q.clientId !== q.clientId;
    });
    this.logger.log(this.editingQuestionnaires);
    const questionnaire = this.editingQuestionnaires.find(q => q.clientId === client.id);
    if (questionnaire) {
      this.wss.emit('editStop', false);
    } else {
      this.wss.emit('editStop', true);
    }
  }

}
