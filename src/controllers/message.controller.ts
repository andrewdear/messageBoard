import Message, {IMessage} from '../models/message.model';

interface IMessageParams {
    screenName: String;
    message: String;
}

function createMessage(params: IMessageParams): Promise<IMessage> {
    return Message.create(params).then((data: IMessage) => {
        return data;
    })
}

function getAllMessages(): Promise<IMessage[]> {
    return Message.find({}).then((data: IMessage[]) => {
        return data;
    })
}

// Only used for development and testing
function removeAllMessages(): Promise<boolean> {
    return Message.remove({}).then(() => {
        return true;
    })
}


export default {
    createMessage,
    getAllMessages,
    removeAllMessages
};